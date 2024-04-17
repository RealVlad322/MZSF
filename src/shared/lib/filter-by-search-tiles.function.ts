export function filterBySearchTiles(searchTiles: string[], filterValue: string, minus?: boolean): boolean {
  return searchTiles.every((searchTile) => {
    const isMatch = new RegExp(searchTile).test(filterValue);

    return minus ? !isMatch : isMatch;
  });
}
