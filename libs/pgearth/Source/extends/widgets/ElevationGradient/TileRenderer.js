define(["../../../Shaders/elevationGradientVert","../../../Shaders/elevationGradientFrag","../support/lodash"],function(t,e,r){const o=.75,n=.7857142857,a=2.3571428571,i=255,u={},s=(t,e)=>{const r=JSON.stringify({width:t,height:e});if(!u[r]){const o=document.createElement("canvas");o.width=t,o.height=e;const n=o.getContext("webgl")||o.getContext("experimental-webgl");u[r]={canvas:o,gl:n}}return u[r]};const E=t=>{const e=document.createElement("canvas");return e.width=t.width,e.height=t.height,e.getContext("2d").drawImage(t,0,0),e},c=(t,e)=>{if(!t.getShaderParameter(e,t.COMPILE_STATUS)){const r=t.getShaderInfoLog(e);console.error(`*** Error compiling shader '${e}':${r}`)}},T=(t,e,r)=>{const o=t.createProgram(),n=t.createShader(t.VERTEX_SHADER);t.shaderSource(n,e),t.compileShader(n),c(t,n),t.attachShader(o,n);const a=t.createShader(t.FRAGMENT_SHADER);if(t.shaderSource(a,r),t.compileShader(a),c(t,a),t.attachShader(o,a),t.linkProgram(o),!t.getProgramParameter(o,t.LINK_STATUS)){const e=t.getProgramInfoLog(o);return console.error(`Error in program linking:${e}`),t.deleteProgram(o),null}return o},h=(t,e,r,o,n)=>{const a=e,i=e+o,u=r,s=r+n;t.bufferData(t.ARRAY_BUFFER,new Float32Array([a,u,i,u,a,s,a,s,i,u,i,s]),t.STATIC_DRAW)};return class{constructor({width:r,height:o,gradientStops:n,gradientAmount:a,hillshadeAmount:i,contourAmount:u,majorContour:E,minorContour:c,contourOpacityThreshold:h,useSlope:_,contourColor:m}){const{canvas:g,gl:l}=s(r,o);if(this.canvasElement=g,this.gl=l,!this.gl)throw Error("Failed to get WebGL context");this.gradientStops=n;const A=e.replace(/GRADIENT_STOP_COUNT/g,this.gradientStops.length.toString()).replace(/CONTOUR_OPACITY_THRESHOLD/g,h.toString());this.program=T(this.gl,t,A),this.hillshadeAmount=i,this.gradientAmount=a,this.contourAmount=u,this.majorContour=E,this.minorContour=c,this.useSlope=_,this.contourColor=m}render(t,e,u,s,c){const{gl:T,program:_,canvasElement:m,gradientStops:g,majorContour:l,minorContour:A,gradientAmount:R,contourAmount:d,contourColor:f}=this,U=new ArrayBuffer(e.length),S=new Uint8Array(U);e.forEach((t,e)=>{S[e]=t*i});const x=new ArrayBuffer(4*t.length),D=new Uint8Array(x),P=r.min(t),p=r.max(t),L=p-P;t.forEach((t,e)=>{const r=(L<.001?0:(t-P)/(p-P))*i,o=(r-Math.floor(r))*i;D[4*e]=r,D[4*e+1]=o,D[4*e+2]=r+.5,D[4*e+3]=r+.75}),T.useProgram(_);const C=T.getAttribLocation(_,"a_position"),b=T.getAttribLocation(_,"a_texCoord"),X=.5/(u-1),w=X,I=1-X,F=T.createBuffer();T.bindBuffer(T.ARRAY_BUFFER,F),T.bufferData(T.ARRAY_BUFFER,new Float32Array([w,w,I,w,w,I,w,I,I,w,I,I]),T.STATIC_DRAW),T.enableVertexAttribArray(b),T.vertexAttribPointer(b,2,T.FLOAT,!1,0,0);const N=T.createTexture();T.bindTexture(T.TEXTURE_2D,N),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_WRAP_S,T.CLAMP_TO_EDGE),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_WRAP_T,T.CLAMP_TO_EDGE),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_MIN_FILTER,T.LINEAR),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_MAG_FILTER,T.LINEAR),T.texImage2D(T.TEXTURE_2D,0,T.RGBA,u,u,0,T.RGBA,T.UNSIGNED_BYTE,D);const v=T.createTexture();T.bindTexture(T.TEXTURE_2D,v),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_WRAP_S,T.CLAMP_TO_EDGE),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_WRAP_T,T.CLAMP_TO_EDGE),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_MIN_FILTER,T.LINEAR),T.texParameteri(T.TEXTURE_2D,T.TEXTURE_MAG_FILTER,T.LINEAR),T.texImage2D(T.TEXTURE_2D,0,T.ALPHA,s,s,0,T.ALPHA,T.UNSIGNED_BYTE,S);const G=(...t)=>{const e=t.length-1,r=T.getUniformLocation(_,t[0]);switch(e){case 1:T.uniform1f(r,t[1]);break;case 2:T.uniform2f(r,t[1],t[2]);break;case 3:T.uniform3f(r,t[1],t[2],t[3]);break;case 4:T.uniform4f(r,t[1],t[2],t[3],t[4]);break;default:throw new Error("unsupported uniform")}};G("u_resolution",m.width,m.height),G("u_tileElevationRange",P,p),G("u_textureSize",m.width,m.height),G("u_tileDimension",c.x,c.y),G("u_zFactor",o),G("u_zenith",n),G("u_azimuth",a),G("u_majorContour",l),G("u_minorContour",A),G("u_hillshadeAmount",this.hillshadeAmount),G("u_gradientAmount",R),G("u_contourAmount",d),G("u_useSlope",this.useSlope),G("u_contourColor",f.red,f.green,f.blue,f.alpha);const O=[];g.forEach(({color:{red:t,green:e,blue:r,alpha:o}})=>{O.push(t*o),O.push(e*o),O.push(r*o),O.push(o)});const y=g.map(({value:t})=>t),B=T.getUniformLocation(_,"u_gradientColors");T.uniform4fv(B,new Float32Array(O));const M=T.getUniformLocation(_,"u_gradientValues");T.uniform1fv(M,new Float32Array(y));const k=T.createBuffer();T.bindBuffer(T.ARRAY_BUFFER,k),T.enableVertexAttribArray(C),T.vertexAttribPointer(C,2,T.FLOAT,!1,0,0);const W=T.getUniformLocation(_,"u_image"),Y=T.getUniformLocation(_,"u_mask");return T.uniform1i(W,0),T.uniform1i(Y,1),T.activeTexture(T.TEXTURE0),T.bindTexture(T.TEXTURE_2D,N),T.activeTexture(T.TEXTURE1),T.bindTexture(T.TEXTURE_2D,v),h(T,0,0,m.width,m.height),T.drawArrays(T.TRIANGLES,0,6),E(m)}}});