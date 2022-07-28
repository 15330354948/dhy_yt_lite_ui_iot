define(["../../Core/IonGeocoderService","../../Core/CartographicGeocoderService","../../Core/defaultValue","../../Core/defined","../../Core/defineProperties","../../Core/DeveloperError","../../Core/Event","../../Core/GeocodeType","../../Core/Math","../../Core/Matrix4","../../Core/Rectangle","../../Core/sampleTerrainMostDetailed","../../Scene/computeFlyToLocationForRectangle","../../ThirdParty/knockout","../../ThirdParty/when","../createCommand","../getElement"],function(e,t,s,o,n,i,r,c,u,g,a,h,l,d,f,_,v){"use strict";var S=1e3;function p(n){if(!o(n)||!o(n.scene))throw new i("options.scene is required.");o(n.geocoderServices)?this._geocoderServices=n.geocoderServices:this._geocoderServices=[new t,new e({scene:n.scene})],this._viewContainer=n.container,this._scene=n.scene,this._flightDuration=n.flightDuration,this._searchText="",this._isSearchInProgress=!1,this._geocodePromise=void 0,this._complete=new r,this._suggestions=[],this._selectedSuggestion=void 0,this._showSuggestions=!0,this._handleArrowDown=y,this._handleArrowUp=m;var u=this;this._suggestionsVisible=d.pureComputed(function(){var e=d.getObservable(u,"_suggestions")().length>0,t=d.getObservable(u,"_showSuggestions")();return e&&t}),this._searchCommand=_(function(e){if(e=s(e,c.SEARCH),u._focusTextbox=!1,o(u._selectedSuggestion))return u.activateSuggestion(u._selectedSuggestion),!1;var t;u.hideSuggestions(),u.isSearchInProgress?((t=u)._isSearchInProgress=!1,o(t._geocodePromise)&&(t._geocodePromise.cancel=!0,t._geocodePromise=void 0)):function(e,t,s){var n=e._searchText;if(w(n))return void e.showSuggestions();e._isSearchInProgress=!0;for(var i=f.resolve(),r=0;r<t.length;r++)i=T(i,t[r],n,s);e._geocodePromise=i,i.then(function(t){if(!i.cancel){e._isSearchInProgress=!1;var s=t.value;if("fulfilled"===t.state&&o(s)&&s.length>0)return e._searchText=s[0].displayName,void e.destinationFound(e,s[0].destination);e._searchText=n+" (not found)"}})}(u,u._geocoderServices,e)}),this.deselectSuggestion=function(){u._selectedSuggestion=void 0},this.handleKeyDown=function(e,t){var s="ArrowDown"===t.key||"Down"===t.key||40===t.keyCode,o="ArrowUp"===t.key||"Up"===t.key||38===t.keyCode;return(s||o)&&t.preventDefault(),!0},this.handleKeyUp=function(e,t){var s="ArrowDown"===t.key||"Down"===t.key||40===t.keyCode,o="ArrowUp"===t.key||"Up"===t.key||38===t.keyCode,n="Enter"===t.key||13===t.keyCode;return o?m(u):s?y(u):n&&u._searchCommand(),!0},this.activateSuggestion=function(e){u.hideSuggestions(),u._searchText=e.displayName;var t=e.destination;C(u),u.destinationFound(u,t)},this.hideSuggestions=function(){u._showSuggestions=!1,u._selectedSuggestion=void 0},this.showSuggestions=function(){u._showSuggestions=!0},this.handleMouseover=function(e,t){e!==u._selectedSuggestion&&(u._selectedSuggestion=e)},this.keepExpanded=!1,this.autoComplete=s(n.autocomplete,!0),this.destinationFound=s(n.destinationFound,p.flyToDestination),this._focusTextbox=!1,d.track(this,["_searchText","_isSearchInProgress","keepExpanded","_suggestions","_selectedSuggestion","_showSuggestions","_focusTextbox"]);var g=d.getObservable(this,"_searchText");g.extend({rateLimit:{timeout:500}}),this._suggestionSubscription=g.subscribe(function(){p._updateSearchSuggestions(u)}),this.isSearchInProgress=void 0,d.defineProperty(this,"isSearchInProgress",{get:function(){return this._isSearchInProgress}}),this.searchText=void 0,d.defineProperty(this,"searchText",{get:function(){return this.isSearchInProgress?"Searching...":this._searchText},set:function(e){if("string"!=typeof e)throw new i("value must be a valid string.");this._searchText=e}}),this.flightDuration=void 0,d.defineProperty(this,"flightDuration",{get:function(){return this._flightDuration},set:function(e){if(o(e)&&e<0)throw new i("value must be positive.");this._flightDuration=e}})}function m(e){if(0!==e._suggestions.length){var t,s=e._suggestions.indexOf(e._selectedSuggestion);-1!==s&&0!==s?(t=s-1,e._selectedSuggestion=e._suggestions[t],p._adjustSuggestionsScroll(e,t)):e._selectedSuggestion=void 0}}function y(e){if(0!==e._suggestions.length){var t=e._suggestions.length,s=(e._suggestions.indexOf(e._selectedSuggestion)+1)%t;e._selectedSuggestion=e._suggestions[s],p._adjustSuggestionsScroll(e,s)}}function T(e,t,s,n){return e.then(function(e){return o(e)&&"fulfilled"===e.state&&e.value.length>0?e:t.geocode(s,n).then(function(e){return{state:"fulfilled",value:e}}).otherwise(function(e){return{state:"rejected",reason:e}})})}function w(e){return/^\s*$/.test(e)}function C(e){d.getObservable(e,"_suggestions").removeAll()}return n(p.prototype,{complete:{get:function(){return this._complete}},scene:{get:function(){return this._scene}},search:{get:function(){return this._searchCommand}},selectedSuggestion:{get:function(){return this._selectedSuggestion}},suggestions:{get:function(){return this._suggestions}}}),p.prototype.destroy=function(){this._suggestionSubscription.dispose()},p.flyToDestination=function(e,t){var s,n=e._scene,i=n.mapProjection.ellipsoid,r=n.camera,c=n.terrainProvider,d=t;t instanceof a?u.equalsEpsilon(t.south,t.north,u.EPSILON7)&&u.equalsEpsilon(t.east,t.west,u.EPSILON7)?t=a.center(t):s=l(t,n):t=i.cartesianToCartographic(t),o(s)||(s=function(e,t){var s=o(t)?t.availability:void 0;return o(s)?h(t,[e]).then(function(t){return(e=t[0]).height+=S,e}):(e.height+=S,f.resolve(e))}(t,c)),s.then(function(e){d=i.cartographicToCartesian(e)}).always(function(){r.flyTo({destination:d,complete:function(){e._complete.raiseEvent()},duration:e._flightDuration,endTransform:g.IDENTITY})})},p._updateSearchSuggestions=function(e){if(e.autoComplete){var t=e._searchText;if(C(e),!w(t)){var s=f.resolve([]);e._geocoderServices.forEach(function(e){s=s.then(function(s){return s.length>=5?s:e.geocode(t,c.AUTOCOMPLETE).then(function(e){return s=s.concat(e)})})}),s.then(function(t){for(var s=e._suggestions,o=0;o<t.length;o++)s.push(t[o])})}}},p._adjustSuggestionsScroll=function(e,t){var s=v(e._viewContainer),o=s.getElementsByClassName("search-results")[0],n=s.getElementsByTagName("li")[t];if(0!==t){var i=n.offsetTop;i+n.clientHeight>o.clientHeight?o.scrollTop=i+n.clientHeight:i<o.scrollTop&&(o.scrollTop=i)}else o.scrollTop=0},p});