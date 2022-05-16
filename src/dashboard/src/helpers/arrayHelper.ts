export function choose(choices: unknown[]) {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}
