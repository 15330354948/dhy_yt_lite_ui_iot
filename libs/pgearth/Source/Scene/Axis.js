define(["../Core/Check","../Core/freezeObject","../Core/Math","../Core/Matrix3","../Core/Matrix4"],function(o,t,_,r,n){"use strict";var a={X:0,Y:1,Z:2,Y_UP_TO_Z_UP:n.fromRotationTranslation(r.fromRotationX(_.PI_OVER_TWO)),Z_UP_TO_Y_UP:n.fromRotationTranslation(r.fromRotationX(-_.PI_OVER_TWO)),X_UP_TO_Z_UP:n.fromRotationTranslation(r.fromRotationY(-_.PI_OVER_TWO)),Z_UP_TO_X_UP:n.fromRotationTranslation(r.fromRotationY(_.PI_OVER_TWO)),X_UP_TO_Y_UP:n.fromRotationTranslation(r.fromRotationZ(_.PI_OVER_TWO)),Y_UP_TO_X_UP:n.fromRotationTranslation(r.fromRotationZ(-_.PI_OVER_TWO)),fromName:function(t){return o.typeOf.string("name",t),a[t]}};return t(a)});