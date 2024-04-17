export function checkIfGeneratedPresetRowId(value: string): boolean {
  return value.split('/')[0] === 'auto-generated-row-presetWbId';
}
