define(["../ThirdParty/when","../Core/defaultValue","../Core/defined","../Core/formatError"],function(r,e,t,n){"use strict";return function(s){var a;return function(o){var i=o.data,f=[],u={id:i.id,result:void 0,error:void 0};return r(function(e,t,n){try{return e(t,n)}catch(e){return r.reject(e)}}(s,i.parameters,f)).then(function(r){u.result=r}).otherwise(function(r){r instanceof Error?u.error={name:r.name,message:r.message,stack:r.stack}:u.error=r}).always(function(){t(a)||(a=e(self.webkitPostMessage,self.postMessage)),i.canTransferArrayBuffer||(f.length=0);try{a(u,f)}catch(r){u.result=void 0,u.error="postMessage failed with error: "+n(r)+"\n  with responseMessage: "+JSON.stringify(u),a(u)}})}}});