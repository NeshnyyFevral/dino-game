export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
// eslint-disable-next-line no-promise-executor-return
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
