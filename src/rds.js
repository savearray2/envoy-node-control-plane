const rdsServices = require('./pb/envoy/api/v2/rds_grpc_pb')
const discovery = require('./pb/envoy/api/v2/discovery_pb')
const rdsPB = require('./pb/envoy/api/v2/rds_pb')
const routePB = require('./pb/envoy/api/v2/route/route_pb')
const googlePBAny = require('google-protobuf/google/protobuf/any_pb.js')
const makeResponseNonce = require('./util/response-nonce')

let store
let stream_clients = []

function update(request, force) {
	const params = request.toObject()
    // console.log(JSON.stringify( params, null, 2 ))
	let nonce
	if (!force) {
		// get stored data for request
		const storedData = store.get( params )
		if ( !storedData ) {
		//  console.log('NO DATA AVAILABLE')
		return //this.end()
		}

		// check for nonce to stop infinite updates
		nonce = makeResponseNonce( storedData )
		//console.log(`RDS params.responseNonce ${params.responseNonce} // nonce ${nonce}`)
		if ( params.responseNonce === nonce ) {
		return //this.end()
		}
	}

    // build discovery response
    const response = new discovery.DiscoveryResponse()
    response.setVersionInfo( 0 )
    response.setTypeUrl( 'type.googleapis.com/envoy.api.v2.RouteConfiguration' )
    response.setNonce( nonce )

    // build resources to assign
    const resourcesList = storedData.resourcesList.map( function ( dataResource ) {
      // for each resource, great a google protobuf Any buffer message
      const any = new googlePBAny.Any()

      // create RouteConfiguration message
      // https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/rds.proto
			const routeConfiguration = new rdsPB.RouteConfiguration()
			routeConfiguration.setName( dataResource.name )

			const virtualHosts = dataResource.virtual_hosts.map( function (dataVirtualHost) {
				// create VirtualHost message
				// https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/route/route.proto#envoy-api-msg-route-virtualhost
				const virtualHost = new routePB.VirtualHost()
				virtualHost.setName( dataVirtualHost.name)
				virtualHost.setDomainsList( dataVirtualHost.domains )

				const routes = dataVirtualHost.routes.map( function ( dataRoute ) {
					// create Route Message 
					// https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/route/route.proto#envoy-api-msg-route-route
					const route = new routePB.Route()

					// create RouteMatch message 
					// https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/route/route.proto#envoy-api-msg-route-routematch
					const match = new routePB.RouteMatch()

					if (dataRoute.match.prefix) {
						match.setPrefix( dataRoute.match.prefix )
					}

					if (dataRoute.match.path) {
						match.setPath( dataRoute.match.path )
					}

					// assign match to route
					route.setMatch( match )

					// create RouteAction message 
					// https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/route/route.proto#envoy-api-msg-route-routeaction
					const routeAction = new routePB.RouteAction()
					routeAction.setCluster( dataRoute.route.cluster )

					if (dataRoute.route.prefix_rewrite) {
						routeAction.setPrefixRewrite( dataRoute.route.prefix_rewrite )
					}

					// assign route action to route
					route.setRoute( routeAction )

					return route
				})
				// assign routes 
				virtualHost.setRoutesList( routes )

				return virtualHost
			})

      // assign virtualHosts to routeConfiguration
      routeConfiguration.setVirtualHostsList( virtualHosts )

      // pack routeConfiguration message into any
      any.pack( routeConfiguration.serializeBinary(), 'envoy.api.v2.RouteConfiguration')

      return any
    })

    // assign resources to response
    response.setResourcesList( resourcesList )

    // write response
    this.write(response)
}

function streamRoutes(call) {
  stream_clients.push({ client: call })
  call.on('end', function() {
    stream_clients = stream_clients.filter( function(value, index, arr) {
		return value.client !== call
	})
  })
  call.on('data', function( request ) {
	update( request, false )
  })
}

function incrementalRoutes(call, callback) {
	console.log('incrementalRoutes called')
}

function fetchRoutes(call, callback) {
  console.log('fetchRoutes called')
}

exports.registerServices = function ( server, configStore ) {
  store = configStore 

  server.addService(
    rdsServices.RouteDiscoveryServiceService, 
    {
			streamRoutes: streamRoutes,
			incrementalRoutes: incrementalRoutes,
      fetchRoutes: fetchRoutes
    }
  )
}
