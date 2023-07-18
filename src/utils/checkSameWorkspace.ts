export function checkSameWorkspace(array1: any, array2: any) {
  const pageIds: string[] = [];

  array1.map((page: any) => pageIds.push(page.id));

  for (let i = 0; i < array2.length; i++) {
    if (!pageIds.includes(array2[i].id)) {
      return false;
    }
  }

  return true;
}
