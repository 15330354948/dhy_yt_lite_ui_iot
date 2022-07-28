define(["./Cartesian2","./Cartesian3","./Check","./defined","./Math"],function(e,t,n,r,i){"use strict";var o=new t,s=new t,u=new t;return function(d,a,l,c,f){var E,I,N,p,b,q,L,O;if(n.defined("point",d),n.defined("p0",a),n.defined("p1",l),n.defined("p2",c),r(f)||(f=new t),r(a.z)){if(t.equalsEpsilon(d,a,i.EPSILON14))return t.clone(t.UNIT_X,f);if(t.equalsEpsilon(d,l,i.EPSILON14))return t.clone(t.UNIT_Y,f);if(t.equalsEpsilon(d,c,i.EPSILON14))return t.clone(t.UNIT_Z,f);E=t.subtract(l,a,o),I=t.subtract(c,a,s),N=t.subtract(d,a,u),p=t.dot(E,E),b=t.dot(E,I),q=t.dot(E,N),L=t.dot(I,I),O=t.dot(I,N)}else{if(e.equalsEpsilon(d,a,i.EPSILON14))return t.clone(t.UNIT_X,f);if(e.equalsEpsilon(d,l,i.EPSILON14))return t.clone(t.UNIT_Y,f);if(e.equalsEpsilon(d,c,i.EPSILON14))return t.clone(t.UNIT_Z,f);E=e.subtract(l,a,o),I=e.subtract(c,a,s),N=e.subtract(d,a,u),p=e.dot(E,E),b=e.dot(E,I),q=e.dot(E,N),L=e.dot(I,I),O=e.dot(I,N)}var P=1/(p*L-b*b);return f.y=(L*q-b*O)*P,f.z=(p*O-b*q)*P,f.x=1-f.y-f.z,f}});