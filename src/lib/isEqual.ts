//Compare two array.
export function isEqual<T extends { id: string }>(
  arr1: Array<T>,
  arr2: Array<T>
) {
  // If length is not equal
  if (arr1.length !== arr2.length) return false;
  else {
    // Compare each element of array
    for (const item1 of arr1) {
      const item2 = getItemByKey<T>(arr2, item1.id);
      if (!item2 || JSON.stringify(item1) !== JSON.stringify(item2)) {
        return false;
      }
    }
    return true;
  }
}

function getItemByKey<T extends { id: string }>(arr: Array<T>, key: string) {
  for (const item of arr) {
    if (item.id === key) {
      return item;
    }
  }
  return null;
}
