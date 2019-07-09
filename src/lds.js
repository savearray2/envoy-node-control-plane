const ldsServices = require('./pb/envoy/api/v2/lds_grpc_pb')
const discovery = require('./pb/envoy/api/v2/discovery_pb')
const ldsPB = require('./pb/envoy/api/v2/lds_pb')
const certPB = require('./pb/envoy/api/v2/auth/cert_pb')
const basePB = require('./pb/envoy/api/v2/core/base_pb')
const listenerPB = require('./pb/envoy/api/v2/listener/listener_pb.js')
const googlePBAny = require('google-protobuf/google/protobuf/any_pb.js')
const googleStruct = require('google-protobuf/google/protobuf/struct_pb.js')
const makeResponseNonce = require('./util/response-nonce')
const messages = require('./util/messages')

let store
let stream_clients = []

function update(request, force) {
	const params = request.toObject()
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
    response.setTypeUrl( 'type.googleapis.com/envoy.api.v2.Listener' )
	response.setNonce( nonce )

    // build resources to assign
    const resourcesList = storedData.resourcesList.map( function ( dataResource ) {
      // for each resource, great a google protobuf Any buffer message
      const any = new googlePBAny.Any()

      // create Listener message
      // https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/lds.proto
      const listener = new ldsPB.Listener()

      // create Address message 
	  const address = messages.buildAddress( dataResource.address )
	  
	  if (dataResource.name) {
		  listener.setName(dataResource.name)
	  }

      // assign address 
	  listener.setAddress( address )

	  if (dataResource.listener_filters) {
        const listenerChains = dataResource.listener_filters.map( function ( dataFilterChain ) {
	 	  const listenerFilter = new listenerPB.ListenerFilter()
	 	  listenerFilter.setName( dataFilterChain.name )
	 	  const config = googleStruct.Struct.fromJavaScript( dataFilterChain.config )
	 	  listenerFilter.setConfig( config )
	 	  return listenerFilter
	    })
	    listener.setListenerFiltersList( listenerChains )
	  }

      // build filter chains 
      const filterChains = dataResource.filter_chains.map( function ( dataFilterChain ) {
        // build filterChain 
        // https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/listener/listener.proto#envoy-api-msg-listener-filterchain
		const filterChain = new listenerPB.FilterChain()

		if (dataFilterChain.filter_chain_match) {
			const filterChainMatch = new listenerPB.FilterChainMatch()
			if (dataFilterChain.filter_chain_match.server_names) {
				filterChainMatch.setServerNamesList(dataFilterChain.filter_chain_match.server_names)
			}
			filterChain.setFilterChainMatch(filterChainMatch)
		}
		
		if (dataFilterChain.tls_context) {
			const tlsContext = new certPB.DownstreamTlsContext()
			const commonTlsCtx = new certPB.CommonTlsContext()

			if (dataFilterChain.tls_context.common_tls_context.alpn_protocols) {
				commonTlsCtx.setAlpnProtocolsList(dataFilterChain.tls_context.common_tls_context.alpn_protocols)
			}

			if (dataFilterChain.tls_context.common_tls_context.tls_certificates) {
				const cert_list = dataFilterChain.tls_context.common_tls_context.tls_certificates.map( function ( cert ) {
					const tlsCertificate = new certPB.TlsCertificate()
					const private_key = new basePB.DataSource()
					if (cert.private_key.filename) {
						private_key.setFilename(cert.private_key.filename)
					}
					tlsCertificate.setPrivateKey(private_key)
					const certificate_chain = new basePB.DataSource()
					if (cert.certificate_chain.filename) {
						certificate_chain.setFilename(cert.certificate_chain.filename)
					}
					tlsCertificate.setCertificateChain(certificate_chain)
					return tlsCertificate
				})
				commonTlsCtx.setTlsCertificatesList(cert_list)
			}
			
			tlsContext.setCommonTlsContext(commonTlsCtx)
			filterChain.setTlsContext(tlsContext)
		}

        // build filters 
        const filters = dataFilterChain.filters.map( function ( dataFilter ) {
          // build Filter message 
          // https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/listener/listener.proto#envoy-api-msg-listener-filter
          const filter = new listenerPB.Filter()
          filter.setName( dataFilter.name )

          // build config Struct
          // https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#struct
          const config = googleStruct.Struct.fromJavaScript( dataFilter.config )

          // assign config to filter 
		  filter.setConfig( config )

          return filter
        })

        // assign filters to filter chain 
        filterChain.setFiltersList( filters )

        return filterChain
      })

      // assign filterChains to listener
      listener.setFilterChainsList( filterChains )

      // pack listener message into any
      any.pack( listener.serializeBinary(), 'envoy.api.v2.Listener')

      return any
    })

    // assign resources to response
    response.setResourcesList( resourcesList )

    // write response
    this.write(response)
}

function streamListeners(call) {
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

function fetchListeners(call, callback) {
  console.log('fetchListeners called')
}

exports.registerServices = function ( server, configStore ) {
  store = configStore 

  server.addService(
    ldsServices.ListenerDiscoveryServiceService, 
    {
      streamListeners: streamListeners,
      fetchListeners: fetchListeners
    }
  )
}

exports.pushUpdate = function () {
	
}
