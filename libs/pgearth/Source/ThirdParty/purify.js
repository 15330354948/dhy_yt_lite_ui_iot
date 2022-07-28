!function(e,t){"function"==typeof define&&define.amd?define(t):e.DOMPurify=t()}(this,function(){"use strict";var e=["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"],t=["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","audio","canvas","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","video","view","vkern"],n=["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"],r=["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmuliscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mpspace","msqrt","mystyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"],o=["#text"],i=["accept","action","align","alt","autocomplete","background","bgcolor","border","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","coords","crossorigin","datetime","default","dir","disabled","download","enctype","face","for","headers","height","hidden","high","href","hreflang","id","integrity","ismap","label","lang","list","loop","low","max","maxlength","media","method","min","multiple","name","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","type","usemap","valign","value","width","xmlns"],a=["accent-height","accumulate","additivive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","tabindex","targetx","targety","transform","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"],l=["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"],s=["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"];function c(e,t){for(var n=t.length;n--;)"string"==typeof t[n]&&(t[n]=t[n].toLowerCase()),e[t[n]]=!0;return e}function d(e){var t={},n=void 0;for(n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}var u=/\{\{[\s\S]*|[\s\S]*\}\}/gm,m=/<%[\s\S]*|[\s\S]*%>/gm,f=/^data-[\-\w.\u00B7-\uFFFF]/,p=/^aria-[\-\w]+$/,h=/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,g=/^(?:\w+script|data):/i,y=/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g,v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function b(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var T=function(){return"undefined"==typeof window?null:window};return function A(){var x=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T(),S=function(e){return A(e)};if(S.version="1.0.8",S.removed=[],!x||!x.document||9!==x.document.nodeType)return S.isSupported=!1,S;var k=x.document,w=!1,L=!1,E=x.document,N=x.DocumentFragment,O=x.HTMLTemplateElement,M=x.Node,_=x.NodeFilter,D=x.NamedNodeMap,C=void 0===D?x.NamedNodeMap||x.MozNamedAttrMap:D,R=x.Text,F=x.Comment,z=x.DOMParser;if("function"==typeof O){var H=E.createElement("template");H.content&&H.content.ownerDocument&&(E=H.content.ownerDocument)}var I=E,P=I.implementation,j=I.createNodeIterator,U=I.getElementsByTagName,W=I.createDocumentFragment,B=k.importNode,G={};S.isSupported=P&&void 0!==P.createHTMLDocument&&9!==E.documentMode;var q=u,V=m,Y=f,K=p,X=g,$=y,J=h,Q=null,Z=c({},[].concat(b(e),b(t),b(n),b(r),b(o))),ee=null,te=c({},[].concat(b(i),b(a),b(l),b(s))),ne=null,re=null,oe=!0,ie=!0,ae=!1,le=!1,se=!1,ce=!1,de=!1,ue=!1,me=!1,fe=!1,pe=!1,he=!0,ge=!0,ye=!1,ve={},be=c({},["audio","head","math","script","style","template","svg","video"]),Te=c({},["audio","video","img","source","image"]),Ae=c({},["alt","class","for","id","label","name","pattern","placeholder","summary","title","value","style","xmlns"]),xe=null,Se=E.createElement("form"),ke=function(u){"object"!==(void 0===u?"undefined":v(u))&&(u={}),Q="ALLOWED_TAGS"in u?c({},u.ALLOWED_TAGS):Z,ee="ALLOWED_ATTR"in u?c({},u.ALLOWED_ATTR):te,ne="FORBID_TAGS"in u?c({},u.FORBID_TAGS):{},re="FORBID_ATTR"in u?c({},u.FORBID_ATTR):{},ve="USE_PROFILES"in u&&u.USE_PROFILES,oe=!1!==u.ALLOW_ARIA_ATTR,ie=!1!==u.ALLOW_DATA_ATTR,ae=u.ALLOW_UNKNOWN_PROTOCOLS||!1,le=u.SAFE_FOR_JQUERY||!1,se=u.SAFE_FOR_TEMPLATES||!1,ce=u.WHOLE_DOCUMENT||!1,me=u.RETURN_DOM||!1,fe=u.RETURN_DOM_FRAGMENT||!1,pe=u.RETURN_DOM_IMPORT||!1,ue=u.FORCE_BODY||!1,he=!1!==u.SANITIZE_DOM,ge=!1!==u.KEEP_CONTENT,ye=u.IN_PLACE||!1,J=u.ALLOWED_URI_REGEXP||J,se&&(ie=!1),fe&&(me=!0),ve&&(Q=c({},[].concat(b(o))),ee=[],!0===ve.html&&(c(Q,e),c(ee,i)),!0===ve.svg&&(c(Q,t),c(ee,a),c(ee,s)),!0===ve.svgFilters&&(c(Q,n),c(ee,a),c(ee,s)),!0===ve.mathMl&&(c(Q,r),c(ee,l),c(ee,s))),u.ADD_TAGS&&(Q===Z&&(Q=d(Q)),c(Q,u.ADD_TAGS)),u.ADD_ATTR&&(ee===te&&(ee=d(ee)),c(ee,u.ADD_ATTR)),u.ADD_URI_SAFE_ATTR&&c(Ae,u.ADD_URI_SAFE_ATTR),ge&&(Q["#text"]=!0),ce&&c(Q,["html","head","body"]),Q.table&&c(Q,["tbody"]),Object&&"freeze"in Object&&Object.freeze(u),xe=u},we=function(e){S.removed.push({element:e});try{e.parentNode.removeChild(e)}catch(t){e.outerHTML=""}},Le=function(e,t){try{S.removed.push({attribute:t.getAttributeNode(e),from:t})}catch(e){S.removed.push({attribute:null,from:t})}t.removeAttribute(e)},Ee=function(e){var t=void 0,n=void 0;if(ue)e="<remove></remove>"+e;else{var r=e.match(/^[\s]+/);(n=r&&r[0])&&(e=e.slice(n.length))}if(w)try{t=(new z).parseFromString(e,"text/html")}catch(e){}if(L&&c(ne,["title"]),!t||!t.documentElement){var o=(t=P.createHTMLDocument("")).body;o.parentNode.removeChild(o.parentNode.firstElementChild),o.outerHTML=e}return n&&t.body.insertBefore(E.createTextNode(n),t.body.childNodes[0]||null),U.call(t,ce?"html":"body")[0]};S.isSupported&&(function(){try{Ee('<svg><p><style><img src="</style><img src=x onerror=alert(1)//">').querySelector("svg img")&&(w=!0)}catch(e){}}(),function(){try{Ee("<x/><title>&lt;/title&gt;&lt;img&gt;").querySelector("title").textContent.match(/<\/title/)&&(L=!0)}catch(e){}}());var Ne=function(e){return j.call(e.ownerDocument||e,e,_.SHOW_ELEMENT|_.SHOW_COMMENT|_.SHOW_TEXT,function(){return _.FILTER_ACCEPT},!1)},Oe=function(e){return"object"===(void 0===M?"undefined":v(M))?e instanceof M:e&&"object"===(void 0===e?"undefined":v(e))&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName},Me=function(e,t,n){G[e]&&G[e].forEach(function(e){e.call(S,t,n,xe)})},_e=function(e){var t,n=void 0;if(Me("beforeSanitizeElements",e,null),!((t=e)instanceof R||t instanceof F||"string"==typeof t.nodeName&&"string"==typeof t.textContent&&"function"==typeof t.removeChild&&t.attributes instanceof C&&"function"==typeof t.removeAttribute&&"function"==typeof t.setAttribute))return we(e),!0;var r=e.nodeName.toLowerCase();if(Me("uponSanitizeElement",e,{tagName:r,allowedTags:Q}),!Q[r]||ne[r]){if(ge&&!be[r]&&"function"==typeof e.insertAdjacentHTML)try{e.insertAdjacentHTML("AfterEnd",e.innerHTML)}catch(e){}return we(e),!0}return!le||e.firstElementChild||e.content&&e.content.firstElementChild||!/</g.test(e.textContent)||(S.removed.push({element:e.cloneNode()}),e.innerHTML?e.innerHTML=e.innerHTML.replace(/</g,"&lt;"):e.innerHTML=e.textContent.replace(/</g,"&lt;")),se&&3===e.nodeType&&(n=(n=(n=e.textContent).replace(q," ")).replace(V," "),e.textContent!==n&&(S.removed.push({element:e.cloneNode()}),e.textContent=n)),Me("afterSanitizeElements",e,null),!1},De=function(e,t,n){if(he&&("id"===t||"name"===t)&&(n in E||n in Se))return!1;if(se&&(n=(n=n.replace(q," ")).replace(V," ")),ie&&Y.test(t));else if(oe&&K.test(t));else{if(!ee[t]||re[t])return!1;if(Ae[t]);else if(J.test(n.replace($,"")));else if("src"!==t&&"xlink:href"!==t||"script"===e||0!==n.indexOf("data:")||!Te[e])if(ae&&!X.test(n.replace($,"")));else if(n)return!1}return!0},Ce=function(e){var t=void 0,n=void 0,r=void 0,o=void 0,i=void 0;Me("beforeSanitizeAttributes",e,null);var a=e.attributes;if(a){var l={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ee};for(i=a.length;i--;){var s=t=a[i],c=s.name,d=s.namespaceURI;if(n=t.value.trim(),r=c.toLowerCase(),l.attrName=r,l.attrValue=n,l.keepAttr=!0,Me("uponSanitizeAttribute",e,l),n=l.attrValue,"name"===r&&"IMG"===e.nodeName&&a.id)o=a.id,a=Array.prototype.slice.apply(a),Le("id",e),Le(c,e),a.indexOf(o)>i&&e.setAttribute("id",o.value);else{if("INPUT"===e.nodeName&&"type"===r&&"file"===n&&(ee[r]||!re[r]))continue;"id"===c&&e.setAttribute(c,""),Le(c,e)}if(l.keepAttr){var u=e.nodeName.toLowerCase();if(De(u,r,n))try{d?e.setAttributeNS(d,c,n):e.setAttribute(c,n),S.removed.pop()}catch(e){}}}Me("afterSanitizeAttributes",e,null)}},Re=function e(t){var n=void 0,r=Ne(t);for(Me("beforeSanitizeShadowDOM",t,null);n=r.nextNode();)Me("uponSanitizeShadowNode",n,null),_e(n)||(n.content instanceof N&&e(n.content),Ce(n));Me("afterSanitizeShadowDOM",t,null)};return S.sanitize=function(e,t){var n=void 0,r=void 0,o=void 0,i=void 0,a=void 0;if(e||(e="\x3c!--\x3e"),"string"!=typeof e&&!Oe(e)){if("function"!=typeof e.toString)throw new TypeError("toString is not a function");if("string"!=typeof(e=e.toString()))throw new TypeError("dirty is not a string, aborting")}if(!S.isSupported){if("object"===v(x.toStaticHTML)||"function"==typeof x.toStaticHTML){if("string"==typeof e)return x.toStaticHTML(e);if(Oe(e))return x.toStaticHTML(e.outerHTML)}return e}if(de||ke(t),S.removed=[],ye);else if(e instanceof M)1===(r=(n=Ee("\x3c!--\x3e")).ownerDocument.importNode(e,!0)).nodeType&&"BODY"===r.nodeName?n=r:n.appendChild(r);else{if(!me&&!ce&&-1===e.indexOf("<"))return e;if(!(n=Ee(e)))return me?null:""}n&&ue&&we(n.firstChild);for(var l=Ne(ye?e:n);o=l.nextNode();)3===o.nodeType&&o===i||_e(o)||(o.content instanceof N&&Re(o.content),Ce(o),i=o);if(ye)return e;if(me){if(fe)for(a=W.call(n.ownerDocument);n.firstChild;)a.appendChild(n.firstChild);else a=n;return pe&&(a=B.call(k,a,!0)),a}return ce?n.outerHTML:n.innerHTML},S.setConfig=function(e){ke(e),de=!0},S.clearConfig=function(){xe=null,de=!1},S.isValidAttribute=function(e,t,n){xe||ke({});var r=e.toLowerCase(),o=t.toLowerCase();return De(r,o,n)},S.addHook=function(e,t){"function"==typeof t&&(G[e]=G[e]||[],G[e].push(t))},S.removeHook=function(e){G[e]&&G[e].pop()},S.removeHooks=function(e){G[e]&&(G[e]=[])},S.removeAllHooks=function(){G={}},S}()});