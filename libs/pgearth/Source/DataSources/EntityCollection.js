define(["../Core/AssociativeArray","../Core/createGuid","../Core/defined","../Core/defineProperties","../Core/DeveloperError","../Core/Event","../Core/Iso8601","../Core/JulianDate","../Core/RuntimeError","../Core/TimeInterval","./Entity"],function(e,t,i,n,s,r,o,h,d,a,u){"use strict";var v={id:void 0};function l(e){if(e._firing)e._refire=!0;else if(0===e._suspendCount){var t=e._addedEntities,i=e._removedEntities,n=e._changedEntities;if(0!==n.length||0!==t.length||0!==i.length){e._firing=!0;do{e._refire=!1;var s=t.values.slice(0),r=i.values.slice(0),o=n.values.slice(0);t.removeAll(),i.removeAll(),n.removeAll(),e._collectionChanged.raiseEvent(e,s,r,o)}while(e._refire);e._firing=!1}}}function _(i){this._owner=i,this._entities=new e,this._addedEntities=new e,this._removedEntities=new e,this._changedEntities=new e,this._suspendCount=0,this._collectionChanged=new r,this._id=t(),this._show=!0,this._firing=!1,this._refire=!1}return _.prototype.suspendEvents=function(){this._suspendCount++},_.prototype.resumeEvents=function(){if(0===this._suspendCount)throw new s("resumeEvents can not be called before suspendEvents.");this._suspendCount--,l(this)},_.collectionChangedEventCallback=void 0,n(_.prototype,{collectionChanged:{get:function(){return this._collectionChanged}},id:{get:function(){return this._id}},values:{get:function(){return this._entities.values}},show:{get:function(){return this._show},set:function(e){if(!i(e))throw new s("value is required.");if(e!==this._show){var t;this.suspendEvents();var n=[],r=this._entities.values,o=r.length;for(t=0;t<o;t++)n.push(r[t].isShowing);for(this._show=e,t=0;t<o;t++){var h=n[t],d=r[t];h!==d.isShowing&&d.definitionChanged.raiseEvent(d,"isShowing",d.isShowing,h)}this.resumeEvents()}}},owner:{get:function(){return this._owner}}}),_.prototype.computeAvailability=function(){for(var e=o.MAXIMUM_VALUE,t=o.MINIMUM_VALUE,n=this._entities.values,s=0,r=n.length;s<r;s++){var d=n[s].availability;if(i(d)){var u=d.start,v=d.stop;h.lessThan(u,e)&&!u.equals(o.MINIMUM_VALUE)&&(e=u),h.greaterThan(v,t)&&!v.equals(o.MAXIMUM_VALUE)&&(t=v)}}return o.MAXIMUM_VALUE.equals(e)&&(e=o.MINIMUM_VALUE),o.MINIMUM_VALUE.equals(t)&&(t=o.MAXIMUM_VALUE),new a({start:e,stop:t})},_.prototype.add=function(e){if(!i(e))throw new s("entity is required.");e instanceof u||(e=new u(e));var t=e.id,n=this._entities;if(n.contains(t))throw new d("An entity with id "+t+" already exists in this collection.");return e.entityCollection=this,n.set(t,e),this._removedEntities.remove(t)||this._addedEntities.set(t,e),e.definitionChanged.addEventListener(_.prototype._onEntityDefinitionChanged,this),l(this),e},_.prototype.remove=function(e){return!!i(e)&&this.removeById(e.id)},_.prototype.contains=function(e){if(!i(e))throw new s("entity is required");return this._entities.get(e.id)===e},_.prototype.removeById=function(e){if(!i(e))return!1;var t=this._entities.get(e);return!!this._entities.remove(e)&&(this._addedEntities.remove(e)||(this._removedEntities.set(e,t),this._changedEntities.remove(e)),this._entities.remove(e),t.definitionChanged.removeEventListener(_.prototype._onEntityDefinitionChanged,this),l(this),!0)},_.prototype.removeAll=function(){for(var e=this._entities,t=e.length,n=e.values,s=this._addedEntities,r=this._removedEntities,o=0;o<t;o++){var h=n[o],d=h.id,a=s.get(d);i(a)||(h.definitionChanged.removeEventListener(_.prototype._onEntityDefinitionChanged,this),r.set(d,h))}e.removeAll(),s.removeAll(),this._changedEntities.removeAll(),l(this)},_.prototype.getById=function(e){if(!i(e))throw new s("id is required.");return this._entities.get(e)},_.prototype.getOrCreateEntity=function(e){if(!i(e))throw new s("id is required.");var t=this._entities.get(e);return i(t)||(v.id=e,t=new u(v),this.add(t)),t},_.prototype._onEntityDefinitionChanged=function(e){var t=e.id;this._addedEntities.contains(t)||this._changedEntities.set(t,e),l(this)},_});