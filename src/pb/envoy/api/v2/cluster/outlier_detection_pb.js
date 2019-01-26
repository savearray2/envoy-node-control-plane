/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var google_protobuf_duration_pb = require('google-protobuf/google/protobuf/duration_pb.js');
var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');
var validate_validate_pb = require('../../../../validate/validate_pb.js');
var gogoproto_gogo_pb = require('../../../../gogoproto/gogo_pb.js');
goog.exportSymbol('proto.envoy.api.v2.cluster.OutlierDetection', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.envoy.api.v2.cluster.OutlierDetection = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.envoy.api.v2.cluster.OutlierDetection, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.envoy.api.v2.cluster.OutlierDetection.displayName = 'proto.envoy.api.v2.cluster.OutlierDetection';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.toObject = function(opt_includeInstance) {
  return proto.envoy.api.v2.cluster.OutlierDetection.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.envoy.api.v2.cluster.OutlierDetection} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.envoy.api.v2.cluster.OutlierDetection.toObject = function(includeInstance, msg) {
  var f, obj = {
    consecutive5xx: (f = msg.getConsecutive5xx()) && google_protobuf_wrappers_pb.UInt32Value.toObject(includeInstance, f),
    interval: (f = msg.getInterval()) && google_protobuf_duration_pb.Duration.toObject(includeInstance, f),
    baseEjectionTime: (f = msg.getBaseEjectionTime()) && google_protobuf_duration_pb.Duration.toObject(includeInstance, f),
    maxEjectionPercent: (f = msg.getMaxEjectionPercent()) && google_protobuf_wrappers_pb.UInt32Value.toObject(includeInstance, f),
    enforcingConsecutive5xx: (f = msg.getEnforcingConsecutive5xx()) && google_protobuf_wrappers_pb.UInt32Value.toObject(includeInstance, f),
    enforcingSuccessRate: (f = msg.getEnforcingSuccessRate()) && google_protobuf_wrappers_pb.UInt32Value.toObject(includeInstance, f),
    successRateMinimumHosts: (f = msg.getSuccessRateMinimumHosts()) && google_protobuf_wrappers_pb.UInt32Value.toObject(includeInstance, f),
    successRateRequestVolume: (f = msg.getSuccessRateRequestVolume()) && google_protobuf_wrappers_pb.UInt32Value.toObject(includeInstance, f),
    successRateStdevFactor: (f = msg.getSuccessRateStdevFactor()) && google_protobuf_wrappers_pb.UInt32Value.toObject(includeInstance, f),
    consecutiveGatewayFailure: (f = msg.getConsecutiveGatewayFailure()) && google_protobuf_wrappers_pb.UInt32Value.toObject(includeInstance, f),
    enforcingConsecutiveGatewayFailure: (f = msg.getEnforcingConsecutiveGatewayFailure()) && google_protobuf_wrappers_pb.UInt32Value.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.envoy.api.v2.cluster.OutlierDetection}
 */
proto.envoy.api.v2.cluster.OutlierDetection.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.envoy.api.v2.cluster.OutlierDetection;
  return proto.envoy.api.v2.cluster.OutlierDetection.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.envoy.api.v2.cluster.OutlierDetection} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.envoy.api.v2.cluster.OutlierDetection}
 */
