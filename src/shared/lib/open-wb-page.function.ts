export function openPage(page: number, search: string | number): void {
  window.open(
    `https://www.wildberries.ru/catalog/0/search.aspx?page=${page}&sort=popular&search=${search}`,
    '_blank',
  );
}
