const data = {
	"cds": {
		"test_node": {
			"nonce": "test_node_nonce",
			"resourcesList": [
				{
					"name": "some_service",
					"connect_timeout": "25",
    			"type": "STRICT_DNS",
					"lb_policy": "ROUND_ROBIN",
					"load_assignment": {
						"cluster_name": "some_cluster",
						"endpoints": [
							{
								"lb_endpoints": [
									{
										"endpoint": {
											"address": {
												"socket_address": {
													"address": "service_host_name",
													"port_value": "3000"
												}
											}
										}
									}
								]
							}
						]
					}
				}
			]
		}
	},
	"lds": {
		"test_node": {
			"nonce": "test_node_nonce",
			"resourcesList": [
				{
					"address": {
						"socket_address": {
							"address": "0.0.0.0",
							"port_value": "80"
						}
					},
					"filter_chains": [
						{
							"filters": [
								{
									"name": "envoy.http_connection_manager",
									"config": {
										"codec_type": "auto",
										"stat_prefix": "ingress_http",
										"route_config": {
											"name": "local_route",
											"virtual_hosts": [
												{
													"name": "some_virtual_host",
													"domains": [
														"*"
													],
													"routes": [
														{
															"match": {
																"prefix": "/"
															},
															"route": {
																"cluster": "some_cluster"
															}
														}
													]
												}
											]
										},
										"http_filters": [
											{
											 "config": {},
											 "name": "envoy.router"
											}
										]
									}
								}
							]
						}
					]
				}
			]
		}
	}
}

exports.get = function getData ( requestParams ) {
	switch( requestParams.typeUrl ) {
		case 'type.googleapis.com/envoy.api.v2.Cluster': {
			return data.cds && data.cds[ requestParams.node.id ] || undefined
		}
		case 'type.googleapis.com/envoy.api.v2.Listener': {
			return data.lds && data.lds[ requestParams.node.id ] || undefined
		}
	default:
		return undefined
	}
}
