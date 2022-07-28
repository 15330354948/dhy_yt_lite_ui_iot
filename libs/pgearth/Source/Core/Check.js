define(["./defined","./DeveloperError"],function(e,t){"use strict";var n={};function f(e,t,n){return"Expected "+n+" to be typeof "+t+", actual typeof was "+e}return n.typeOf={},n.defined=function(n,f){if(!e(f))throw new t(function(e){return e+" is required, actual value was undefined"}(n))},n.typeOf.func=function(e,n){if("function"!=typeof n)throw new t(f(typeof n,"function",e))},n.typeOf.string=function(e,n){if("string"!=typeof n)throw new t(f(typeof n,"string",e))},n.typeOf.number=function(e,n){if("number"!=typeof n)throw new t(f(typeof n,"number",e))},n.typeOf.number.lessThan=function(e,f,o){if(n.typeOf.number(e,f),f>=o)throw new t("Expected "+e+" to be less than "+o+", actual value was "+f)},n.typeOf.number.lessThanOrEquals=function(e,f,o){if(n.typeOf.number(e,f),f>o)throw new t("Expected "+e+" to be less than or equal to "+o+", actual value was "+f)},n.typeOf.number.greaterThan=function(e,f,o){if(n.typeOf.number(e,f),f<=o)throw new t("Expected "+e+" to be greater than "+o+", actual value was "+f)},n.typeOf.number.greaterThanOrEquals=function(e,f,o){if(n.typeOf.number(e,f),f<o)throw new t("Expected "+e+" to be greater than or equal to"+o+", actual value was "+f)},n.typeOf.object=function(e,n){if("object"!=typeof n)throw new t(f(typeof n,"object",e))},n.typeOf.bool=function(e,n){if("boolean"!=typeof n)throw new t(f(typeof n,"boolean",e))},n.typeOf.number.equals=function(e,f,o,u){if(n.typeOf.number(e,o),n.typeOf.number(f,u),o!==u)throw new t(e+" must be equal to "+f+", the actual values are "+o+" and "+u)},n});