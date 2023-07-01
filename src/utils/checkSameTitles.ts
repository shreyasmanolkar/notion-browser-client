export function checkSameTitles(array1: any, array2: any) {
  if (array1.length !== array2.length) {
    return false;
  }

  const titles1 = array1.map((item: { title: string }) => item.title).sort();
  const titles2 = array2.map((item: { title: string }) => item.title).sort();

  for (let i = 0; i < titles1.length; i++) {
    if (titles1[i] !== titles2[i]) {
      return false;
    }
  }

  return true;
}
