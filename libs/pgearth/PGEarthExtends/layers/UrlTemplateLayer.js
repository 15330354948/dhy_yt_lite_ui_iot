define(["../../Source/Core/defined","../../Source/Scene/UrlTemplateImageryProvider","../../Source/Core/createGuid","../../Source/Core/DeveloperError",],function(e,d,b,a){function c(g){var h=h;if(!e(g.url)||g.url===""){throw new a("url is required")}var f=new d(g);f.id=g.id||h;return f}return c});