const SelectionSort = async (originalArray, setComparingIndices, setBars, setCode, speed) => {
  const array = [...originalArray];
  const n = array.length;

  // 1 second delay for each step (fixed delay)
  const delay = 1000; 

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      setComparingIndices([minIdx, j]);

      // Show the comparison code
      setCode(`
if (array[minIdx] > array[j]) {
  // Compare ${array[minIdx]} and ${array[j]}
}
      `);

      await new Promise((resolve) => setTimeout(resolve, delay)); // 1 second delay

      if (array[minIdx] > array[j]) {
        minIdx = j;
      }
    }

    // Swap if the minIdx is different from i
    if (minIdx !== i) {
      const temp = array[i];
      array[i] = array[minIdx];
      array[minIdx] = temp;

      // Update the bars for visualization
      setBars([...array]);

      // Show swapping code and operation
      setCode(`
if (minIdx !== i) {
  // Swap elements
  const temp = array[i];
  array[i] = array[minIdx];
  array[minIdx] = temp;
}
// Swapping ${array[i]} and ${array[minIdx]}
      `);

      await new Promise((resolve) => setTimeout(resolve, delay)); // 1 second delay after swap
    }
  }

  // Reset comparing indices after sorting
  setComparingIndices([]);
  return array;
};

export default SelectionSort;
