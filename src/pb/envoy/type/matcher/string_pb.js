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

var validate_validate_pb = require('../../../validate/validate_pb.js');
goog.exportSymbol('proto.envoy.type.matcher.ListStringMatcher', null, global);
goog.exportSymbol('proto.envoy.type.matcher.StringMatcher', null, global);

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
proto.envoy.type.matcher.StringMatcher = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.envoy.type.matcher.StringMatcher.oneofGroups_);
};
goog.inherits(proto.envoy.type.matcher.StringMatcher, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.envoy.type.matcher.StringMatcher.displayName = 'proto.envoy.type.matcher.StringMatcher';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.envoy.type.matcher.StringMatcher.oneofGroups_ = [[1,2,3,4]];

/**
 * @enum {number}
 */
proto.envoy.type.matcher.StringMatcher.MatchPatternCase = {
  MATCH_PATTERN_NOT_SET: 0,
  EXACT: 1,
  PREFIX: 2,
  SUFFIX: 3,
  REGEX: 4
};

/**
 * @return {proto.envoy.type.matcher.StringMatcher.MatchPatternCase}
 */
proto.envoy.type.matcher.StringMatcher.prototype.getMatchPatternCase = function() {
  return /** @type {proto.envoy.type.matcher.StringMatcher.MatchPatternCase} */(jspb.Message.computeOneofCase(this, proto.envoy.type.matcher.StringMatcher.oneofGroups_[0]));
};



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
proto.envoy.type.matcher.StringMatcher.prototype.toObject = function(opt_includeInstance) {
  return proto.envoy.type.matcher.StringMatcher.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.envoy.type.matcher.StringMatcher} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.envoy.type.matcher.StringMatcher.toObject = function(includeInstance, msg) {
  var f, obj = {
    exact: jspb.Message.getFieldWithDefault(msg, 1, ""),
    prefix: jspb.Message.getFieldWithDefault(msg, 2, ""),
    suffix: jspb.Message.getFieldWithDefault(msg, 3, ""),
    regex: jspb.Message.getFieldWithDefault(msg, 4, "")
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
 * @return {!proto.envoy.type.matcher.StringMatcher}
 */
proto.envoy.type.matcher.StringMatcher.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.envoy.type.matcher.StringMatcher;
  return proto.envoy.type.matcher.StringMatcher.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.envoy.type.matcher.StringMatcher} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.envoy.type.matcher.StringMatcher}
 */
proto.envoy.type.matcher.StringMatcher.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setExact(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setPrefix(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSuffix(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setRegex(value);
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
proto.envoy.type.matcher.StringMatcher.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.envoy.type.matcher.StringMatcher.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.envoy.type.matcher.StringMatcher} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.envoy.type.matcher.StringMatcher.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeString(
      2,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeString(
      3,
      f
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeString(
      4,
      f
    );
  }
};


/**
 * optional string exact = 1;
 * @return {string}
 */
proto.envoy.type.matcher.StringMatcher.prototype.getExact = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.envoy.type.matcher.StringMatcher.prototype.setExact = function(value) {
  jspb.Message.setOneofField(this, 1, proto.envoy.type.matcher.StringMatcher.oneofGroups_[0], value);
};


proto.envoy.type.matcher.StringMatcher.prototype.clearExact = function() {
  jspb.Message.setOneofField(this, 1, proto.envoy.type.matcher.StringMatcher.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.envoy.type.matcher.StringMatcher.prototype.hasExact = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string prefix = 2;
 * @return {string}
 */
proto.envoy.type.matcher.StringMatcher.prototype.getPrefix = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.envoy.type.matcher.StringMatcher.prototype.setPrefix = function(value) {
  jspb.Message.setOneofField(this, 2, proto.envoy.type.matcher.StringMatcher.oneofGroups_[0], value);
};


proto.envoy.type.matcher.StringMatcher.prototype.clearPrefix = function() {
  jspb.Message.setOneofField(this, 2, proto.envoy.type.matcher.StringMatcher.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.envoy.type.matcher.StringMatcher.prototype.hasPrefix = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional string suffix = 3;
 * @return {string}
 */
proto.envoy.type.matcher.StringMatcher.prototype.getSuffix = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.envoy.type.matcher.StringMatcher.prototype.setSuffix = function(value) {
  jspb.Message.setOneofField(this, 3, proto.envoy.type.matcher.StringMatcher.oneofGroups_[0], value);
};


proto.envoy.type.matcher.StringMatcher.prototype.clearSuffix = function() {
  jspb.Message.setOneofField(this, 3, proto.envoy.type.matcher.StringMatcher.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.envoy.type.matcher.StringMatcher.prototype.hasSuffix = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional string regex = 4;
 * @return {string}
 */
proto.envoy.type.matcher.StringMatcher.prototype.getRegex = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/** @param {string} value */
proto.envoy.type.matcher.StringMatcher.prototype.setRegex = function(value) {
  jspb.Message.setOneofField(this, 4, proto.envoy.type.matcher.StringMatcher.oneofGroups_[0], value);
};


proto.envoy.type.matcher.StringMatcher.prototype.clearRegex = function() {
  jspb.Message.setOneofField(this, 4, proto.envoy.type.matcher.StringMatcher.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.envoy.type.matcher.StringMatcher.prototype.hasRegex = function() {
  return jspb.Message.getField(this, 4) != null;
};



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
proto.envoy.type.matcher.ListStringMatcher = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.envoy.type.matcher.ListStringMatcher.repeatedFields_, null);
};
goog.inherits(proto.envoy.type.matcher.ListStringMatcher, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.envoy.type.matcher.ListStringMatcher.displayName = 'proto.envoy.type.matcher.ListStringMatcher';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.envoy.type.matcher.ListStringMatcher.repeatedFields_ = [1];



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
proto.envoy.type.matcher.ListStringMatcher.prototype.toObject = function(opt_includeInstance) {
  return proto.envoy.type.matcher.ListStringMatcher.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.envoy.type.matcher.ListStringMatcher} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.envoy.type.matcher.ListStringMatcher.toObject = function(includeInstance, msg) {
  var f, obj = {
    patternsList: jspb.Message.toObjectList(msg.getPatternsList(),
    proto.envoy.type.matcher.StringMatcher.toObject, includeInstance)
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
 * @return {!proto.envoy.type.matcher.ListStringMatcher}
 */
proto.envoy.type.matcher.ListStringMatcher.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.envoy.type.matcher.ListStringMatcher;
  return proto.envoy.type.matcher.ListStringMatcher.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.envoy.type.matcher.ListStringMatcher} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.envoy.type.matcher.ListStringMatcher}
 */
proto.envoy.type.matcher.ListStringMatcher.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.envoy.type.matcher.StringMatcher;
      reader.readMessage(value,proto.envoy.type.matcher.StringMatcher.deserializeBinaryFromReader);
      msg.addPatterns(value);
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
proto.envoy.type.matcher.ListStringMatcher.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.envoy.type.matcher.ListStringMatcher.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.envoy.type.matcher.ListStringMatcher} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.envoy.type.matcher.ListStringMatcher.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPatternsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.envoy.type.matcher.StringMatcher.serializeBinaryToWriter
    );
  }
};


/**
 * repeated StringMatcher patterns = 1;
 * @return {!Array.<!proto.envoy.type.matcher.StringMatcher>}
 */
proto.envoy.type.matcher.ListStringMatcher.prototype.getPatternsList = function() {
  return /** @type{!Array.<!proto.envoy.type.matcher.StringMatcher>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.envoy.type.matcher.StringMatcher, 1));
};


/** @param {!Array.<!proto.envoy.type.matcher.StringMatcher>} value */
proto.envoy.type.matcher.ListStringMatcher.prototype.setPatternsList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.envoy.type.matcher.StringMatcher=} opt_value
 * @param {number=} opt_index
 * @return {!proto.envoy.type.matcher.StringMatcher}
 */
proto.envoy.type.matcher.ListStringMatcher.prototype.addPatterns = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.envoy.type.matcher.StringMatcher, opt_index);
};


proto.envoy.type.matcher.ListStringMatcher.prototype.clearPatternsList = function() {
  this.setPatternsList([]);
};


goog.object.extend(exports, proto.envoy.type.matcher);
