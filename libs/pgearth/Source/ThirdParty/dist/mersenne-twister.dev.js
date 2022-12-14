"use strict";

define(function () {
  function t(t) {
    null == t && (t = new Date().getTime()), this.N = 624, this.M = 397, this.MATRIX_A = 2567483615, this.UPPER_MASK = 2147483648, this.LOWER_MASK = 2147483647, this.mt = new Array(this.N), this.mti = this.N + 1, this.init_genrand(t);
  }

  return t.prototype.init_genrand = function (t) {
    for (this.mt[0] = t >>> 0, this.mti = 1; this.mti < this.N; this.mti++) {
      t = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30;
      this.mt[this.mti] = (1812433253 * ((4294901760 & t) >>> 16) << 16) + 1812433253 * (65535 & t) + this.mti, this.mt[this.mti] >>>= 0;
    }
  }, t.prototype.genrand_int32 = function () {
    var t,
        i,
        h = new Array(0, this.MATRIX_A);

    if (this.mti >= this.N) {
      for (this.mti == this.N + 1 && this.init_genrand(5489), i = 0; i < this.N - this.M; i++) {
        t = this.mt[i] & this.UPPER_MASK | this.mt[i + 1] & this.LOWER_MASK, this.mt[i] = this.mt[i + this.M] ^ t >>> 1 ^ h[1 & t];
      }

      for (; i < this.N - 1; i++) {
        t = this.mt[i] & this.UPPER_MASK | this.mt[i + 1] & this.LOWER_MASK, this.mt[i] = this.mt[i + (this.M - this.N)] ^ t >>> 1 ^ h[1 & t];
      }

      t = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK, this.mt[this.N - 1] = this.mt[this.M - 1] ^ t >>> 1 ^ h[1 & t], this.mti = 0;
    }

    return t = this.mt[this.mti++], t ^= t >>> 11, t ^= t << 7 & 2636928640, t ^= t << 15 & 4022730752, (t ^= t >>> 18) >>> 0;
  }, t.prototype.random = function () {
    return this.genrand_int32() * (1 / 4294967296);
  }, t;
});