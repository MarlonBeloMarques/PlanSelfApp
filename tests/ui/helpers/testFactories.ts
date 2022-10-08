export const makeEventData = (x: number, y: number) => {
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
