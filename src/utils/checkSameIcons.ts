export function checkSameIcons(array1: any, array2: any) {
  if (array1.length !== array2.length) {
    return false; // Different array lengths, icons cannot be the same
  }

  const icons1 = array1.map((item: { icon: any }) => item.icon).sort();
  const icons2 = array2.map((item: { icon: any }) => item.icon).sort();

  for (let i = 0; i < icons1.length; i++) {
    if (icons1[i] !== icons2[i]) {
      return false; // Different "icon" values found
    }
  }

  return true; // All "icon" values are the same
}
