export function isEqual<T>(arr1: Array<T>, arr2: Array<T>) {
  // If length is not equal
  if (arr1.length !== arr2.length) return false;
  else {
    // Comparing each element of array
    for (let i = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) return false;
    return true;
  }
}
