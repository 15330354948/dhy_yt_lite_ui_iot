define(["../Core/BoundingSphere","../Core/combine","../Core/defined","../Core/EasingFunction"],function(i,t,e,a){"use strict";function n(i,t,e){this.type="KmlTourFlyTo",this.blocking=!0,this.activeCamera=null,this.activeCallback=null,this.duration=i,this.view=e,this.flyToMode=t}return n.prototype.play=function(t,a,n){if(this.activeCamera=a,e(t)&&null!==t){var o=this;this.activeCallback=function(i){delete o.activeCallback,delete o.activeCamera,t(!e(i)&&i)}}var h=this.getCameraOptions(n);if(this.view.headingPitchRoll)a.flyTo(h);else if(this.view.headingPitchRange){var l=new i(this.view.position);a.flyToBoundingSphere(l,h)}},n.prototype.stop=function(){e(this.activeCamera)&&this.activeCamera.cancelFlight(),e(this.activeCallback)&&this.activeCallback(!0)},n.prototype.getCameraOptions=function(i){var n={duration:this.duration};return e(this.activeCallback)&&(n.complete=this.activeCallback),"smooth"===this.flyToMode&&(n.easingFunction=a.LINEAR_NONE),this.view.headingPitchRoll?(n.destination=this.view.position,n.orientation=this.view.headingPitchRoll):this.view.headingPitchRange&&(n.offset=this.view.headingPitchRange),e(i)&&(n=t(n,i)),n},n});