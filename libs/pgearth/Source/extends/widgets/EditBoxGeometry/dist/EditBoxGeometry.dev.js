"use strict";

define(["./EditBoxGeometryViewModel", "../../../Core/defineProperties", "../../../ThirdParty/knockout", "../../../Widgets/getElement"], function (o, t, e, d) {
  function i(t, e) {
    t = d(t);
    var i,
        s = document.createElement("div");

    function n(t) {
      var e = document.createElement("div");
      e.className = "PowerGis-EditBoxGeometry-twipsy PowerGis-EditBoxGeometry-right";
      var i = document.createElement("div");
      i.className = "PowerGis-EditBoxGeometry-twipsy-arrow", e.appendChild(i);
      var s = document.createElement("div");
      s.className = "PowerGis-EditBoxGeometry-twipsy-inner", e.appendChild(s);
      var n = document.createElement("div");
      n.className = "PowerGis-EditBoxGeometry-twipsy-latLonHei", e.appendChild(n);
      var l = document.createElement("div");
      l.className = "PowerGis-EditBoxGeometry-twipsy-latLonHei", e.appendChild(l);
      var o = document.createElement("div");
      o.className = "PowerGis-EditBoxGeometry-twipsy-latLonHei", e.appendChild(o), this._div = e, this._title = s, this._lat = n, this._lon = l, this._hei = o, t.appendChild(e);
    }

    this._tooltip = (i = e.container, n.prototype.setVisible = function (t) {
      this._div.style.display = t ? "block" : "none";
    }, n.prototype.showAt = function (t, e, i, s, n) {
      t && null != e && (this.setVisible(!0), this._title.style.display = "block", this._title.innerHTML = e, this._lat.innerHTML = null, this._lat.style.display = "none", this._lon.style.display = "none", this._hei.style.display = "none", this._div.style.left = t.x + 10 + "px", this._div.style.top = t.y - this._div.clientHeight / 2 + "px"), t && i && s && n && (this.setVisible(!0), this._lat.style.display = "block", this._lon.style.display = "block", this._hei.style.display = "block", this._lat.innerHTML = i, this._lon.innerHTML = s, this._hei.innerHTML = n, this._title.style.display = "none", this._div.style.left = t.x + 10 + "px", this._div.style.top = t.y - this._div.clientHeight / 2 + "px");
    }, new n(i));
    var l = new o(e, {
      tooltip: this._tooltip
    });
    l._polylinePath = "M 28.15625,10.4375 9.125,13.21875 13.75,43.25 41.75,55.09375 50.8125,37 54.5,11.9375 z m 0.125,3 19.976451,0.394265 L 43.03125,16.875 22.6875,14.28125 z M 50.971746,15.705477 47.90625,36.03125 42.53125,46 44.84375,19.3125 z M 12.625,16.03125 l 29.15625,3.6875 -2.65625,31 L 16.4375,41.125 z", l._polygonPath = "m 31.560594,6.5254438 -20.75,12.4687502 0.1875,24.5625 22.28125,11.8125 19.5,-12 0.65625,-0.375 0,-0.75 0.0312,-23.21875 z m 0.0625,3.125 16.65625,9.5000002 -16.125,10.28125 -17.34375,-9.71875 z m 18.96875,11.1875002 0.15625,20.65625 -17.46875,10.59375 0.15625,-20.28125 z m -37.0625,1.25 17.21875,9.625 -0.15625,19.21875 -16.9375,-9 z", this._viewModel = l, this._container = t, this._element = s;
  }

  return t(i.prototype, {
    container: {
      get: function get() {
        return this._container;
      }
    },
    viewModel: {
      get: function get() {
        return this._viewModel;
      }
    }
  }), i;
});