proto.envoy.api.v2.cluster.OutlierDetection.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.UInt32Value;
      reader.readMessage(value,google_protobuf_wrappers_pb.UInt32Value.deserializeBinaryFromReader);
      msg.setConsecutive5xx(value);
      break;
    case 2:
      var value = new google_protobuf_duration_pb.Duration;
      reader.readMessage(value,google_protobuf_duration_pb.Duration.deserializeBinaryFromReader);
      msg.setInterval(value);
      break;
    case 3:
      var value = new google_protobuf_duration_pb.Duration;
      reader.readMessage(value,google_protobuf_duration_pb.Duration.deserializeBinaryFromReader);
      msg.setBaseEjectionTime(value);
      break;
    case 4:
      var value = new google_protobuf_wrappers_pb.UInt32Value;
      reader.readMessage(value,google_protobuf_wrappers_pb.UInt32Value.deserializeBinaryFromReader);
      msg.setMaxEjectionPercent(value);
      break;
    case 5:
      var value = new google_protobuf_wrappers_pb.UInt32Value;
      reader.readMessage(value,google_protobuf_wrappers_pb.UInt32Value.deserializeBinaryFromReader);
      msg.setEnforcingConsecutive5xx(value);
      break;
    case 6:
      var value = new google_protobuf_wrappers_pb.UInt32Value;
      reader.readMessage(value,google_protobuf_wrappers_pb.UInt32Value.deserializeBinaryFromReader);
      msg.setEnforcingSuccessRate(value);
      break;
    case 7:
      var value = new google_protobuf_wrappers_pb.UInt32Value;
      reader.readMessage(value,google_protobuf_wrappers_pb.UInt32Value.deserializeBinaryFromReader);
      msg.setSuccessRateMinimumHosts(value);
      break;
    case 8:
      var value = new google_protobuf_wrappers_pb.UInt32Value;
      reader.readMessage(value,google_protobuf_wrappers_pb.UInt32Value.deserializeBinaryFromReader);
      msg.setSuccessRateRequestVolume(value);
      break;
    case 9:
      var value = new google_protobuf_wrappers_pb.UInt32Value;
      reader.readMessage(value,google_protobuf_wrappers_pb.UInt32Value.deserializeBinaryFromReader);
      msg.setSuccessRateStdevFactor(value);
      break;
    case 10:
      var value = new google_protobuf_wrappers_pb.UInt32Value;
      reader.readMessage(value,google_protobuf_wrappers_pb.UInt32Value.deserializeBinaryFromReader);
      msg.setConsecutiveGatewayFailure(value);
      break;
    case 11:
      var value = new google_protobuf_wrappers_pb.UInt32Value;
      reader.readMessage(value,google_protobuf_wrappers_pb.UInt32Value.deserializeBinaryFromReader);
      msg.setEnforcingConsecutiveGatewayFailure(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.envoy.api.v2.cluster.OutlierDetection.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.envoy.api.v2.cluster.OutlierDetection} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.envoy.api.v2.cluster.OutlierDetection.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConsecutive5xx();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.UInt32Value.serializeBinaryToWriter
    );
  }
  f = message.getInterval();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_duration_pb.Duration.serializeBinaryToWriter
    );
  }
  f = message.getBaseEjectionTime();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_duration_pb.Duration.serializeBinaryToWriter
    );
  }
  f = message.getMaxEjectionPercent();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      google_protobuf_wrappers_pb.UInt32Value.serializeBinaryToWriter
    );
  }
  f = message.getEnforcingConsecutive5xx();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_wrappers_pb.UInt32Value.serializeBinaryToWriter
    );
  }
  f = message.getEnforcingSuccessRate();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      google_protobuf_wrappers_pb.UInt32Value.serializeBinaryToWriter
    );
  }
  f = message.getSuccessRateMinimumHosts();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      google_protobuf_wrappers_pb.UInt32Value.serializeBinaryToWriter
    );
  }
  f = message.getSuccessRateRequestVolume();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      google_protobuf_wrappers_pb.UInt32Value.serializeBinaryToWriter
    );
  }
  f = message.getSuccessRateStdevFactor();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      google_protobuf_wrappers_pb.UInt32Value.serializeBinaryToWriter
    );
  }
  f = message.getConsecutiveGatewayFailure();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      google_protobuf_wrappers_pb.UInt32Value.serializeBinaryToWriter
    );
  }
  f = message.getEnforcingConsecutiveGatewayFailure();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      google_protobuf_wrappers_pb.UInt32Value.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.UInt32Value consecutive_5xx = 1;
 * @return {?proto.google.protobuf.UInt32Value}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.getConsecutive5xx = function() {
  return /** @type{?proto.google.protobuf.UInt32Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.UInt32Value, 1));
};


/** @param {?proto.google.protobuf.UInt32Value|undefined} value */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.setConsecutive5xx = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.envoy.api.v2.cluster.OutlierDetection.prototype.clearConsecutive5xx = function() {
  this.setConsecutive5xx(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.hasConsecutive5xx = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional google.protobuf.Duration interval = 2;
 * @return {?proto.google.protobuf.Duration}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.getInterval = function() {
  return /** @type{?proto.google.protobuf.Duration} */ (
    jspb.Message.getWrapperField(this, google_protobuf_duration_pb.Duration, 2));
};


/** @param {?proto.google.protobuf.Duration|undefined} value */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.setInterval = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.envoy.api.v2.cluster.OutlierDetection.prototype.clearInterval = function() {
  this.setInterval(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.hasInterval = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional google.protobuf.Duration base_ejection_time = 3;
 * @return {?proto.google.protobuf.Duration}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.getBaseEjectionTime = function() {
  return /** @type{?proto.google.protobuf.Duration} */ (
    jspb.Message.getWrapperField(this, google_protobuf_duration_pb.Duration, 3));
};


/** @param {?proto.google.protobuf.Duration|undefined} value */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.setBaseEjectionTime = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.envoy.api.v2.cluster.OutlierDetection.prototype.clearBaseEjectionTime = function() {
  this.setBaseEjectionTime(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.hasBaseEjectionTime = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional google.protobuf.UInt32Value max_ejection_percent = 4;
 * @return {?proto.google.protobuf.UInt32Value}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.getMaxEjectionPercent = function() {
  return /** @type{?proto.google.protobuf.UInt32Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.UInt32Value, 4));
};


/** @param {?proto.google.protobuf.UInt32Value|undefined} value */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.setMaxEjectionPercent = function(value) {
  jspb.Message.setWrapperField(this, 4, value);
};


proto.envoy.api.v2.cluster.OutlierDetection.prototype.clearMaxEjectionPercent = function() {
  this.setMaxEjectionPercent(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.hasMaxEjectionPercent = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional google.protobuf.UInt32Value enforcing_consecutive_5xx = 5;
 * @return {?proto.google.protobuf.UInt32Value}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.getEnforcingConsecutive5xx = function() {
  return /** @type{?proto.google.protobuf.UInt32Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.UInt32Value, 5));
};


/** @param {?proto.google.protobuf.UInt32Value|undefined} value */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.setEnforcingConsecutive5xx = function(value) {
  jspb.Message.setWrapperField(this, 5, value);
};


proto.envoy.api.v2.cluster.OutlierDetection.prototype.clearEnforcingConsecutive5xx = function() {
  this.setEnforcingConsecutive5xx(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.hasEnforcingConsecutive5xx = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional google.protobuf.UInt32Value enforcing_success_rate = 6;
 * @return {?proto.google.protobuf.UInt32Value}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.getEnforcingSuccessRate = function() {
  return /** @type{?proto.google.protobuf.UInt32Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.UInt32Value, 6));
};


/** @param {?proto.google.protobuf.UInt32Value|undefined} value */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.setEnforcingSuccessRate = function(value) {
  jspb.Message.setWrapperField(this, 6, value);
};


proto.envoy.api.v2.cluster.OutlierDetection.prototype.clearEnforcingSuccessRate = function() {
  this.setEnforcingSuccessRate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.hasEnforcingSuccessRate = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional google.protobuf.UInt32Value success_rate_minimum_hosts = 7;
 * @return {?proto.google.protobuf.UInt32Value}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.getSuccessRateMinimumHosts = function() {
  return /** @type{?proto.google.protobuf.UInt32Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.UInt32Value, 7));
};


/** @param {?proto.google.protobuf.UInt32Value|undefined} value */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.setSuccessRateMinimumHosts = function(value) {
  jspb.Message.setWrapperField(this, 7, value);
};


proto.envoy.api.v2.cluster.OutlierDetection.prototype.clearSuccessRateMinimumHosts = function() {
  this.setSuccessRateMinimumHosts(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.hasSuccessRateMinimumHosts = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional google.protobuf.UInt32Value success_rate_request_volume = 8;
 * @return {?proto.google.protobuf.UInt32Value}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.getSuccessRateRequestVolume = function() {
  return /** @type{?proto.google.protobuf.UInt32Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.UInt32Value, 8));
};


/** @param {?proto.google.protobuf.UInt32Value|undefined} value */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.setSuccessRateRequestVolume = function(value) {
  jspb.Message.setWrapperField(this, 8, value);
};


proto.envoy.api.v2.cluster.OutlierDetection.prototype.clearSuccessRateRequestVolume = function() {
  this.setSuccessRateRequestVolume(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.hasSuccessRateRequestVolume = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional google.protobuf.UInt32Value success_rate_stdev_factor = 9;
 * @return {?proto.google.protobuf.UInt32Value}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.getSuccessRateStdevFactor = function() {
  return /** @type{?proto.google.protobuf.UInt32Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.UInt32Value, 9));
};


/** @param {?proto.google.protobuf.UInt32Value|undefined} value */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.setSuccessRateStdevFactor = function(value) {
  jspb.Message.setWrapperField(this, 9, value);
};


proto.envoy.api.v2.cluster.OutlierDetection.prototype.clearSuccessRateStdevFactor = function() {
  this.setSuccessRateStdevFactor(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.hasSuccessRateStdevFactor = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional google.protobuf.UInt32Value consecutive_gateway_failure = 10;
 * @return {?proto.google.protobuf.UInt32Value}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.getConsecutiveGatewayFailure = function() {
  return /** @type{?proto.google.protobuf.UInt32Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.UInt32Value, 10));
};


/** @param {?proto.google.protobuf.UInt32Value|undefined} value */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.setConsecutiveGatewayFailure = function(value) {
  jspb.Message.setWrapperField(this, 10, value);
};


proto.envoy.api.v2.cluster.OutlierDetection.prototype.clearConsecutiveGatewayFailure = function() {
  this.setConsecutiveGatewayFailure(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.hasConsecutiveGatewayFailure = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional google.protobuf.UInt32Value enforcing_consecutive_gateway_failure = 11;
 * @return {?proto.google.protobuf.UInt32Value}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.getEnforcingConsecutiveGatewayFailure = function() {
  return /** @type{?proto.google.protobuf.UInt32Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.UInt32Value, 11));
};


/** @param {?proto.google.protobuf.UInt32Value|undefined} value */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.setEnforcingConsecutiveGatewayFailure = function(value) {
  jspb.Message.setWrapperField(this, 11, value);
};


proto.envoy.api.v2.cluster.OutlierDetection.prototype.clearEnforcingConsecutiveGatewayFailure = function() {
  this.setEnforcingConsecutiveGatewayFailure(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.envoy.api.v2.cluster.OutlierDetection.prototype.hasEnforcingConsecutiveGatewayFailure = function() {
  return jspb.Message.getField(this, 11) != null;
};


goog.object.extend(exports, proto.envoy.api.v2.cluster);
