function geDateFromFormatted(val: string): number {
  const valParse = val.split('.');

  return new Date(`${valParse[2]}-${valParse[1]}-${valParse[0]}`).getTime();
}

export function dateSortComparator(date1: string, date2: string): number {
  return geDateFromFormatted(date1) - geDateFromFormatted(date2);
}
