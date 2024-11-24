export function isContainsAll(arr1: string[], arr2: string[]): boolean {
  return arr2.every(item => arr1.includes(item));
}