export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
export const random7525 = (min: number, max: number) => {
  const number = random(0, 4);

  if (number > 0) {
    return min;
  }

  return max;
};
// eslint-disable-next-line no-promise-executor-return
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
