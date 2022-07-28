"use strict";

define(["Core/defaultValue"], function (t) {
  function e(e) {
    this.imgSrc = t(e, require.toUrl("./extends/widgets/loading/loading.gif"));
  }

  return e.prototype.start = function () {
    var e, t;
    document.getElementById("loadingItem") || ((e = document.createElement("div")).id = "loadingItem", e.className = "loading", (t = document.createElement("img")).src = this.imgSrc, document.body.appendChild(e), e.appendChild(t)), document.getElementById("loadingItem").style.display = "block";
  }, e.prototype.finish = function () {
    document.getElementById("loadingItem") && (document.getElementById("loadingItem").style.display = "none");
  }, e;
});