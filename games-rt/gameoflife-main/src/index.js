import { initApp } from './init';
import { createDraw } from './draw';
import { createGame } from './game';
import { createStateTransition } from './state';

let state = {
  rFactor: 0.1,
  speed: 10,
  zFactor: 0.4,
};

const randomizeField = field => {
  let i = field.length;

  while (--i >= 0) {
    field[i] = (Math.random() + state.rFactor) >> 0;
  }
};

let tickTimeout;

function tick() {
  nextStep();
  drawField(field);
}

function tickTock() {
  const t0 = new Date();

  tick();

  const spent = new Date() - t0;
  tickTimeout = setTimeout(tickTock, 1000 / state.speed - spent);
}

const { canvas } = initApp({
  onChange: (which, value) => {
    switch (which) {
      case 'rand':
        state = setState({ ...state, rFactor: value / 10 });
        break;

      case 'speed':
        state = setState({ ...state, speed: value });
        break;

      case 'zoom':
        state = setState({ ...state, zFactor: value / 10 });
        break;
    }
  },
  onPause: () => clearTimeout(tickTimeout),
  onResume: tickTock,
  values: {
    rand: state.rFactor * 10,
    speed: state.speed,
    zoom: state.zFactor * 10,
  },
});

let drawField, field, nextStep;

const setState = createStateTransition(({ zFactor } = state) => {
  const height = (window.innerHeight * zFactor) >> 0;
  const width = (window.innerWidth * zFactor) >> 0;

  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);

  drawField = createDraw(canvas.getContext('2d'), width, height);
  [field, nextStep] = createGame(width, height);

  randomizeField(field);
  tick();
});

tickTock();

window.addEventListener('optimizedResize', () => setState(state));

if (module.hot) {
  module.hot.dispose(() => {
    clearTimeout(tickTimeout);
  });
}
