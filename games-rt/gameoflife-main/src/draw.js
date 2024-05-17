export const createDraw = (ctx, width, height) => {
  ctx.fillStyle = '#212121';
  ctx.fillRect(0, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height);

  return field => {
    let i = field.length;

    while (--i >= 0) {
      imageData.data[i * 4] = imageData.data[i * 4 + 1] = imageData.data[
        i * 4 + 2
      ] = field[i] === 1 ? 193 : 33;
    }
    ctx.putImageData(imageData, 0, 0);
  };
};
