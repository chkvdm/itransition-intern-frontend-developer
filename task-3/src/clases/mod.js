export function mod(a, b) {
  const c = a % b;
  return c < 0 ? c + b : c;
}
