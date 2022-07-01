export function getPropertyValue<TValue = string>(o: unknown, propertyName: string) {
  const keys = Object.keys(o as Record<string, unknown>);
  const values = Object.values(o as Record<string, unknown>);

  for (let i = 0; i <= keys.length; i++) {
    if (keys[i] === propertyName) {
      return values[i] as TValue;
    }
  }

  return undefined;
}
