// Sorting/MergeSort.js
const MergeSort = async (originalArray, setComparingIndices, setBars, setCode) => {
  const array = [...originalArray];
  const n = array.length;

  // 1-second delay for each step (fixed delay)
  const delay = 1000;

  for (let currentSize = 1; currentSize < n; currentSize *= 2) {
    for (let leftStart = 0; leftStart < n - 1; leftStart += 2 * currentSize) {
      const mid = Math.min(leftStart + currentSize - 1, n - 1);
      const rightEnd = Math.min(leftStart + 2 * currentSize - 1, n - 1);

      // Merge the current sub-arrays
      await merge(array, leftStart, mid, rightEnd);
    }
  }

  async function merge(array, left, mid, right) {
    const tempArray = [...array];
    let leftIndex = left,
      rightIndex = mid + 1,
      mergeIndex = left;

    while (leftIndex <= mid && rightIndex <= right) {
      setComparingIndices([leftIndex, rightIndex]);

      // Show the comparison code
      setCode(`
if (tempArray[leftIndex] <= tempArray[rightIndex]) {
  // Compare ${tempArray[leftIndex]} and ${tempArray[rightIndex]}
}
      `);

      await new Promise((resolve) => setTimeout(resolve, delay)); // 1-second delay

      if (tempArray[leftIndex] <= tempArray[rightIndex]) {
        array[mergeIndex++] = tempArray[leftIndex++];
      } else {
        array[mergeIndex++] = tempArray[rightIndex++];
      }
    }

    // Code trace for adding remaining elements from the left half
    while (leftIndex <= mid) {
      setCode(`
if (leftIndex <= mid) {
  // Add remaining ${tempArray[leftIndex]} from left half to the merged array
}
      `);
      array[mergeIndex++] = tempArray[leftIndex++];
      await new Promise((resolve) => setTimeout(resolve, delay)); // 1-second delay
    }

    // Code trace for adding remaining elements from the right half
    while (rightIndex <= right) {
      setCode(`
if (rightIndex <= right) {
  // Add remaining ${tempArray[rightIndex]} from right half to the merged array
}
      `);
      array[mergeIndex++] = tempArray[rightIndex++];
      await new Promise((resolve) => setTimeout(resolve, delay)); // 1-second delay
    }

    setBars([...array]);
    await new Promise((resolve) => setTimeout(resolve, delay)); // 1-second delay after merge
  }

  return array;
};

export default MergeSort;
