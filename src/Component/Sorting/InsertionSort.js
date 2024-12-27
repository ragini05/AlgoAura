const InsertionSort = async (originalArray, setComparingIndices, setBars, setCode, speed) => {
  const array = [...originalArray];
  const n = array.length;

  // 1 second delay for each step (fixed delay)
  const delay = 1000; 

  for (let i = 1; i < n; i++) {
    let elementToInsert = array[i];  // Element that we want to insert
    let leftIndex = i - 1;  // This replaces `j`

    while (leftIndex >= 0 && array[leftIndex] > elementToInsert) {
      setComparingIndices([leftIndex, leftIndex + 1]);

      // Show the comparison code
      setCode(`
if (array[leftIndex] > elementToInsert) {
  // Compare ${array[leftIndex]} and ${elementToInsert}
}
      `);

      await new Promise((resolve) => setTimeout(resolve, delay)); // 1 second delay

      array[leftIndex + 1] = array[leftIndex];  // Shift element to the right
      leftIndex--;  // Move leftIndex to the left
    }

    array[leftIndex + 1] = elementToInsert;  // Insert the element at the correct position

    // Update the bars for visualization
    setBars([...array]);

    // Show insertion code and operation
    setCode(`
array[leftIndex + 1] = elementToInsert; 
// Insert ${elementToInsert} at position ${leftIndex + 1}
    `);

    await new Promise((resolve) => setTimeout(resolve, delay)); // 1 second delay after insertion
  }

  // Reset comparing indices after sorting
  setComparingIndices([]);
  return array;
};

export default InsertionSort;
