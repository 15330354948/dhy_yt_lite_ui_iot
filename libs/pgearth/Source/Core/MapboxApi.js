define(["./Credit","./defined"],function(e,t){"use strict";var o,a={defaultAccessToken:void 0},s=!1,n="<b>This application is using PGEarth's default Mapbox access token.  Please create a new access token for the application as soon as possible and prior to deployment by visiting <a href=https://www.mapbox.com/account/apps/>https://www.mapbox.com/account/apps/</a>, and provide your token to PGEarth by setting the PGEarth.MapboxApi.defaultAccessToken property before constructing the PGEarthWidget or any other object that uses the Mapbox API.</b>";return a.getAccessToken=function(e){return t(e)?e:t(a.defaultAccessToken)?a.defaultAccessToken:(s||(console.log(n),s=!0),"pk.eyJ1IjoiYW5hbHl0aWNhbGdyYXBoaWNzIiwiYSI6ImNpd204Zm4wejAwNzYyeW5uNjYyZmFwdWEifQ.7i-VIZZWX8pd1bTfxIVj9g")},a.getErrorCredit=function(s){if(!t(s)&&!t(a.defaultAccessToken))return t(o)||(o=new e(n,!0)),o},a});