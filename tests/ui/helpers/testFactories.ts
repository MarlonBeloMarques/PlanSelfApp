export const makeEventData = (x = 300, y = 300) => {
  return {
    layout: {
      x,
      y,
    },
  };
};

export const makeValueTranslateStub = () => {
  return {
    x: 0,
    y: 0,
  };
};
