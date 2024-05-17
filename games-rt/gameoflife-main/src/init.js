import generate from 'project-name-generator';

const title = generate({ words: 4 })
  .raw.map(word => word[0].toUpperCase() + word.slice(1))
  .join(' ');

document.head.getElementsByTagName('title')[0].innerHTML = title;

// custom resize event
(function () {
  var throttle = function (type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function () {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function () {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  /* init - you can init any event */
  throttle('resize', 'optimizedResize');
})();

export const initApp = ({ onChange, onPause, onResume, values }) => {
  const canvas = document.getElementsByTagName('canvas')[0];

  let isPause = true;

  canvas.addEventListener('click', () => {
    if ((isPause = !isPause)) {
      controlPanel.style.display = 'none';

      onResume();
    } else {
      controlPanel.style.display = 'block';

      onPause();
    }
  });

  const controlPanel = document.getElementById('control-panel');
  controlPanel.style.display = 'none';

  const randInput = document.getElementById('rand');
  randInput.value = values.rand;

  randInput.addEventListener('change', e => {
    onChange('rand', e.target.value);
  });

  const speedInput = document.getElementById('speed');
  speedInput.value = values.speed;

  speedInput.addEventListener('change', e => {
    onChange('speed', e.target.value);
  });

  const zoomInput = document.getElementById('zoom');
  zoomInput.value = values.zoom;

  zoomInput.addEventListener('change', e => {
    onChange('zoom', e.target.value);
  });

  const resumeButton = document.getElementById('resume');

  resumeButton.addEventListener('click', () => {
    canvas.click();
  });

  return {
    canvas,
  };
};
