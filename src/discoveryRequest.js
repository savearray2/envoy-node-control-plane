const discovery = require('./pb/envoy/api/v2/discovery_pb')

function discoveryRequest ( request ) {
	/*
      DiscoveryRequest 
      https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/discovery.proto#discoveryrequest
      https://github.com/envoyproxy/envoy/blob/master/api/envoy/api/v2/discovery.proto#L18
  */

	/*
		core.Node
		https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/core/base.proto#envoy-api-msg-core-node
		https://github.com/envoyproxy/envoy/blob/master/api/envoy/api/v2/core/base.proto#L43
	*/
	const node = request.getNode()
	const params = {
		'version_info': request.getVersionInfo(),
		'node': {
			'id': node.getId(),
			'cluster': node.getCluster(),
			'metadata': node.getMetadata(),
			'locality': node.getLocality(),
			'build_version': node.getBuildVersion()
		},
		'resource_names': request.getResourceNamesList(),
		'type_url': request.getTypeUrl(),
		'response_nonce': request.getResponseNonce(),
		'error_detail': request.getErrorDetail(),
	}

	return params
}

module.exports = discoveryRequest
