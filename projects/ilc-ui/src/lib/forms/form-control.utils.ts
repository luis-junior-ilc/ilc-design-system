let controlSequence = 0;

export function createFormControlId(prefix: string): string {
  controlSequence += 1;
  return `${prefix}-${controlSequence}`;
}
