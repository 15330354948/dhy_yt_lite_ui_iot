"use strict";

define(["../Core/defined", "../Core/Event"], function (a, n) {
  "use strict";

  function t(t, i) {
    this.id = i, this.name = t, this.playlistIndex = 0, this.playlist = [], this.tourStart = new n(), this.tourEnd = new n(), this.entryStart = new n(), this.entryEnd = new n(), this._activeEntries = [];
  }

  function e(t) {
    for (var i = t.pop(); void 0 !== i; i = t.pop()) {
      i.stop();
    }
  }

  function l(t, i, n) {
    var e,
        s,
        r = this.playlist[this.playlistIndex];
    r ? (e = function (t, i, n, e) {
      var s = this.playlist[this.playlistIndex];
      {
        var r;
        this.entryEnd.raiseEvent(s, e), e ? n(e) : (0 <= (r = this._activeEntries.indexOf(s)) && this._activeEntries.splice(r, 1), this.playlistIndex++, l.call(this, t, i, n));
      }
    }.bind(this, t, i, n), this._activeEntries.push(r), this.entryStart.raiseEvent(r), r.blocking ? r.play(e, t.scene.camera, i) : (s = this, r.play(function () {
      s.entryEnd.raiseEvent(r);

      var t = s._activeEntries.indexOf(r);

      0 <= t && s._activeEntries.splice(t, 1);
    }), e(t, i, n))) : a(n) && n(!1);
  }

  return t.prototype.addPlaylistEntry = function (t) {
    this.playlist.push(t);
  }, t.prototype.play = function (t, i) {
    this.tourStart.raiseEvent();
    var n = this;
    l.call(this, t, i, function (t) {
      n.playlistIndex = 0, t || e(n._activeEntries), n.tourEnd.raiseEvent(t);
    });
  }, t.prototype.stop = function () {
    e(this._activeEntries);
  }, t;
});