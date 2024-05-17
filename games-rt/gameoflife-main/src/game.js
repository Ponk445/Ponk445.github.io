const createCursorToVec = width => value => [
  value % width,
  (value / width) >> 0,
];

const createVecToCursor = width => value => value[0] + value[1] * width;

const createTranslate = (width, height) => (vec0, vecTrans) => {
  let x = vec0[0] + vecTrans[0];
  x += x === -1 ? width : x === width ? -width : 0;

  let y = vec0[1] + vecTrans[1];
  y += y === -1 ? height : y === height ? -height : 0;

  return [x, y];
};

const createWeighNextState = ({ cursorToVec, vecToCursor, translate }) => (
  field,
  i
) => {
  const vec5 = cursorToVec(i);

  const sum =
    field[vecToCursor(translate(vec5, [-1, -1]))] +
    field[vecToCursor(translate(vec5, [-1, 0]))] +
    field[vecToCursor(translate(vec5, [-1, 1]))] +
    field[vecToCursor(translate(vec5, [0, -1]))] +
    field[vecToCursor(translate(vec5, [0, 1]))] +
    field[vecToCursor(translate(vec5, [1, -1]))] +
    field[vecToCursor(translate(vec5, [1, 0]))] +
    field[vecToCursor(translate(vec5, [1, 1]))];

  if (sum === 3) {
    return 1;
  }

  if (sum === 2 && field[i] === 1) {
    return 1;
  }

  return 0;
};

export const createGame = (width, height) => {
  const size = width * height;

  const field = new Uint8Array(size);
  const field0 = new Uint8Array(size);

  const weighNextState = createWeighNextState({
    cursorToVec: createCursorToVec(width),
    translate: createTranslate(width, height),
    vecToCursor: createVecToCursor(width),
  });

  return [
    field,
    () => {
      field0.set(field);

      let i = size;

      while (--i >= 0) {
        field[i] = weighNextState(field0, i);
      }
    },
  ];
};
