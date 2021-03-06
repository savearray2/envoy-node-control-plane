const rdsServices = require('./pb/envoy/api/v2/rds_grpc_pb')
const discovery = require('./pb/envoy/api/v2/discovery_pb')
const rdsPB = require('./pb/envoy/api/v2/rds_pb')
const routePB = require('./pb/envoy/api/v2/route/route_pb')
const googlePBAny = require('google-protobuf/google/protobuf/any_pb.js')
const makeResponseNonce = require('./util/response-nonce')
const googlePBDuration = require('google-protobuf/google/protobuf/duration_pb.js')
const EventEmitter = require('events')

class StreamStatusEmitter extends EventEmitter {}
const statusEmitter = new StreamStatusEmitter()
exports.status = statusEmitter

let store
let stream_clients = []

function update(request, call, force) {
	const params = request.toObject()
	const stm_client = stream_clients.filter(val => val.client === call)[0]
	stm_client.request = request
	// get stored data for request
	const storedData = store.get( params )
	if ( !force && !storedData ) {
		return
	}
	const nonce = makeResponseNonce( storedData )
	if ( !force && params.responseNonce === nonce ) {
		return
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

					if (dataRoute.route.timeout) {
						const duration = new googlePBDuration.Duration()
						duration.setSeconds( dataRoute.route.timeout )
						routeAction.setTimeout( duration )
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
    call.write(response)
}

function streamRoutes(call) {
  stream_clients.push({ client: call })
  statusEmitter.emit('connect', {
	client: call,
	count: stream_clients.length
  })
  call.on('end', function() {
    stream_clients = stream_clients.filter( function(value, index, arr) {
		return value.client !== call
	})
	statusEmitter.emit('disconnect', {
		client: call,
		count: stream_clients.length
	})
  })
  call.on('data', function( request ) {
	update( request, call, false )
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

exports.pushUpdate = function () {
	for (let i = 0; i < stream_clients.length; i++) {
		if (stream_clients[i].request) {
			update( stream_clients[i].request, stream_clients[i].client, true )
		}
	}
}
