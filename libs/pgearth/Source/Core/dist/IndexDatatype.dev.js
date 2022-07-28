"use strict";

define(["./defined", "./DeveloperError", "./freezeObject", "./Math", "./WebGLConstants"], function (i, a, e, E, r) {
  "use strict";

  var t = {
    UNSIGNED_BYTE: r.UNSIGNED_BYTE,
    UNSIGNED_SHORT: r.UNSIGNED_SHORT,
    UNSIGNED_INT: r.UNSIGNED_INT,
    getSizeInBytes: function getSizeInBytes(e) {
      switch (e) {
        case t.UNSIGNED_BYTE:
          return Uint8Array.BYTES_PER_ELEMENT;

        case t.UNSIGNED_SHORT:
          return Uint16Array.BYTES_PER_ELEMENT;

        case t.UNSIGNED_INT:
          return Uint32Array.BYTES_PER_ELEMENT;
      }

      throw new a("indexDatatype is required and must be a valid IndexDatatype constant.");
    },
    fromSizeInBytes: function fromSizeInBytes(e) {
      switch (e) {
        case 2:
          return t.UNSIGNED_SHORT;

        case 4:
          return t.UNSIGNED_INT;

        case 1:
          return t.UNSIGNED_BYTE;

        default:
          throw new a("Size in bytes cannot be mapped to an IndexDatatype");
      }
    },
    validate: function validate(e) {
      return i(e) && (e === t.UNSIGNED_BYTE || e === t.UNSIGNED_SHORT || e === t.UNSIGNED_INT);
    },
    createTypedArray: function createTypedArray(e, r) {
      if (!i(e)) throw new a("numberOfVertices is required.");
      return new (e >= E.SIXTY_FOUR_KILOBYTES ? Uint32Array : Uint16Array)(r);
    },
    createTypedArrayFromArrayBuffer: function createTypedArrayFromArrayBuffer(e, r, t, n) {
      if (!i(e)) throw new a("numberOfVertices is required.");
      if (!i(r)) throw new a("sourceArray is required.");
      if (!i(t)) throw new a("byteOffset is required.");
      return new (e >= E.SIXTY_FOUR_KILOBYTES ? Uint32Array : Uint16Array)(r, t, n);
    }
  };
  return e(t);
});