const edsServices = require('./pb/envoy/api/v2/eds_grpc_pb')
const discovery = require('./pb/envoy/api/v2/discovery_pb')
const googlePBAny = require('google-protobuf/google/protobuf/any_pb.js')
const makeResponseNonce = require('./util/response-nonce')
const messages = require('./util/messages')

// passed storage module
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
    response.setTypeUrl( 'type.googleapis.com/envoy.api.v2.ClusterLoadAssignment' )
    response.setNonce( nonce )

    // build resources to assign
    const resourcesList = storedData.resourcesList.map( function ( dataResource ) {
      // for each resource, great a google protobuf Any buffer message
      const any = new googlePBAny.Any()

      // create ClusterLoadAssignment message
      const clusterLoadAssignment = messages.buildClusterLoadAssignment( dataResource )
      
      // pack cluster load assignment message into any
      any.pack( clusterLoadAssignment.serializeBinary(), 'envoy.api.v2.ClusterLoadAssignment')

      return any
    })

    // assign resources to response
    response.setResourcesList( resourcesList )

    // write response
    call.write(response)	
}

function streamEndpoints(call) {
  stream_clients.push({ client: call })
  call.on('end', function() {
    stream_clients = stream_clients.filter( function(value, index, arr) {
		return value.client !== call
	})
  })
  call.on('data', function( request ) {
	update( request, call, false )
  })
}

function fetchEndpoints(call, callback) {
  console.log('stream endpoints called')
}

exports.registerServices = function ( server, configStore ) {
  store = configStore 

  server.addService(
    edsServices.EndpointDiscoveryServiceService, 
    {
      streamEndpoints: streamEndpoints,
      fetchEndpoints: fetchEndpoints
    }
  )
}

exports.pushUpdate = function () {
	for (let i = 0; i < stm_client.length; i++) {
		update( stm_client[i].request, stm_client[i].client, true )
	}
}
