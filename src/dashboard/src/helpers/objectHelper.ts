export function getPropertyValue<TItem, TValue>(o: TItem, propertyName: string) {
  const keys = Object.keys(o);
  const values = Object.values(o);

  for (let i = 0; i <= keys.length; i++) {
    if (keys[i] === propertyName) {
      return values[i] as TValue;
    }
  }

  return undefined;
}
