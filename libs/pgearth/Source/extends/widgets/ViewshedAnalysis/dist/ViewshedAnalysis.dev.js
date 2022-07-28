"use strict";

define(["./ViewshedAnalysisViewModel", "../../../Core/DeveloperError", "../../../Core/defined", "../../../Core/destroyObject", "../../../Core/defineProperties", "../../../Widgets/getElement", "../../../ThirdParty/knockout"], function (f, b, d, h, e, a, c) {
  var i = [];

  function g(D, o) {
    if (!d(D)) {
      throw new b("container is required.");
    }

    if (!d(o["scene"])) {
      throw new b("scene is required.");
    }

    D = a(D);
    var A = new f(o, i);
    this["_viewModel"] = A, this["_container"] = D;
    var z = document.createElement("div");
    this._element = z;
    var K = document.createElement("div");
    K["textContent"] = "可视域分析", K["className"] = "PowerGis-PGViewshed-button", K["setAttribute"]("data-bind", "click: _toggleDropDown"), z["appendChild"](K), z["className"] = "PowerGis-PGViewshed", z["setAttribute"]("data-bind", "css: { 'PowerGis-PGViewshed-visible' : dropDownVisible, 'PowerGis-PGViewshed-hidden' : !dropDownVisible }"), D["appendChild"](this._element);
    var p = document["createElement"]("div");
    (this["_panel"] = p)["className"] = "PowerGis-PGViewshed-dropDown", z["appendChild"](p);
    var H = document["createElement"]("input");
    H["type"] = "button", H["value"] = "添加可视域", H["className"] = "PowerGis-PGViewshed-pickButton", H["setAttribute"]("data-bind", "css: {'PowerGis-PGViewshed-pickButtonHighlight' : viewshed3daction}, click: StartViewshed");
    var B = document["createElement"]("div");
    B["className"] = "PowerGis-PGViewshed-center", B["appendChild"](H), p["appendChild"](B), (G = document["createElement"]("div"))["className"] = "PowerGis-PGViewshed-Analysis", (M = document["createElement"]("span"))["className"] = "PowerGis-PGViewshed-toggleSwitch", M["setAttribute"]("data-bind", "click: toggleAnalysisTree, text: editAnalysisTreeSwitchText"), G["appendChild"](M), G["appendChild"](document["createTextNode"]("可视域")), p["appendChild"](G);
    var r = document["createElement"]("div");
    r["className"] = "PowerGis-PGViewshed-section", r["setAttribute"]("data-bind", "css: {'PowerGis-PGViewshed-show' : analysisTree, 'PowerGis-PGViewshed-hide' : !analysisTree}"), p["appendChild"](r);
    var P = document["createElement"]("div");
    P["className"] = "PowerGis-PGViewshed-tree", P["setAttribute"]("data-bind", "foreach : treeEntity"), r["appendChild"](P);
    var t = document["createElement"]("ul");
    t["className"] = "PowerGis-PGViewshed-Ul", P["appendChild"](t);
    var s = document["createElement"]("li");
    s["className"] = "PowerGis-PGViewshed-LI", s["setAttribute"]("data-bind", "text : name, event:{click : $parent.liClickEvent,dblclick : $parent.dbClickEvent}"), t["appendChild"](s), (G = document["createElement"]("div"))["className"] = "PowerGis-PGViewshed-sectionHeader", (M = document["createElement"]("span"))["className"] = "PowerGis-PGViewshed-toggleSwitch", M["setAttribute"]("data-bind", "click: toggleEditAnalysis, text: editAnalysisSwitchText"), G["appendChild"](M), G["appendChild"](document["createTextNode"]("可视域编辑")), p["appendChild"](G);
    var j,
        J = document["createElement"]("div");
    J["className"] = "PowerGis-PGViewshed-section", J["setAttribute"]("data-bind", "css: {'PowerGis-PGViewshed-show' : editAnalysisVisible, 'PowerGis-PGViewshed-hide' : !editAnalysisVisible}"), p["appendChild"](J), (j = document["createElement"]("input"))["type"] = "button", j["value"] = "第一视角", j["className"] = "PowerGis-PGViewshed-jumpButton", j["setAttribute"]("data-bind", "click: JumpToViewshed, enable:isSelected"), J["appendChild"](j), (j = document["createElement"]("input"))["type"] = "button", j["value"] = "删除选中", j["className"] = "PowerGis-PGViewshed-deleteButton", j["setAttribute"]("data-bind", "click: ClearViewshed"), J["appendChild"](j), (j = document["createElement"]("input"))["type"] = "button", j["value"] = "重绘起点", j["className"] = "PowerGis-PGViewshed-jumpButton", j["setAttribute"]("data-bind", "click: StartAgain"), J["appendChild"](j), (j = document["createElement"]("input"))["type"] = "button", j["value"] = "重绘终点", j["className"] = "PowerGis-PGViewshed-deleteButton", j["setAttribute"]("data-bind", "click: DrawAgain"), J["appendChild"](j), (G = document["createElement"]("div"))["className"] = "PowerGis-PGViewshed-sectionHeader", (M = document["createElement"]("span"))["className"] = "PowerGis-PGViewshed-toggleSwitch", M["setAttribute"]("data-bind", "click: toggleGeneral, text: generalSwitchText"), G["appendChild"](M), G["appendChild"](document["createTextNode"]("参数设置")), p["appendChild"](G);
    var l = document["createElement"]("div");
    l["className"] = "PowerGis-PGViewshed-section", l["setAttribute"]("data-bind", "css: {'PowerGis-PGViewshed-show' : generalVisible, 'PowerGis-PGViewshed-hide' : !generalVisible}"), p["appendChild"](l), l["appendChild"](document["createTextNode"]("方向角")), (w = document["createElement"]("input"))["setAttribute"]("data-bind", "value: directionScreenDisplay"), w["type"] = "number";
    var L = document["createElement"]("input");
    L["type"] = "range", L["min"] = 0, L["max"] = 360, L["step"] = 1, L["setAttribute"]("data-bind", "valueUpdate: 'input',value:directionScreenDisplay");
    var v = document["createElement"]("div");
    v["appendChild"](L), v["appendChild"](w), l["appendChild"](v), l["appendChild"](document["createTextNode"]("俯仰角")), (w = document["createElement"]("input"))["setAttribute"]("data-bind", "value: pitchScreenDisplay"), w["type"] = "number";
    var x = document["createElement"]("input");
    x["type"] = "range", x["min"] = -90, x["max"] = 90, x["step"] = 1, x["setAttribute"]("data-bind", "valueUpdate: 'input',value:pitchScreenDisplay");
    var E = document["createElement"]("div");
    E["appendChild"](x), E["appendChild"](w), l["appendChild"](E), l["appendChild"](document["createTextNode"]("距离")), (w = document["createElement"]("input"))["setAttribute"]("data-bind", "value:distanceScreenDisplay"), w["id"] = "distance", w["type"] = "number";
    var q = document["createElement"]("input");
    q["type"] = "range", q["id"] = "slider", q["min"] = 0.1, q["max"] = 1000, q["step"] = 1, q["onchage"] = function () {
      this["max"] = this["value"];
    }, q["setAttribute"]("data-bind", "valueUpdate: 'input',value:distanceScreenDisplay");
    var u = document["createElement"]("div");
    u["appendChild"](q), u["appendChild"](w), l["appendChild"](u), l["appendChild"](document["createTextNode"]("水平视场角")), (w = document["createElement"]("input"))["setAttribute"]("data-bind", "value:horizontalFovScreenDisplay,enable:isSelected"), w.setAttribute("oninput", "if(value > 120){value = 1}");
    w["type"] = "number";
    var I = document["createElement"]("input");
    I["type"] = "range", I["min"] = 1, I["max"] = 120, I["step"] = 1, I["setAttribute"]("data-bind", "valueUpdate: 'input',value:horizontalFovScreenDisplay, enable:isSelected");
    var Q = document["createElement"]("div");
    Q["appendChild"](I), Q["appendChild"](w), l["appendChild"](Q), l["appendChild"](document["createTextNode"]("垂直视场角")), (w = document["createElement"]("input"))["setAttribute"]("data-bind", "value:verticalFovScreenDisplay"), w.setAttribute("oninput", "if(value > 90){value = 1}");
    w["type"] = "number";
    var y = document["createElement"]("input");
    y["type"] = "range", y["min"] = 1, y["max"] = 90, y["step"] = 1, y["setAttribute"]("data-bind", "valueUpdate: 'input',value:verticalFovScreenDisplay");
    var n = document["createElement"]("div");
    n["appendChild"](y), n["appendChild"](w), l["appendChild"](n);
    var N = document["createElement"]("div");
    N["className"] = "PowerGis-PGViewshed-buttonVisble", N["appendChild"](document["createTextNode"]("可见区域颜色")), (w = document["createElement"]("input"))["type"] = "color", w["setAttribute"]("data-bind", "valueUpdate: 'input',value:visibleAreaColorScreenDisplay"), N["appendChild"](w), l["appendChild"](N);
    var G,
        M,
        k = document["createElement"]("div");
    k["className"] = "PowerGis-PGViewshed-buttonHidden", k["appendChild"](document["createTextNode"]("不可见区域颜色")), (w = document["createElement"]("input"))["type"] = "color", w["setAttribute"]("data-bind", "valueUpdate: 'input',value:hiddenAreaColorScreenDisplay"), k["appendChild"](w), l["appendChild"](k), (G = document["createElement"]("div"))["className"] = "PowerGis-PGViewshed-sectionHeader", (M = document["createElement"]("span"))["className"] = "PowerGis-PGViewshed-toggleSwitch", M["setAttribute"]("data-bind", "click: toggleEditPosition, text: editPositionSwitchText"), G["appendChild"](M), G["appendChild"](document["createTextNode"]("起始位置调整")), p["appendChild"](G);
    var F = document["createElement"]("div");
    F["className"] = "PowerGis-PGViewshed-position", F["setAttribute"]("data-bind", "css: {'PowerGis-PGViewshed-show' : positionVisible, 'PowerGis-PGViewshed-hide' : !positionVisible}"), p["appendChild"](F);
    var C = document["createElement"]("div");
    C["className"] = "PowerGis-PGViewshed-position", C["appendChild"](document["createTextNode"]("经度")), (w = document["createElement"]("input"))["setAttribute"]("data-bind", "value: longtitudeScreenDisplay"), w["type"] = "number", w["step"] = "0.0000001", w["oninput"] = function () {
      A["selectedLongtitude"] = this["value"];
    }, C["appendChild"](w), F["appendChild"](C);
    var m = document["createElement"]("div");
    m["className"] = "PowerGis-PGViewshed-position", m["appendChild"](document["createTextNode"]("纬度")), (w = document["createElement"]("input"))["setAttribute"]("data-bind", "value: latitudeScreenDisplay"), w["type"] = "number", w["step"] = "0.0000001", w["oninput"] = function () {
      A["selectedLatitude"] = this["value"];
    }, m["appendChild"](w), F["appendChild"](m);
    var w,
        O = document["createElement"]("div");
    O["className"] = "PowerGis-PGViewshed-position", O["appendChild"](document["createTextNode"]("高度")), (w = document["createElement"]("input"))["setAttribute"]("data-bind", "value: heightScreenDisplay"), w["type"] = "number", w["step"] = "0.01", w["oninput"] = function () {
      A["selectedHeight"] = this["value"];
    }, O["appendChild"](w), F["appendChild"](O), c.applyBindings(A, this["_element"]);
  }

  e(g.prototype, {
    container: {
      get: function get() {
        return this["_container"];
      }
    },
    viewModel: {
      get: function get() {
        return this["_viewModel"];
      }
    }
  });

  g.prototype.isDestroyed = function () {
    return !1;
  };

  g.prototype.destroy = function () {
    c["cleanNode"](this["_element"]);
    this["_container"]["removeChild"](this["_element"]);
    this["viewModel"]["destroy"]();
    return h(this);
  };

  return g;
});