// Merge Function
async function merge(ele, low, mid, high) {
    if (!isSorting) { // Check if sorting should stop
        enableSortingBtn(); // Re-enable buttons after stopping
        enableSizeSlider(); // Re-enable size slider after stopping
        return;
    }
    const n1 = mid - low + 1;
    const n2 = high - mid;

    let left = new Array(n1);
    let right = new Array(n2);
    
    // Fill left array and highlight
    for (let i = 0; i < n1; i++) {
        await delay(time);
        ele[low + i].style.background = 'yellow'; // Highlight the left part
        left[i] = ele[low + i].style.height;
    }

    // Fill right array and highlight
    for (let j = 0; j < n2; j++) {
        await delay(time);
        ele[mid + 1 + j].style.background = 'red'; // Highlight the right part
        right[j] = ele[mid + 1 + j].style.height;
    }

    let i = 0, j = 0, k = low;

    // Merge back to the original array
    while (i < n1 && j < n2) {
        await delay(time);
        if (!isSorting) { // Check if sorting should stop
            enableSortingBtn(); // Re-enable buttons after stopping
            enableSizeSlider(); // Re-enable size slider after stopping
            return;
        }
        if (parseInt(left[i]) <= parseInt(right[j])) {
            ele[k].style.height = left[i];
            ele[k].style.background = 'lightgreen'; // Mark as sorted
            i++;
        } else {
            ele[k].style.height = right[j];
            ele[k].style.background = 'lightgreen'; // Mark as sorted
            j++;
        }
        k++;
    }

    // Copy remaining elements of left array
    while (i < n1) {
        await delay(time);
        if (!isSorting) { // Check if sorting should stop
            enableSortingBtn(); // Re-enable buttons after stopping
            enableSizeSlider(); // Re-enable size slider after stopping
            return;
        }
        ele[k].style.height = left[i];
        ele[k].style.background = 'lightgreen'; // Mark as sorted
        i++;
        k++;
    }

    // Copy remaining elements of right array
    while (j < n2) {
        await delay(time);
        if (!isSorting) { // Check if sorting should stop
            enableSortingBtn(); // Re-enable buttons after stopping
            enableSizeSlider(); // Re-enable size slider after stopping
            return;
        }
        ele[k].style.height = right[j];
        ele[k].style.background = 'lightgreen'; // Mark as sorted
        j++;
        k++;
    }

    // Highlight the merged portion as sorted
    for (let x = low; x <= high; x++) {
        ele[x].style.background = 'green'; // All merged elements as fully sorted
    }
}

// Merge Sort Function
async function mergeSort(ele, l, r) {
    if (l >= r) {
        return;
    }
    if (!isSorting) { // Check if sorting should stop
        enableSortingBtn(); // Re-enable buttons after stopping
        enableSizeSlider(); // Re-enable size slider after stopping
        return;
    }
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(ele, l, m);
    await mergeSort(ele, m + 1, r);
    await merge(ele, l, m, r);
}

// Event Listener for Merge Sort Button
document.getElementById('merge').addEventListener('click', async function() {
    let ele = document.querySelectorAll('.sort');
    let l = 0;
    let r = ele.length - 1; // No need for parseInt here

    // Display the code in the code-box
    const codeContent = `
        <h2> Merge Sort Algorithm</h2>
        <pre><code>
void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l +  1;
    int n2 = r - m;
    int left[n1], right[n2];

    for (int i = 0; i < n1; i++)
        left[i] = arr[l + i];
    for (int j = 0; j < n2; j++)
        right[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
        } else {
            arr[k] = right[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = left[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = right[j];
        j++;
        k++;
    }
}
        </code></pre>
    `;
    document.getElementById('code-box').innerHTML = codeContent;

    // Display the image in the image-box
    const imageBox = document.getElementById('image-box');
    imageBox.innerHTML = '<img src="sortingimages/merge.png" style="width:100%; height:auto;">'; // Ensure the image is responsive

    isSorting = true; // Start sorting
    disableSizeSlider();
    disableSortingBtn();
    await mergeSort(ele, l, r); // Call the merge sort function
    enableSortingBtn(); // Re-enable buttons after sorting
    enableSizeSlider(); // Re-enable size slider after sorting
});