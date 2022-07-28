"use strict";

define(["../../Source/Core/createGuid", "../../Source/Core/Check", "../../Source/Core/AssociativeArray", "../../Source/Core/RuntimeError", "../../Source/DataSources/Entity"], function (b, d, c, a, f) {
  function e(h) {
    this._items = new c();

    if (!window.viewer && !h && !h.viewer) {
      console.error("Map viewer is required");
      return;
    }

    var g = h && h.viewer;
    var i = window.viewer || g;
    this.id = h && h.id || b();
    this.collection = i.entities.add(new f());
    this.items = this._items._array;
    this.length = this._items.length;
    Object.defineProperty(this, "show", {
      set: function set(j) {
        this.collection.show = j;
      },
      get: function get() {
        return this.collection.show;
      }
    });
  }

  e.prototype.findGraphicById = function (g) {
    d.typeOf.string("id", g);
    return this._items.get(g);
  };

  e.prototype.add = function (i) {
    d.typeOf.object("graphic", i);
    var h = i.id,
        g = this._items;

    if (g.contains(h)) {
      throw new a("A Graphic with id " + h + " already exist in this collection");
    }

    g.set(h, i);

    if (this.viewer) {
      i.parent = this.collection;
      this.viewer.entities.add(i);
      this.viewer.scene.requestRender();
      return i;
    }

    return i;
  };

  e.prototype.remove = function (g) {
    if (g instanceof f) {
      this._items.remove(g.id);

      return this.viewer.entities.remove(g);
    }
  };

  e.prototype.removeAll = function () {
    var g = this;
    this.items.forEach(function (h) {
      if (h instanceof f) {
        return this.viewer.entities.remove(h);
      }
    });

    this._items.removeAll();
  };

  return e;
});