define(function(){"use strict";return function(t,e,a,l,i){return function(){var n=document.createElement("canvas"),r=i+2*l;n.height=n.width=r;var c=n.getContext("2d");return c.clearRect(0,0,r,r),0!==l&&(c.beginPath(),c.arc(r/2,r/2,r/2,0,2*Math.PI,!0),c.closePath(),c.fillStyle=a,c.fill(),t<1&&(c.save(),c.globalCompositeOperation="destination-out",c.beginPath(),c.arc(r/2,r/2,i/2,0,2*Math.PI,!0),c.closePath(),c.fillStyle="black",c.fill(),c.restore())),c.beginPath(),c.arc(r/2,r/2,i/2,0,2*Math.PI,!0),c.closePath(),c.fillStyle=e,c.fill(),n}}});