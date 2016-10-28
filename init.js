'use strict';

const Electron = require('electron');

document.addEventListener('readystatechange', () => {
  if ( document.readyState !== 'complete' ) {
    return;
  }

  let viewEL = document.getElementById('view');
  let selectEL = document.getElementById('select');
  let reloadEL = document.getElementById('reload');
  let profile = null;

  //
  window.requestAnimationFrame(() => {
    _resize();
  });

  // events

  // on window-resize
  window.addEventListener('resize', () => {
    _resize();
  });

  // on select-changed
  selectEL.addEventListener('confirm', event => {
    let path = event.target.value;

    profile.data.select = path;
    profile.save();

    _exec(path, false);
  });

  // on reload
  reloadEL.addEventListener('confirm', () => {
    _exec(selectEL.value, true);
  });

  //
  Electron.ipcRenderer.on('app:reload', (event, path) => {
    if ( path === selectEL.value ) {
      _exec(path, true);
    }
  });

  // load profile
  Editor.Profile.load('profile://local/settings.json', (err, pf) => {
    profile = pf;

    selectEL.value = profile.data.select;
    _exec(selectEL.value, false);
  });

  function _exec ( path, reload ) {
    _reset();

    path = Editor.url(`app://${path}`);
      if (reload) {
      delete require.cache[path];
    }

    let fn = require(path);
    if (fn) {
      fn(window._mathbox);
    }

    // clear caches
    Electron.webFrame.clearCache();
    // console.log(Electron.webFrame.getResourceUsage());
  }

  function _resize () {
    let canvasEL = document.querySelector('canvas');
    if ( canvasEL ) {
      let bcr = canvasEL.parentElement.getBoundingClientRect();
      canvasEL.width = bcr.width;
      canvasEL.height = bcr.height;
    }
  }

  function _reset () {
    console.clear();

    if ( window._mathbox ) {
      window._mathbox.stop();
      window._mathbox = null;
      Editor.UI.clear(viewEL);
    }

    let mathbox = mathBox({
      element: viewEL,
      plugins: ['core', 'controls', 'cursor'],
      controls: {
        klass: THREE.OrbitControls,
      },
      camera: {
        fov: 45
      }
    });

    let three = mathbox.three;
    three.controls.maxDistance = 100;
    three.camera.position.set(2.5, 1, 2.5);
    three.renderer.setClearColor(new THREE.Color(0x505050), 1.0);

    window._mathbox = mathbox;
  }
});
