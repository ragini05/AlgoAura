const BubbleSort = async (originalArray, setComparingIndices, setBars, setCode, speed) => {
  const array = [...originalArray];
  const n = array.length;

  // 1 second delay for each step (fixed delay)
  const delay = 1000; 

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const leftElement = array[j];
      const rightElement = array[j + 1];

      // Highlight the elements being compared
      setComparingIndices([j, j + 1]);

      // Show the comparison code
      setCode(`
if (leftElement > rightElement) {
  // Compare ${leftElement} and ${rightElement}
}
      `);

      await new Promise((resolve) => setTimeout(resolve, delay));  // 1 second delay

      if (leftElement > rightElement) {
        // Swap elements
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        // Update the bars for visualization
        setBars([...array]);

        // Show swapping code and operation
        setCode(`
if (leftElement > rightElement) {
  // Swap elements
  const temp = leftElement;
  leftElement = rightElement;
  rightElement = temp;
}
// Swapping ${leftElement} and ${rightElement}
        `);

        await new Promise((resolve) => setTimeout(resolve, delay));  // 1 second delay after swap
      }
    }
  }

  // Reset comparing indices after sorting
  setComparingIndices([]);
  return array;
};

export default BubbleSort;
