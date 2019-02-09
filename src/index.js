/*
  Envoy v2 API
  https://www.envoyproxy.io/docs/envoy/v1.8.0/configuration/overview/v2_overview
*/
var grpc = require('grpc')

var cdsServices = require('./pb/envoy/api/v2/cds_grpc_pb')
var cds = require('./cds')

var edsServices = require('./pb/envoy/api/v2/eds_grpc_pb');
var eds = require('./eds')

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(
    cdsServices.ClusterDiscoveryServiceService, 
    {
      streamClusters: cds.streamClusters,
      incrementalClusters: cds.incrementalClusters,
      fetchClusters: cds.fetchClusters
    }
  )

  server.addService(
    edsServices.EndpointDiscoveryServiceService, 
    {
      streamEndpoints: eds.streamEndpoints,
      fetchEndpoints: eds.fetchEndpoints
    }
  )

  server.bind('0.0.0.0:3000', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('grpc server started, listening on port 3000')
}

main();
