'use strict';

const Editor = require('../index');
const Chokidar = require('chokidar');
const Path = require('fire-path');

let watcher = null;

Editor.App.extend({
  init ( opts, cb ) {
    Editor.init({
      'selection': [ 'normal' ],
    });

    Editor.Profile.setDefault(`profile://local/settings.json`, {
      select: 'src/basic.js'
    });

    cb ();
  },

  run () {
    // create main window
    Editor.run('app://index.html', {
      title: 'MathBox PlayGround',
      width: 800,
      height: 600,
      minWidth: 400,
      minHeight: 300,
      show: false,
      resizable: true,
    });

    watcher = Chokidar.watch(Editor.url('app://src'), {
      ignored: [
        /[\/\\]bin/,
        /[\/\\]node_modules/,
        /[\/\\]bower_components/,
      ],
      ignoreInitial: true,
      persistent: true,
    });

    watcher.on('change', path => {
      path = Path.relative(Editor.url('app://'), path);
      Editor.log(`${path} changed`);

      Editor.Ipc.sendToMainWin('app:reload', path);
    })
    .on('error', err => {
      Editor.error('Watch error: %s', err.message);
    })
    ;
  },

  quit (cb) {
    if ( watcher ) {
      watcher.close();
    }

    cb();
  },
});
