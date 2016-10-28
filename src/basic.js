'use strict';

module.exports = function (mathbox) {
  let three = mathbox.three;

  three.camera.position.set(0, 0, 6);
  three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);


    let view = mathbox
    .set({
      focus: 3,
    })
    .cartesian({
      range: [[-2, 2], [-1, 1], [-1, 1]],
      scale: [2, 1, 1],
    });
    view.axis({
      detail: 30,
    });
    view.axis({
      axis: 2,
    });
    view.axis({
      axis: 3,
    });

    view.scale({
      divide: 10,
    });

    view.ticks({
      width: 2
    });

    view.grid({
      divideX: 10,
      divideY: 5,
      width: 1,
      opacity: 0.5,
      zBias: -5,
    });

    view.grid({
      axes: [1,3],
      divideX: 10,
      divideY: 5,
      width: 1,
      opacity: 0.5,
      color: 0x990000,
    });

    // view.interval({
    //   id: 'sampler',
    //   width: 10,
    //   expr: function (emit, x, i, t) {
    //     let y = Math.sin(x + t) * .7;// + (i%2)*Math.sin(x * 400000 + t * 5 + x * x * 10000)*.05;
    //     emit(x, y);
    //   },
    //   channels: 2,
    // }).spread({
    //   unit: 'absolute',
    //   height: [0, 0, .25],
    //   depth: [0, .25, 0],
    // });

    view.interval({
      width: 16,
      expr: function (emit, x, i, t) {
        let y = Math.sin(x + t) * .7;// + (i%2)*Math.sin(x * 400000 + t * 5 + x * x * 10000)*.05;
        emit(x, y);
      },
      channels: 2,
    });
    view.repeat({
      items: 10,
    });
    view.spread({
      id: 'sampler',
      unit: 'absolute',
      items: [0, 0, .1],
    });

    view.line({
      points: '#sampler',
      color: 0x3090FF,
      width: 5,
    });
    view.transform({
      position: [0, .1, 0],
    }).line({
      points: '#sampler',
      color: 0x3090FF,
      width: 5,
      stroke: 'dotted',
    });
    view.transform({
      position: [0, -.1, 0],
    }).line({
      points: '#sampler',
      color: 0x3090FF,
      width: 5,
      stroke: 'dashed',
    });
};
