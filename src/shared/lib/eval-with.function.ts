export function evalWith(o: { [key: string]: any }, s: string): any {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
  return new Function('o', `with(o){return ${s};}`)(o);
}
