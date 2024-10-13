// Insertion Sort Function
async function insertion() {
    const ele = document.querySelectorAll('.sort');

    // Display the code in the code-box
    const codeContent = `
        <h2> Insertion Algorithm </h2>
        <pre><code>
void insertionSort(int arr[], int n)
{
    int i, key, j;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}
        </code></pre>
    `;
    document.getElementById('code-box').innerHTML = codeContent;

    // Display the image in the image-box
    const imageBox = document.getElementById('image-box');
    imageBox.innerHTML = '<img src="sortingimages/insertion.png" style="width:100%; height:auto;">'; // Ensure the image is responsive

    isSorting = true; // Start sorting
    ele[0].style.background = 'green'; // First element is considered sorted
    for (let i = 1; i < ele.length; i++) {
        if (!isSorting) { // Check if sorting should stop
            enableSortingBtn(); // Re-enable buttons after stopping
            enableSizeSlider(); // Re-enable size slider after stopping
            return;
        }
        ele[i].style.background = 'red'; // Mark the current element being sorted
        let key = ele[i].style.height; // Current element's height
        let j = i - 1;

        // Move elements that are greater than key to one position ahead
        while (j >= 0 && (parseInt(key) < parseInt(ele[j].style.height))) {
            if (!isSorting) { // Check if sorting should stop
                enableSortingBtn(); // Re-enable buttons after stopping
                enableSizeSlider(); // Re-enable size slider after stopping
                return;
            }
            ele[j + 1].style.height = ele[j].style.height; // Shift element
            ele[j].style.background = 'red'; // Mark the moved element as red
            j--;

            await delay(time); // Wait for the animation to complete

            // Repaint all sorted elements
            for (let k = 0; k <= i; k++) {
                ele[k].style.background = 'green'; // All sorted elements are green
            }
        }

        // Place key in the correct position
        ele[j + 1].style.height = key;
        ele[i].style.background = 'green'; // Mark current element as sorted
    }
    enableSortingBtn(); // Re-enable buttons after sorting
    enableSizeSlider(); // Re-enable size slider after sorting
}

// Event Listener for Insertion Sort Button
document.getElementById('insertion').addEventListener('click', async function() {
    disableSizeSlider();
    disableSortingBtn();
    await insertion(); // Call the insertion sort function
});