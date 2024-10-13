// Quick Sort Function
async function quick() {
    const ele = document.querySelectorAll(".sort");
    
    // Display the code in the code-box
    document.getElementById('code-box').innerHTML = `
        <h2>Quick Sort Algorithm</h2>
        <pre><code>
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int p = lomutoPartition(arr, low, high);
        quickSort(arr, low, p - 1);
        quickSort(arr, p + 1, high);
    }
}

int lomutoPartition(int arr[], int low, int high) {
    int i = low - 1;
    int pivot = arr[high];
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}
        </code></pre>
    `;

    // Display the image in the image-box
    const imageBox = document.getElementById('image-box');
    imageBox.innerHTML = '<img src="sortingimages/quick.png" style="width:100%; height:auto;">'; // Ensure the image is responsive

    isSorting = true; // Start sorting
    

    async function lomuto(ele, l, h) {
        let i = l - 1;

        ele[h].style.background = 'red'; // Highlight the pivot
        for (let j = l; j <= h - 1; j++) {
            if (!isSorting) return; // Check if sorting should stop

            ele[j].style.background = 'brown'; // Highlight the current element
            await delay(time);

            if (parseInt(ele[j].style.height) < parseInt(ele[h].style.height)) {
                i++;
                swap(ele[i], ele[j]); // Swap the elements
                ele[i].style.background = 'orange'; // Mark the swapped element
                await delay(time);
            }
            ele[j].style.background = 'yellow'; // Mark the current element as processed
        }

        await delay(time);
        swap(ele[i + 1], ele[h]); // Place the pivot in the correct position
        ele[h].style.background = 'yellow'; // Mark the pivot as processed

        await delay(time);
        return i + 1; // Return the pivot index
    }

    async function qsort(ele, l, h) {
        if (!isSorting) return; // Check if sorting should stop

        if (l < h) {
            let p = await lomuto(ele, l, h); // Partition the array
            await qsort(ele, l, p - 1); // Recursively sort the left part
            await qsort(ele, p + 1, h); // Recursively sort the right part
        }
    }

    document.getElementById('stop-sorting').addEventListener('click', () => {
        isSorting = false; // Stop sorting
        enableSortingBtn(); // Re-enable buttons after stopping
        enableSizeSlider(); // Re-enable size slider after stopping
    });

    await qsort(ele, 0, ele.length - 1);

    // Mark all elements as sorted
    if (isSorting) {
        for (let i = 0; i < ele.length; i++) {
            await delay(time);
            ele[i].style.background = 'green'; // Change color to indicate sorted
        }
    }

    enableSortingBtn(); // Re-enable buttons after sorting
    enableSizeSlider(); // Re-enable size slider after sorting
}

// Event Listener for Quick Sort Button
document.getElementById("quick").addEventListener("click", async function() {
    disableSizeSlider();
    disableSortingBtn();
    
    await quick(); // Call the quick sort function
});
