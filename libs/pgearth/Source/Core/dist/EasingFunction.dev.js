"use strict";

define(["../ThirdParty/Tween", "./freezeObject"], function (n, I) {
  "use strict";

  return I({
    LINEAR_NONE: n.Easing.Linear.None,
    QUADRACTIC_IN: n.Easing.Quadratic.In,
    QUADRACTIC_OUT: n.Easing.Quadratic.Out,
    QUADRACTIC_IN_OUT: n.Easing.Quadratic.InOut,
    CUBIC_IN: n.Easing.Cubic.In,
    CUBIC_OUT: n.Easing.Cubic.Out,
    CUBIC_IN_OUT: n.Easing.Cubic.InOut,
    QUARTIC_IN: n.Easing.Quartic.In,
    QUARTIC_OUT: n.Easing.Quartic.Out,
    QUARTIC_IN_OUT: n.Easing.Quartic.InOut,
    QUINTIC_IN: n.Easing.Quintic.In,
    QUINTIC_OUT: n.Easing.Quintic.Out,
    QUINTIC_IN_OUT: n.Easing.Quintic.InOut,
    SINUSOIDAL_IN: n.Easing.Sinusoidal.In,
    SINUSOIDAL_OUT: n.Easing.Sinusoidal.Out,
    SINUSOIDAL_IN_OUT: n.Easing.Sinusoidal.InOut,
    EXPONENTIAL_IN: n.Easing.Exponential.In,
    EXPONENTIAL_OUT: n.Easing.Exponential.Out,
    EXPONENTIAL_IN_OUT: n.Easing.Exponential.InOut,
    CIRCULAR_IN: n.Easing.Circular.In,
    CIRCULAR_OUT: n.Easing.Circular.Out,
    CIRCULAR_IN_OUT: n.Easing.Circular.InOut,
    ELASTIC_IN: n.Easing.Elastic.In,
    ELASTIC_OUT: n.Easing.Elastic.Out,
    ELASTIC_IN_OUT: n.Easing.Elastic.InOut,
    BACK_IN: n.Easing.Back.In,
    BACK_OUT: n.Easing.Back.Out,
    BACK_IN_OUT: n.Easing.Back.InOut,
    BOUNCE_IN: n.Easing.Bounce.In,
    BOUNCE_OUT: n.Easing.Bounce.Out,
    BOUNCE_IN_OUT: n.Easing.Bounce.InOut
  });
});