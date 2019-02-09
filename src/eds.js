const discoveryRequest = require('./discoveryRequest')
const discovery = require('./pb/envoy/api/v2/discovery_pb')
const edsPB = require('./pb/envoy/api/v2/eds_pb')
const endpointPB = require('./pb/envoy/api/v2/endpoint/endpoint_pb')
const addressPB = require('./pb/envoy/api/v2/core/address_pb')
const googlePBAny = require('google-protobuf/google/protobuf/any_pb.js');
const data = require('./data')

function streamEndpoints(call, callback) {
	console.log('stream endpoints called')
	call.on('data', function( request ) {
		// deconstruct incoming request message
		const params = discoveryRequest( request )
		// get stored data for requested resource name 
		const storedData = data.getData( 'eds_config', params.resource_names[ 0 ])

		// build discovery response
		const response = new discovery.DiscoveryResponse()
		response.setVersionInfo( 0 )
		response.setTypeUrl( 'type.googleapis.com/envoy.api.v2.ClusterLoadAssignment' )

		// build resources to assign
		const resourcesList = storedData.map( function ( dataResource ) {
			// for each resource, great a google protobuf Any buffer message
			const any = new googlePBAny.Any()

			// create ClusterLoadAssignment message
			// https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/eds.proto#clusterloadassignment
			const clusterLoadAssignment = new edsPB.ClusterLoadAssignment()
			clusterLoadAssignment.setClusterName( dataResource.cluster_name )

			// build endpoints to assign
			const endpoints = dataResource.endpoints.map( function ( dataEndpoint ) {
				// create LocalityLbEndpoints message
				// https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/endpoint/endpoint.proto#envoy-api-msg-endpoint-localitylbendpoints
				const localityLbEndpoints = new endpointPB.LocalityLbEndpoints()

				// build lbendpoints to assign 
				const lbEndpoints = dataEndpoint.lb_endpoints.map( function ( dataLbEndpoint ) {
					// create LbEndpoint message
					// https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/endpoint/endpoint.proto#envoy-api-msg-endpoint-lbendpoint
					const lbEndpoint = new endpointPB.LbEndpoint()
					// create Endpoint message 
					// https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/endpoint/endpoint.proto#envoy-api-msg-endpoint-endpoint
					const endpoint = new endpointPB.Endpoint()
					// create Address message 
					// https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/core/address.proto#envoy-api-msg-core-address
					const address = new addressPB.Address()
					// create SocketAddress message 
					// https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/core/address.proto#envoy-api-msg-core-socketaddress
					const socketAddress = new addressPB.SocketAddress()
					// assign values to socket address
					socketAddress.setAddress( dataLbEndpoint.endpoint.address.socket_address.address )
					socketAddress.setPortValue( dataLbEndpoint.endpoint.address.socket_address.port_value )
					// assign socket address to address
					address.setSocketAddress( socketAddress )
					// assign address to endpoint
					endpoint.setAddress( address )
					// assign endpoint to lb endpoint
					lbEndpoint.setEndpoint( endpoint )

					return lbEndpoint
				})
				// assign lb endpoints to locality lb endpoint
				localityLbEndpoints.setLbEndpointsList( lbEndpoints )
	
				return localityLbEndpoints
			}) 

			// assign endpoints to cluster
			clusterLoadAssignment.setEndpointsList( endpoints )

			// pack cluster load assignment message into any
			any.pack( clusterLoadAssignment.serializeBinary(), 'envoy.api.v2.ClusterLoadAssignment')

			return any
		})

		// assign resources to response
		response.setResourcesList( resourcesList )

		// write response
		this.write(response)
	})
}

function fetchEndpoints(call, callback) {
	console.log('stream endpoints called')
}

exports.streamEndpoints = streamEndpoints
exports.fetchEndpoints = fetchEndpoints
