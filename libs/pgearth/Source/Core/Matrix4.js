define(["./Cartesian3","./Cartesian4","./Check","./defaultValue","./defined","./defineProperties","./freezeObject","./Math","./Matrix3","./RuntimeError"],function(t,e,r,n,a,o,i,u,f,c){"use strict";function s(t,e,r,a,o,i,u,f,c,s,y,p,O,b,l,m){this[0]=n(t,0),this[1]=n(o,0),this[2]=n(c,0),this[3]=n(O,0),this[4]=n(e,0),this[5]=n(i,0),this[6]=n(s,0),this[7]=n(b,0),this[8]=n(r,0),this[9]=n(u,0),this[10]=n(y,0),this[11]=n(l,0),this[12]=n(a,0),this[13]=n(f,0),this[14]=n(p,0),this[15]=n(m,0)}s.packedLength=16,s.pack=function(t,e,a){return r.typeOf.object("value",t),r.defined("array",e),a=n(a,0),e[a++]=t[0],e[a++]=t[1],e[a++]=t[2],e[a++]=t[3],e[a++]=t[4],e[a++]=t[5],e[a++]=t[6],e[a++]=t[7],e[a++]=t[8],e[a++]=t[9],e[a++]=t[10],e[a++]=t[11],e[a++]=t[12],e[a++]=t[13],e[a++]=t[14],e[a]=t[15],e},s.unpack=function(t,e,o){return r.defined("array",t),e=n(e,0),a(o)||(o=new s),o[0]=t[e++],o[1]=t[e++],o[2]=t[e++],o[3]=t[e++],o[4]=t[e++],o[5]=t[e++],o[6]=t[e++],o[7]=t[e++],o[8]=t[e++],o[9]=t[e++],o[10]=t[e++],o[11]=t[e++],o[12]=t[e++],o[13]=t[e++],o[14]=t[e++],o[15]=t[e],o},s.clone=function(t,e){if(a(t))return a(e)?(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e):new s(t[0],t[4],t[8],t[12],t[1],t[5],t[9],t[13],t[2],t[6],t[10],t[14],t[3],t[7],t[11],t[15])},s.fromArray=s.unpack,s.fromColumnMajorArray=function(t,e){return r.defined("values",t),s.clone(t,e)},s.fromRowMajorArray=function(t,e){return r.defined("values",t),a(e)?(e[0]=t[0],e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=t[1],e[5]=t[5],e[6]=t[9],e[7]=t[13],e[8]=t[2],e[9]=t[6],e[10]=t[10],e[11]=t[14],e[12]=t[3],e[13]=t[7],e[14]=t[11],e[15]=t[15],e):new s(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10],t[11],t[12],t[13],t[14],t[15])},s.fromRotationTranslation=function(e,o,i){return r.typeOf.object("rotation",e),o=n(o,t.ZERO),a(i)?(i[0]=e[0],i[1]=e[1],i[2]=e[2],i[3]=0,i[4]=e[3],i[5]=e[4],i[6]=e[5],i[7]=0,i[8]=e[6],i[9]=e[7],i[10]=e[8],i[11]=0,i[12]=o.x,i[13]=o.y,i[14]=o.z,i[15]=1,i):new s(e[0],e[3],e[6],o.x,e[1],e[4],e[7],o.y,e[2],e[5],e[8],o.z,0,0,0,1)},s.fromTranslationQuaternionRotationScale=function(t,e,n,o){r.typeOf.object("translation",t),r.typeOf.object("rotation",e),r.typeOf.object("scale",n),a(o)||(o=new s);var i=n.x,u=n.y,f=n.z,c=e.x*e.x,y=e.x*e.y,p=e.x*e.z,O=e.x*e.w,b=e.y*e.y,l=e.y*e.z,m=e.y*e.w,h=e.z*e.z,j=e.z*e.w,x=e.w*e.w,M=c-b-h+x,w=2*(y-j),v=2*(p+m),d=2*(y+j),g=-c+b-h+x,z=2*(l-O),T=2*(p-m),R=2*(l+O),C=-c-b+h+x;return o[0]=M*i,o[1]=d*i,o[2]=T*i,o[3]=0,o[4]=w*u,o[5]=g*u,o[6]=R*u,o[7]=0,o[8]=v*f,o[9]=z*f,o[10]=C*f,o[11]=0,o[12]=t.x,o[13]=t.y,o[14]=t.z,o[15]=1,o},s.fromTranslationRotationScale=function(t,e){return r.typeOf.object("translationRotationScale",t),s.fromTranslationQuaternionRotationScale(t.translation,t.rotation,t.scale,e)},s.fromTranslation=function(t,e){return r.typeOf.object("translation",t),s.fromRotationTranslation(f.IDENTITY,t,e)},s.fromScale=function(t,e){return r.typeOf.object("scale",t),a(e)?(e[0]=t.x,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=t.y,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=t.z,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e):new s(t.x,0,0,0,0,t.y,0,0,0,0,t.z,0,0,0,0,1)},s.fromUniformScale=function(t,e){return r.typeOf.number("scale",t),a(e)?(e[0]=t,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=t,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=t,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e):new s(t,0,0,0,0,t,0,0,0,0,t,0,0,0,0,1)};var y=new t,p=new t,O=new t;s.fromCamera=function(e,n){r.typeOf.object("camera",e);var o=e.position,i=e.direction,u=e.up;r.typeOf.object("camera.position",o),r.typeOf.object("camera.direction",i),r.typeOf.object("camera.up",u),t.normalize(i,y),t.normalize(t.cross(y,u,p),p),t.normalize(t.cross(p,y,O),O);var f=p.x,c=p.y,b=p.z,l=y.x,m=y.y,h=y.z,j=O.x,x=O.y,M=O.z,w=o.x,v=o.y,d=o.z,g=f*-w+c*-v+b*-d,z=j*-w+x*-v+M*-d,T=l*w+m*v+h*d;return a(n)?(n[0]=f,n[1]=j,n[2]=-l,n[3]=0,n[4]=c,n[5]=x,n[6]=-m,n[7]=0,n[8]=b,n[9]=M,n[10]=-h,n[11]=0,n[12]=g,n[13]=z,n[14]=T,n[15]=1,n):new s(f,c,b,g,j,x,M,z,-l,-m,-h,T,0,0,0,1)},s.computePerspectiveFieldOfView=function(t,e,n,a,o){r.typeOf.number.greaterThan("fovY",t,0),r.typeOf.number.lessThan("fovY",t,Math.PI),r.typeOf.number.greaterThan("near",n,0),r.typeOf.number.greaterThan("far",a,0),r.typeOf.object("result",o);var i=1/Math.tan(.5*t),u=i/e,f=(a+n)/(n-a),c=2*a*n/(n-a);return o[0]=u,o[1]=0,o[2]=0,o[3]=0,o[4]=0,o[5]=i,o[6]=0,o[7]=0,o[8]=0,o[9]=0,o[10]=f,o[11]=-1,o[12]=0,o[13]=0,o[14]=c,o[15]=0,o},s.computeOrthographicOffCenter=function(t,e,n,a,o,i,u){r.typeOf.number("left",t),r.typeOf.number("right",e),r.typeOf.number("bottom",n),r.typeOf.number("top",a),r.typeOf.number("near",o),r.typeOf.number("far",i),r.typeOf.object("result",u);var f=1/(e-t),c=1/(a-n),s=1/(i-o),y=-(e+t)*f,p=-(a+n)*c,O=-(i+o)*s;return f*=2,c*=2,s*=-2,u[0]=f,u[1]=0,u[2]=0,u[3]=0,u[4]=0,u[5]=c,u[6]=0,u[7]=0,u[8]=0,u[9]=0,u[10]=s,u[11]=0,u[12]=y,u[13]=p,u[14]=O,u[15]=1,u},s.computePerspectiveOffCenter=function(t,e,n,a,o,i,u){r.typeOf.number("left",t),r.typeOf.number("right",e),r.typeOf.number("bottom",n),r.typeOf.number("top",a),r.typeOf.number("near",o),r.typeOf.number("far",i),r.typeOf.object("result",u);var f=2*o/(e-t),c=2*o/(a-n),s=(e+t)/(e-t),y=(a+n)/(a-n),p=-(i+o)/(i-o),O=-2*i*o/(i-o);return u[0]=f,u[1]=0,u[2]=0,u[3]=0,u[4]=0,u[5]=c,u[6]=0,u[7]=0,u[8]=s,u[9]=y,u[10]=p,u[11]=-1,u[12]=0,u[13]=0,u[14]=O,u[15]=0,u},s.computeInfinitePerspectiveOffCenter=function(t,e,n,a,o,i){r.typeOf.number("left",t),r.typeOf.number("right",e),r.typeOf.number("bottom",n),r.typeOf.number("top",a),r.typeOf.number("near",o),r.typeOf.object("result",i);var u=2*o/(e-t),f=2*o/(a-n),c=(e+t)/(e-t),s=(a+n)/(a-n),y=-2*o;return i[0]=u,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=f,i[6]=0,i[7]=0,i[8]=c,i[9]=s,i[10]=-1,i[11]=-1,i[12]=0,i[13]=0,i[14]=y,i[15]=0,i},s.computeViewportTransformation=function(t,e,a,o){r.typeOf.object("result",o),t=n(t,n.EMPTY_OBJECT);var i=n(t.x,0),u=n(t.y,0),f=n(t.width,0),c=n(t.height,0);e=n(e,0);var s=.5*f,y=.5*c,p=.5*((a=n(a,1))-e),O=s,b=y,l=p,m=i+s,h=u+y,j=e+p;return o[0]=O,o[1]=0,o[2]=0,o[3]=0,o[4]=0,o[5]=b,o[6]=0,o[7]=0,o[8]=0,o[9]=0,o[10]=l,o[11]=0,o[12]=m,o[13]=h,o[14]=j,o[15]=1,o},s.computeView=function(e,n,a,o,i){return r.typeOf.object("position",e),r.typeOf.object("direction",n),r.typeOf.object("up",a),r.typeOf.object("right",o),r.typeOf.object("result",i),i[0]=o.x,i[1]=a.x,i[2]=-n.x,i[3]=0,i[4]=o.y,i[5]=a.y,i[6]=-n.y,i[7]=0,i[8]=o.z,i[9]=a.z,i[10]=-n.z,i[11]=0,i[12]=-t.dot(o,e),i[13]=-t.dot(a,e),i[14]=t.dot(n,e),i[15]=1,i},s.toArray=function(t,e){return r.typeOf.object("matrix",t),a(e)?(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4],e[5]=t[5],e[6]=t[6],e[7]=t[7],e[8]=t[8],e[9]=t[9],e[10]=t[10],e[11]=t[11],e[12]=t[12],e[13]=t[13],e[14]=t[14],e[15]=t[15],e):[t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10],t[11],t[12],t[13],t[14],t[15]]},s.getElementIndex=function(t,e){return r.typeOf.number.greaterThanOrEquals("row",e,0),r.typeOf.number.lessThanOrEquals("row",e,3),r.typeOf.number.greaterThanOrEquals("column",t,0),r.typeOf.number.lessThanOrEquals("column",t,3),4*t+e},s.getColumn=function(t,e,n){r.typeOf.object("matrix",t),r.typeOf.number.greaterThanOrEquals("index",e,0),r.typeOf.number.lessThanOrEquals("index",e,3),r.typeOf.object("result",n);var a=4*e,o=t[a],i=t[a+1],u=t[a+2],f=t[a+3];return n.x=o,n.y=i,n.z=u,n.w=f,n},s.setColumn=function(t,e,n,a){r.typeOf.object("matrix",t),r.typeOf.number.greaterThanOrEquals("index",e,0),r.typeOf.number.lessThanOrEquals("index",e,3),r.typeOf.object("cartesian",n),r.typeOf.object("result",a);var o=4*e;return(a=s.clone(t,a))[o]=n.x,a[o+1]=n.y,a[o+2]=n.z,a[o+3]=n.w,a},s.setTranslation=function(t,e,n){return r.typeOf.object("matrix",t),r.typeOf.object("translation",e),r.typeOf.object("result",n),n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=t[15],n};var b=new t;s.setScale=function(e,n,a){r.typeOf.object("matrix",e),r.typeOf.object("scale",n),r.typeOf.object("result",a);var o=s.getScale(e,b),i=t.divideComponents(n,o,b);return s.multiplyByScale(e,i,a)},s.getRow=function(t,e,n){r.typeOf.object("matrix",t),r.typeOf.number.greaterThanOrEquals("index",e,0),r.typeOf.number.lessThanOrEquals("index",e,3),r.typeOf.object("result",n);var a=t[e],o=t[e+4],i=t[e+8],u=t[e+12];return n.x=a,n.y=o,n.z=i,n.w=u,n},s.setRow=function(t,e,n,a){return r.typeOf.object("matrix",t),r.typeOf.number.greaterThanOrEquals("index",e,0),r.typeOf.number.lessThanOrEquals("index",e,3),r.typeOf.object("cartesian",n),r.typeOf.object("result",a),(a=s.clone(t,a))[e]=n.x,a[e+4]=n.y,a[e+8]=n.z,a[e+12]=n.w,a};var l=new t;s.getScale=function(e,n){return r.typeOf.object("matrix",e),r.typeOf.object("result",n),n.x=t.magnitude(t.fromElements(e[0],e[1],e[2],l)),n.y=t.magnitude(t.fromElements(e[4],e[5],e[6],l)),n.z=t.magnitude(t.fromElements(e[8],e[9],e[10],l)),n};var m=new t;s.getMaximumScale=function(e){return s.getScale(e,m),t.maximumComponent(m)},s.multiply=function(t,e,n){r.typeOf.object("left",t),r.typeOf.object("right",e),r.typeOf.object("result",n);var a=t[0],o=t[1],i=t[2],u=t[3],f=t[4],c=t[5],s=t[6],y=t[7],p=t[8],O=t[9],b=t[10],l=t[11],m=t[12],h=t[13],j=t[14],x=t[15],M=e[0],w=e[1],v=e[2],d=e[3],g=e[4],z=e[5],T=e[6],R=e[7],C=e[8],E=e[9],q=e[10],L=e[11],N=e[12],S=e[13],U=e[14],W=e[15],B=a*M+f*w+p*v+m*d,P=o*M+c*w+O*v+h*d,I=i*M+s*w+b*v+j*d,k=u*M+y*w+l*v+x*d,A=a*g+f*z+p*T+m*R,V=o*g+c*z+O*T+h*R,Y=i*g+s*z+b*T+j*R,D=u*g+y*z+l*T+x*R,Q=a*C+f*E+p*q+m*L,Z=o*C+c*E+O*q+h*L,F=i*C+s*E+b*q+j*L,J=u*C+y*E+l*q+x*L,_=a*N+f*S+p*U+m*W,G=o*N+c*S+O*U+h*W,H=i*N+s*S+b*U+j*W,K=u*N+y*S+l*U+x*W;return n[0]=B,n[1]=P,n[2]=I,n[3]=k,n[4]=A,n[5]=V,n[6]=Y,n[7]=D,n[8]=Q,n[9]=Z,n[10]=F,n[11]=J,n[12]=_,n[13]=G,n[14]=H,n[15]=K,n},s.add=function(t,e,n){return r.typeOf.object("left",t),r.typeOf.object("right",e),r.typeOf.object("result",n),n[0]=t[0]+e[0],n[1]=t[1]+e[1],n[2]=t[2]+e[2],n[3]=t[3]+e[3],n[4]=t[4]+e[4],n[5]=t[5]+e[5],n[6]=t[6]+e[6],n[7]=t[7]+e[7],n[8]=t[8]+e[8],n[9]=t[9]+e[9],n[10]=t[10]+e[10],n[11]=t[11]+e[11],n[12]=t[12]+e[12],n[13]=t[13]+e[13],n[14]=t[14]+e[14],n[15]=t[15]+e[15],n},s.subtract=function(t,e,n){return r.typeOf.object("left",t),r.typeOf.object("right",e),r.typeOf.object("result",n),n[0]=t[0]-e[0],n[1]=t[1]-e[1],n[2]=t[2]-e[2],n[3]=t[3]-e[3],n[4]=t[4]-e[4],n[5]=t[5]-e[5],n[6]=t[6]-e[6],n[7]=t[7]-e[7],n[8]=t[8]-e[8],n[9]=t[9]-e[9],n[10]=t[10]-e[10],n[11]=t[11]-e[11],n[12]=t[12]-e[12],n[13]=t[13]-e[13],n[14]=t[14]-e[14],n[15]=t[15]-e[15],n},s.multiplyTransformation=function(t,e,n){r.typeOf.object("left",t),r.typeOf.object("right",e),r.typeOf.object("result",n);var a=t[0],o=t[1],i=t[2],u=t[4],f=t[5],c=t[6],s=t[8],y=t[9],p=t[10],O=t[12],b=t[13],l=t[14],m=e[0],h=e[1],j=e[2],x=e[4],M=e[5],w=e[6],v=e[8],d=e[9],g=e[10],z=e[12],T=e[13],R=e[14],C=a*m+u*h+s*j,E=o*m+f*h+y*j,q=i*m+c*h+p*j,L=a*x+u*M+s*w,N=o*x+f*M+y*w,S=i*x+c*M+p*w,U=a*v+u*d+s*g,W=o*v+f*d+y*g,B=i*v+c*d+p*g,P=a*z+u*T+s*R+O,I=o*z+f*T+y*R+b,k=i*z+c*T+p*R+l;return n[0]=C,n[1]=E,n[2]=q,n[3]=0,n[4]=L,n[5]=N,n[6]=S,n[7]=0,n[8]=U,n[9]=W,n[10]=B,n[11]=0,n[12]=P,n[13]=I,n[14]=k,n[15]=1,n},s.multiplyByMatrix3=function(t,e,n){r.typeOf.object("matrix",t),r.typeOf.object("rotation",e),r.typeOf.object("result",n);var a=t[0],o=t[1],i=t[2],u=t[4],f=t[5],c=t[6],s=t[8],y=t[9],p=t[10],O=e[0],b=e[1],l=e[2],m=e[3],h=e[4],j=e[5],x=e[6],M=e[7],w=e[8],v=a*O+u*b+s*l,d=o*O+f*b+y*l,g=i*O+c*b+p*l,z=a*m+u*h+s*j,T=o*m+f*h+y*j,R=i*m+c*h+p*j,C=a*x+u*M+s*w,E=o*x+f*M+y*w,q=i*x+c*M+p*w;return n[0]=v,n[1]=d,n[2]=g,n[3]=0,n[4]=z,n[5]=T,n[6]=R,n[7]=0,n[8]=C,n[9]=E,n[10]=q,n[11]=0,n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],n},s.multiplyByTranslation=function(t,e,n){r.typeOf.object("matrix",t),r.typeOf.object("translation",e),r.typeOf.object("result",n);var a=e.x,o=e.y,i=e.z,u=a*t[0]+o*t[4]+i*t[8]+t[12],f=a*t[1]+o*t[5]+i*t[9]+t[13],c=a*t[2]+o*t[6]+i*t[10]+t[14];return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=u,n[13]=f,n[14]=c,n[15]=t[15],n};var h=new t;s.multiplyByUniformScale=function(t,e,n){return r.typeOf.object("matrix",t),r.typeOf.number("scale",e),r.typeOf.object("result",n),h.x=e,h.y=e,h.z=e,s.multiplyByScale(t,h,n)},s.multiplyByScale=function(t,e,n){r.typeOf.object("matrix",t),r.typeOf.object("scale",e),r.typeOf.object("result",n);var a=e.x,o=e.y,i=e.z;return 1===a&&1===o&&1===i?s.clone(t,n):(n[0]=a*t[0],n[1]=a*t[1],n[2]=a*t[2],n[3]=0,n[4]=o*t[4],n[5]=o*t[5],n[6]=o*t[6],n[7]=0,n[8]=i*t[8],n[9]=i*t[9],n[10]=i*t[10],n[11]=0,n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=1,n)},s.multiplyByVector=function(t,e,n){r.typeOf.object("matrix",t),r.typeOf.object("cartesian",e),r.typeOf.object("result",n);var a=e.x,o=e.y,i=e.z,u=e.w,f=t[0]*a+t[4]*o+t[8]*i+t[12]*u,c=t[1]*a+t[5]*o+t[9]*i+t[13]*u,s=t[2]*a+t[6]*o+t[10]*i+t[14]*u,y=t[3]*a+t[7]*o+t[11]*i+t[15]*u;return n.x=f,n.y=c,n.z=s,n.w=y,n},s.multiplyByPointAsVector=function(t,e,n){r.typeOf.object("matrix",t),r.typeOf.object("cartesian",e),r.typeOf.object("result",n);var a=e.x,o=e.y,i=e.z,u=t[0]*a+t[4]*o+t[8]*i,f=t[1]*a+t[5]*o+t[9]*i,c=t[2]*a+t[6]*o+t[10]*i;return n.x=u,n.y=f,n.z=c,n},s.multiplyByPoint=function(t,e,n){r.typeOf.object("matrix",t),r.typeOf.object("cartesian",e),r.typeOf.object("result",n);var a=e.x,o=e.y,i=e.z,u=t[0]*a+t[4]*o+t[8]*i+t[12],f=t[1]*a+t[5]*o+t[9]*i+t[13],c=t[2]*a+t[6]*o+t[10]*i+t[14];return n.x=u,n.y=f,n.z=c,n},s.multiplyByScalar=function(t,e,n){return r.typeOf.object("matrix",t),r.typeOf.number("scalar",e),r.typeOf.object("result",n),n[0]=t[0]*e,n[1]=t[1]*e,n[2]=t[2]*e,n[3]=t[3]*e,n[4]=t[4]*e,n[5]=t[5]*e,n[6]=t[6]*e,n[7]=t[7]*e,n[8]=t[8]*e,n[9]=t[9]*e,n[10]=t[10]*e,n[11]=t[11]*e,n[12]=t[12]*e,n[13]=t[13]*e,n[14]=t[14]*e,n[15]=t[15]*e,n},s.negate=function(t,e){return r.typeOf.object("matrix",t),r.typeOf.object("result",e),e[0]=-t[0],e[1]=-t[1],e[2]=-t[2],e[3]=-t[3],e[4]=-t[4],e[5]=-t[5],e[6]=-t[6],e[7]=-t[7],e[8]=-t[8],e[9]=-t[9],e[10]=-t[10],e[11]=-t[11],e[12]=-t[12],e[13]=-t[13],e[14]=-t[14],e[15]=-t[15],e},s.transpose=function(t,e){r.typeOf.object("matrix",t),r.typeOf.object("result",e);var n=t[1],a=t[2],o=t[3],i=t[6],u=t[7],f=t[11];return e[0]=t[0],e[1]=t[4],e[2]=t[8],e[3]=t[12],e[4]=n,e[5]=t[5],e[6]=t[9],e[7]=t[13],e[8]=a,e[9]=i,e[10]=t[10],e[11]=t[14],e[12]=o,e[13]=u,e[14]=f,e[15]=t[15],e},s.abs=function(t,e){return r.typeOf.object("matrix",t),r.typeOf.object("result",e),e[0]=Math.abs(t[0]),e[1]=Math.abs(t[1]),e[2]=Math.abs(t[2]),e[3]=Math.abs(t[3]),e[4]=Math.abs(t[4]),e[5]=Math.abs(t[5]),e[6]=Math.abs(t[6]),e[7]=Math.abs(t[7]),e[8]=Math.abs(t[8]),e[9]=Math.abs(t[9]),e[10]=Math.abs(t[10]),e[11]=Math.abs(t[11]),e[12]=Math.abs(t[12]),e[13]=Math.abs(t[13]),e[14]=Math.abs(t[14]),e[15]=Math.abs(t[15]),e},s.equals=function(t,e){return t===e||a(t)&&a(e)&&t[12]===e[12]&&t[13]===e[13]&&t[14]===e[14]&&t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]&&t[4]===e[4]&&t[5]===e[5]&&t[6]===e[6]&&t[8]===e[8]&&t[9]===e[9]&&t[10]===e[10]&&t[3]===e[3]&&t[7]===e[7]&&t[11]===e[11]&&t[15]===e[15]},s.equalsEpsilon=function(t,e,n){return r.typeOf.number("epsilon",n),t===e||a(t)&&a(e)&&Math.abs(t[0]-e[0])<=n&&Math.abs(t[1]-e[1])<=n&&Math.abs(t[2]-e[2])<=n&&Math.abs(t[3]-e[3])<=n&&Math.abs(t[4]-e[4])<=n&&Math.abs(t[5]-e[5])<=n&&Math.abs(t[6]-e[6])<=n&&Math.abs(t[7]-e[7])<=n&&Math.abs(t[8]-e[8])<=n&&Math.abs(t[9]-e[9])<=n&&Math.abs(t[10]-e[10])<=n&&Math.abs(t[11]-e[11])<=n&&Math.abs(t[12]-e[12])<=n&&Math.abs(t[13]-e[13])<=n&&Math.abs(t[14]-e[14])<=n&&Math.abs(t[15]-e[15])<=n},s.getTranslation=function(t,e){return r.typeOf.object("matrix",t),r.typeOf.object("result",e),e.x=t[12],e.y=t[13],e.z=t[14],e},s.getRotation=function(t,e){return r.typeOf.object("matrix",t),r.typeOf.object("result",e),e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[4],e[4]=t[5],e[5]=t[6],e[6]=t[8],e[7]=t[9],e[8]=t[10],e};var j=new f,x=new f,M=new e,w=new e(0,0,0,1);return s.inverse=function(t,n){r.typeOf.object("matrix",t),r.typeOf.object("result",n);var a=t[0],o=t[4],i=t[8],y=t[12],p=t[1],O=t[5],b=t[9],l=t[13],m=t[2],h=t[6],v=t[10],d=t[14],g=t[3],z=t[7],T=t[11],R=t[15],C=v*R,E=d*T,q=h*R,L=d*z,N=h*T,S=v*z,U=m*R,W=d*g,B=m*T,P=v*g,I=m*z,k=h*g,A=C*O+L*b+N*l-(E*O+q*b+S*l),V=E*p+U*b+P*l-(C*p+W*b+B*l),Y=q*p+W*O+I*l-(L*p+U*O+k*l),D=S*p+B*O+k*b-(N*p+P*O+I*b),Q=E*o+q*i+S*y-(C*o+L*i+N*y),Z=C*a+W*i+B*y-(E*a+U*i+P*y),F=L*a+U*o+k*y-(q*a+W*o+I*y),J=N*a+P*o+I*i-(S*a+B*o+k*i),_=(C=i*l)*z+(L=y*O)*T+(N=o*b)*R-((E=y*b)*z+(q=o*l)*T+(S=i*O)*R),G=E*g+(U=a*l)*T+(P=i*p)*R-(C*g+(W=y*p)*T+(B=a*b)*R),H=q*g+W*z+(I=a*O)*R-(L*g+U*z+(k=o*p)*R),K=S*g+B*z+k*T-(N*g+P*z+I*T),X=q*v+S*d+E*h-(N*d+C*h+L*v),$=B*d+C*m+W*v-(U*v+P*d+E*m),tt=U*h+k*d+L*m-(I*d+q*m+W*h),et=I*v+N*m+P*h-(B*h+k*v+S*m),rt=a*A+o*V+i*Y+y*D;if(Math.abs(rt)<u.EPSILON21){if(f.equalsEpsilon(s.getRotation(t,j),x,u.EPSILON7)&&e.equals(s.getRow(t,3,M),w))return n[0]=0,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=0,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=0,n[11]=0,n[12]=-t[12],n[13]=-t[13],n[14]=-t[14],n[15]=1,n;throw new c("matrix is not invertible because its determinate is zero.")}return rt=1/rt,n[0]=A*rt,n[1]=V*rt,n[2]=Y*rt,n[3]=D*rt,n[4]=Q*rt,n[5]=Z*rt,n[6]=F*rt,n[7]=J*rt,n[8]=_*rt,n[9]=G*rt,n[10]=H*rt,n[11]=K*rt,n[12]=X*rt,n[13]=$*rt,n[14]=tt*rt,n[15]=et*rt,n},s.inverseTransformation=function(t,e){r.typeOf.object("matrix",t),r.typeOf.object("result",e);var n=t[0],a=t[1],o=t[2],i=t[4],u=t[5],f=t[6],c=t[8],s=t[9],y=t[10],p=t[12],O=t[13],b=t[14],l=-n*p-a*O-o*b,m=-i*p-u*O-f*b,h=-c*p-s*O-y*b;return e[0]=n,e[1]=i,e[2]=c,e[3]=0,e[4]=a,e[5]=u,e[6]=s,e[7]=0,e[8]=o,e[9]=f,e[10]=y,e[11]=0,e[12]=l,e[13]=m,e[14]=h,e[15]=1,e},s.IDENTITY=i(new s(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)),s.ZERO=i(new s(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)),s.COLUMN0ROW0=0,s.COLUMN0ROW1=1,s.COLUMN0ROW2=2,s.COLUMN0ROW3=3,s.COLUMN1ROW0=4,s.COLUMN1ROW1=5,s.COLUMN1ROW2=6,s.COLUMN1ROW3=7,s.COLUMN2ROW0=8,s.COLUMN2ROW1=9,s.COLUMN2ROW2=10,s.COLUMN2ROW3=11,s.COLUMN3ROW0=12,s.COLUMN3ROW1=13,s.COLUMN3ROW2=14,s.COLUMN3ROW3=15,o(s.prototype,{length:{get:function(){return s.packedLength}}}),s.prototype.clone=function(t){return s.clone(this,t)},s.prototype.equals=function(t){return s.equals(this,t)},s.equalsArray=function(t,e,r){return t[0]===e[r]&&t[1]===e[r+1]&&t[2]===e[r+2]&&t[3]===e[r+3]&&t[4]===e[r+4]&&t[5]===e[r+5]&&t[6]===e[r+6]&&t[7]===e[r+7]&&t[8]===e[r+8]&&t[9]===e[r+9]&&t[10]===e[r+10]&&t[11]===e[r+11]&&t[12]===e[r+12]&&t[13]===e[r+13]&&t[14]===e[r+14]&&t[15]===e[r+15]},s.prototype.equalsEpsilon=function(t,e){return s.equalsEpsilon(this,t,e)},s.prototype.toString=function(){return"("+this[0]+", "+this[4]+", "+this[8]+", "+this[12]+")\n("+this[1]+", "+this[5]+", "+this[9]+", "+this[13]+")\n("+this[2]+", "+this[6]+", "+this[10]+", "+this[14]+")\n("+this[3]+", "+this[7]+", "+this[11]+", "+this[15]+")"},s});