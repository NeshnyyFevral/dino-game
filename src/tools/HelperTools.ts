export const randomBetween = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);
export const randomFrom = (...args: number[]): number => args[Math.floor(Math.random() * args.length)];
export const random6040 = (min: number, max: number): number => {
  const number = randomBetween(0, 10);

  if (number > 4) {
    return min;
  }

  return max;
};

export const intersection = (firstDiv: HTMLDivElement, secondDiv: HTMLDivElement): boolean => {
  const characterRect = firstDiv.getBoundingClientRect();
  const trapRect = secondDiv.getBoundingClientRect();

  const valueInRange = (value: number, min: number, max: number) => (value >= min) && (value <= max);

  const xIntersection = valueInRange(characterRect.left, trapRect.left, trapRect.right)
    || valueInRange(trapRect.left, characterRect.left, characterRect.right);

  const yIntersection = valueInRange(characterRect.top, trapRect.top, trapRect.bottom)
    || valueInRange(trapRect.top, characterRect.top, characterRect.bottom);

  return xIntersection && yIntersection;
};
