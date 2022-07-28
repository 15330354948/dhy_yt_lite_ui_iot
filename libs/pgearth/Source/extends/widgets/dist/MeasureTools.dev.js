"use strict";

define(["./MeasureArea", "./MeasureDistance", "./MeasureHeight", "./MeasurePoint"], function (a, d, c, b) {
  function e(f) {
    this.areaArray = [];
    this.distanceArray = [];
    this.heightArray = [];
    this.pointArray = [];
    this.viewer = f;
  }

  e.prototype.measureArea = function () {
    var f = new a(this.viewer);
    this.areaArray.push(f);
  };

  e.prototype.clearArea = function () {
    var f = this;
    this.areaArray.map(function (h, g) {
      h.clear();
      f.areaArray.slice(g, 1);
    });
  };

  e.prototype.measureDistance = function () {
    var f = new d(this.viewer);
    this.distanceArray.push(f);
  };

  e.prototype.clearDistance = function () {
    var f = this;
    this.distanceArray.map(function (h, g) {
      h.clear();
      f.distanceArray.slice(g, 1);
    });
  };

  e.prototype.measureHeight = function () {
    var f = new c(this.viewer);
    this.heightArray.push(f);
  };

  e.prototype.clearHeight = function () {
    var f = this;
    this.heightArray.map(function (h, g) {
      h.clear();
      f.heightArray.slice(g, 1);
    });
  };

  e.prototype.measurePoint = function () {
    var f = new b(this.viewer);
    this.pointArray.push(f);
  };

  e.prototype.clearPoint = function () {
    var f = this;
    this.pointArray.map(function (h, g) {
      h.clear();
      f.pointArray.slice(g, 1);
    });
  };

  return e;
});