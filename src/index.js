/*
	Envoy v2 API
	https://www.envoyproxy.io/docs/envoy/v1.8.0/configuration/overview/v2_overview
*/

var grpc = require('grpc');

var discovery = require('./pb/envoy/api/v2/discovery_pb');
//var messages = require('./pb/envoy/api/v2/cds_pb');
var services = require('./pb/envoy/api/v2/cds_grpc_pb');

function streamClusters(call, callback) {

	call.on('data', function( request ) {
		/*
			DiscoveryRequest 
			https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/discovery.proto#discoveryrequest
			https://github.com/envoyproxy/envoy/blob/master/api/envoy/api/v2/discovery.proto#L18
		*/
		const params = {
			'version_info'	: request.getVersionInfo(), 			// #1
			'node'					: request.getNode(), 							// #2
			'resource_names': request.getResourceNamesList(), // #3
			'type_url'			: request.getTypeUrl(), 					// #4
			'response_nonce': request.getResponseNonce(), 		// #5
			'error_detail'	: request.getErrorDetail(), 			// #6
		}
		//console.log(JSON.stringify(params, null, 2))

		/*
			core.Node
			https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/core/base.proto#envoy-api-msg-core-node
			https://github.com/envoyproxy/envoy/blob/master/api/envoy/api/v2/core/base.proto#L43
		*/
		const node = {
			'id': params.node.getId(),
			'cluster': params.node.getCluster(),
			'metadata': params.node.getMetadata(),
			'locality': params.node.getLocality(),
			'build_version': params.node.getBuildVersion()
		}
		//console.log(JSON.stringify(node, null, 2))

		/*
			DiscoveryResponse
			https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/discovery.proto#discoveryresponse
			https://github.com/envoyproxy/envoy/blob/master/api/envoy/api/v2/discovery.proto#L58
		*/
		const response = new discovery.DiscoveryResponse()
		response.setVersionInfo('0')
		response.setTypeUrl('type.googleapis.com/envoy.api.v2.Cluster')
		response.getResourcesList([
			{
				'name': 'front-cluster',
				'connect_timeout': '0.25s',
				'lb_policy': 'ROUND_ROBIN',
				'type': 'EDS',
				'eds_cluster_config': {
					'eds_config': {
						'api_config_source': {
							'api_type': 'GRPC',
							'grpc_services': {
								'envoy_grpc': {
									'cluster_name': 'xds_cluster'
								}
							}
						}
					}
				}
			}
		])
		//console.log(discovery.DiscoveryRequest.toObject(false, response))

		this.write(response)
	})
	
	call.on('end', function() {
		// The server has finished sending
		call.end()
  })
  call.on('error', function(e) {
    // An error has occurred and the stream has been closed.
  })
  call.on('status', function(status) {
    // process status
  })
}

function incrementalClusters(call) {
	// placeholder
}

function fetchClusters(call, callback) {
	// placeholder
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(
		services.ClusterDiscoveryServiceService, 
		{
			streamClusters: streamClusters,
			incrementalClusters: incrementalClusters,
			fetchClusters: fetchClusters
		}
	);
  server.bind('0.0.0.0:3000', grpc.ServerCredentials.createInsecure());
	server.start();
	console.log('grpc server started, listening on port 3000')
}

main();
