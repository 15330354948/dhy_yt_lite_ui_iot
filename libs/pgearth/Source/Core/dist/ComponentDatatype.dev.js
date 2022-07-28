"use strict";

define(["./defaultValue", "./defined", "./DeveloperError", "./FeatureDetection", "./freezeObject", "./WebGLConstants"], function (a, E, T, r, e, n) {
  "use strict";

  if (!r.supportsTypedArrays()) return {};
  var N = {
    BYTE: n.BYTE,
    UNSIGNED_BYTE: n.UNSIGNED_BYTE,
    SHORT: n.SHORT,
    UNSIGNED_SHORT: n.UNSIGNED_SHORT,
    INT: n.INT,
    UNSIGNED_INT: n.UNSIGNED_INT,
    FLOAT: n.FLOAT,
    DOUBLE: n.DOUBLE,
    getSizeInBytes: function getSizeInBytes(r) {
      if (!E(r)) throw new T("value is required.");

      switch (r) {
        case N.BYTE:
          return Int8Array.BYTES_PER_ELEMENT;

        case N.UNSIGNED_BYTE:
          return Uint8Array.BYTES_PER_ELEMENT;

        case N.SHORT:
          return Int16Array.BYTES_PER_ELEMENT;

        case N.UNSIGNED_SHORT:
          return Uint16Array.BYTES_PER_ELEMENT;

        case N.INT:
          return Int32Array.BYTES_PER_ELEMENT;

        case N.UNSIGNED_INT:
          return Uint32Array.BYTES_PER_ELEMENT;

        case N.FLOAT:
          return Float32Array.BYTES_PER_ELEMENT;

        case N.DOUBLE:
          return Float64Array.BYTES_PER_ELEMENT;

        default:
          throw new T("componentDatatype is not a valid value.");
      }
    },
    fromTypedArray: function fromTypedArray(r) {
      return r instanceof Int8Array ? N.BYTE : r instanceof Uint8Array ? N.UNSIGNED_BYTE : r instanceof Int16Array ? N.SHORT : r instanceof Uint16Array ? N.UNSIGNED_SHORT : r instanceof Int32Array ? N.INT : r instanceof Uint32Array ? N.UNSIGNED_INT : r instanceof Float32Array ? N.FLOAT : r instanceof Float64Array ? N.DOUBLE : void 0;
    },
    validate: function validate(r) {
      return E(r) && (r === N.BYTE || r === N.UNSIGNED_BYTE || r === N.SHORT || r === N.UNSIGNED_SHORT || r === N.INT || r === N.UNSIGNED_INT || r === N.FLOAT || r === N.DOUBLE);
    },
    createTypedArray: function createTypedArray(r, e) {
      if (!E(r)) throw new T("componentDatatype is required.");
      if (!E(e)) throw new T("valuesOrLength is required.");

      switch (r) {
        case N.BYTE:
          return new Int8Array(e);

        case N.UNSIGNED_BYTE:
          return new Uint8Array(e);

        case N.SHORT:
          return new Int16Array(e);

        case N.UNSIGNED_SHORT:
          return new Uint16Array(e);

        case N.INT:
          return new Int32Array(e);

        case N.UNSIGNED_INT:
          return new Uint32Array(e);

        case N.FLOAT:
          return new Float32Array(e);

        case N.DOUBLE:
          return new Float64Array(e);

        default:
          throw new T("componentDatatype is not a valid value.");
      }
    },
    createArrayBufferView: function createArrayBufferView(r, e, n, t) {
      if (!E(r)) throw new T("componentDatatype is required.");
      if (!E(e)) throw new T("buffer is required.");

      switch (n = a(n, 0), t = a(t, (e.byteLength - n) / N.getSizeInBytes(r)), r) {
        case N.BYTE:
          return new Int8Array(e, n, t);

        case N.UNSIGNED_BYTE:
          return new Uint8Array(e, n, t);

        case N.SHORT:
          return new Int16Array(e, n, t);

        case N.UNSIGNED_SHORT:
          return new Uint16Array(e, n, t);

        case N.INT:
          return new Int32Array(e, n, t);

        case N.UNSIGNED_INT:
          return new Uint32Array(e, n, t);

        case N.FLOAT:
          return new Float32Array(e, n, t);

        case N.DOUBLE:
          return new Float64Array(e, n, t);

        default:
          throw new T("componentDatatype is not a valid value.");
      }
    },
    fromName: function fromName(r) {
      switch (r) {
        case "BYTE":
          return N.BYTE;

        case "UNSIGNED_BYTE":
          return N.UNSIGNED_BYTE;

        case "SHORT":
          return N.SHORT;

        case "UNSIGNED_SHORT":
          return N.UNSIGNED_SHORT;

        case "INT":
          return N.INT;

        case "UNSIGNED_INT":
          return N.UNSIGNED_INT;

        case "FLOAT":
          return N.FLOAT;

        case "DOUBLE":
          return N.DOUBLE;

        default:
          throw new T("name is not a valid value.");
      }
    }
  };
  return e(N);
});