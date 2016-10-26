'use strict';

module.exports = function (mathbox) {
  let three = mathbox.three;
  three.camera.position.set(0, 0, 3);
  three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);
  let view = mathbox
    .set({
      focus: 3,
    })
    .cartesian({
      range: [[-2, 2], [-1, 1], [-1, 1]],
      scale: [2, 1, 1],
    });
    view.interval({
      width: 64,
      expr: function (emit, x, i, t) {
        let y = Math.sin(x + t) * .7;// + (i%2)*Math.sin(x * 400000 + t * 5 + x * x * 10000)*.05;
        emit(x, y);
      },
      channels: 2,
    });
    view.play({
      delay: 1,    // after 1 second
      speed: 1000, // 1000 steps per second, effectively instant
      script: [
        {props: {live: true}},
        {props: {live: false}},
      ],
    });
    view.line({
      color: 0x3090FF,
      width: 5,
    });
    view.play({
      delay: 1,    // after 1 second
      pace:  2,    // 2 seconds per step
      script: [
        {props: {opacity: 1}},
        {props: {opacity: .25}},
      ],
    });
};
