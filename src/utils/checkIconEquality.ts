export function checkIconEquality(array1: any, array2: any) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i].icon !== array2[i].icon) {
      return false;
    }
  }

  return true;
}
