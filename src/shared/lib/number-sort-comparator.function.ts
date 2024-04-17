function getNumberFromFormatted(val: string): number {
  const nbsp = new RegExp(String.fromCharCode(160), 'g');
  const adjustedString = val?.toString().replace(nbsp, '').replace(',', '.');

  return parseFloat(adjustedString);
}

export function numberSortComparator(v1: string, v2: string): number {
  const compV1 = getNumberFromFormatted(v1);
  const compV2 = getNumberFromFormatted(v2);

  if (isNumber(compV1) && isNumber(compV2)) {
    return compV1 - compV2;
  }

  if (isNumber(compV1) && isNaN(compV2)) {
    return 1;
  }

  if (isNaN(compV1) && isNumber(compV2)) {
    return -1;
  }

  return 0;
}
