const cdsServices = require('./pb/envoy/api/v2/cds_grpc_pb')
const discovery = require('./pb/envoy/api/v2/discovery_pb')
const cdsPB = require('./pb/envoy/api/v2/cds_pb')
const edsPB = require('./pb/envoy/api/v2/eds_pb')
const endpointPB = require('./pb/envoy/api/v2/endpoint/endpoint_pb')
const addressPB = require('./pb/envoy/api/v2/core/address_pb')
const googlePBAny = require('google-protobuf/google/protobuf/any_pb.js')
const googlePBDuration = require('google-protobuf/google/protobuf/duration_pb.js')

let store 

function streamClusters(call, callback) {
  // console.log('stream clusters>>>')
  call.on('data', function( request ) {
    const params = request.toObject()
    // console.log(JSON.stringify( params, null, 2 ))

    // get stored data for request
    const storedData = store.get( params )
    if ( !storedData ) {
      // console.log('NO DATA AVAILABLE')
      return this.end()
    }
    
    // check for nonce to stop infinite updates
    if ( params.responseNonce === storedData.nonce ) {
      return this.end()
    }

    // build discovery response
    const response = new discovery.DiscoveryResponse()
    response.setVersionInfo( 0 )
    response.setTypeUrl( 'type.googleapis.com/envoy.api.v2.Cluster' )
    response.setNonce( storedData.nonce )
    
    // build resources to assign
    const resourcesList = storedData.resourcesList.map( function ( dataResource ) {
      //console.log(JSON.stringify( dataResource, null, 2 ))
      // for each resource, great a google protobuf Any buffer message
      const any = new googlePBAny.Any()

      // create Cluster message
      // https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/cds.proto#cluster
      const cluster = new cdsPB.Cluster()
      cluster.setName( dataResource.name )

      // create DiscoveryType message 
      // https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/cds.proto#envoy-api-enum-cluster-discoverytype
      cluster.setType( cdsPB.Cluster.DiscoveryType[ dataResource.type ] )
      
      // create Duration message 
      // https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#duration
      const duration = new googlePBDuration.Duration()
      duration.setSeconds( dataResource.connect_timeout )
      cluster.setConnectTimeout( duration )

      // create LB Policy message 
      // https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/cds.proto#envoy-api-enum-cluster-lbpolicy
      cluster.setLbPolicy( cdsPB.Cluster.LbPolicy[ dataResource.lb_policy ] )
      
      // create ClusterLoadAssignment message
      // https://www.envoyproxy.io/docs/envoy/latest/api-v2/api/v2/eds.proto#clusterloadassignment
      const clusterLoadAssignment = new edsPB.ClusterLoadAssignment()
      clusterLoadAssignment.setClusterName( dataResource.load_assignment.cluster_name )

      // build endpoints to assign
      const endpoints = dataResource.load_assignment.endpoints.map( function ( dataEndpoint ) {
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
      
      // assign clusterLoadAssignment
      cluster.setLoadAssignment( clusterLoadAssignment )
      
      // pack listener message into any
      any.pack( cluster.serializeBinary(), 'envoy.api.v2.Cluster')
      
      return any
    })

    // assign resources to response
    response.setResourcesList( resourcesList )
    
    // write response
    this.write(response)
  })
}

function incrementalClusters(call) {
  // placeholder
}

function fetchClusters(call, callback) {
  // placeholder
}

exports.registerServices = function ( server, configStore ) {
  store = configStore 

  server.addService(
    cdsServices.ClusterDiscoveryServiceService, 
    {
      streamClusters: streamClusters,
      incrementalClusters: incrementalClusters,
      fetchClusters: fetchClusters
    }
  )
}
