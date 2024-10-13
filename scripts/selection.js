// Selection Sort Function
async function selection() {
    const ele = document.querySelectorAll('.sort');
    
    // Display the code in the code-box
    const codeContent = `
        <h2> Selection Sort Algorithm </h2>
        <pre><code>
void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        swap(arr[i], arr[minIndex]);
    }
}
        </code></pre>
    `;
    document.getElementById('code-box').innerHTML = codeContent;

    // Display the image in the image-box
    const imageBox = document.getElementById('image-box');
    imageBox.innerHTML = '<img src="sortingimages/selection.png" style="width:100%; height:auto;">'; // Ensure the image is responsive

    isSorting = true; // Start sorting
    for (let i = 0; i < ele.length; i++) {
        if (!isSorting) { // Check if sorting should stop
            enableSortingBtn(); // Re-enable buttons after stopping
            enableSizeSlider(); // Re-enable size slider after stopping
            return;
        }
        
        let x = i;
        ele[i].style.background = 'red'; // Highlight the current position

        for (let j = i + 1; j < ele.length; j++) {
            if (!isSorting) { // Check if sorting should stop
                enableSortingBtn(); // Re-enable buttons after stopping
                enableSizeSlider(); // Re-enable size slider after stopping
                return;
            }
            ele[j].style.background = 'red'; // Highlight the current element being compared
            await delay(time);

            if (parseInt(ele[j].style.height) < parseInt(ele[x].style.height)) {
                if (x !== i) {
                    ele[x].style.background = 'yellow'; // Restore previous min element color
                }
                x = j; // Update the index of the minimum element
            } else {
                ele[j].style.background = 'yellow'; // Restore color if not minimum
            }
        }

        await delay(time);
        swap(ele[i], ele[x]); // Swap the found minimum with the current element
        ele[x].style.background = 'yellow'; // Highlight the swapped minimum element
        ele[i].style.background = 'green'; // Mark the current position as sorted
    }
    
    enableSortingBtn(); // Re-enable buttons after sorting
    enableSizeSlider(); // Re-enable size slider after sorting
}

// Event Listener for Selection Sort Button
document.getElementById("selection").addEventListener('click', async function() {
    disableSizeSlider();
    disableSortingBtn();
    await selection(); // Call the selection sort function
});