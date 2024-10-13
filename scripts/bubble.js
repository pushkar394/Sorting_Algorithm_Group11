// Bubble Sort Function
async function bubble() {
    const ele = document.querySelectorAll(".sort");
    
    // Display the code in the code-box
    document.getElementById('code-box').innerHTML = `
        <h2>Bubble Sort Algorithm</h2>
        <pre><code>
function bubbleSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < (arr.length - i - 1); j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}
        </code></pre>
    `;

    // Display the image in the image-box
    const imageBox = document.getElementById('image-box');
    imageBox.innerHTML = '<img src="sortingimages/Bubble.png" style="width:100%; height:auto;">'; // Ensure the image is responsive

    isSorting = true; // Start sorting
    for (let i = 0; i < ele.length - 1; i++) {
        for (let j = 0; j < ele.length - i - 1; j++) {
            if (!isSorting) { // Check if sorting should stop
                enableSortingBtn(); // Re-enable buttons after stopping
                enableSizeSlider(); // Re-enable size slider after stopping
                return;
            }
            ele[j].style.background = 'red';
            ele[j + 1].style.background = 'red';

            if (parseInt(ele[j].style.height) > parseInt(ele[j + 1].style.height)) {
                await delay(time); // Adjust the delay timing as needed
                swap(ele[j], ele[j + 1]);
            }

            ele[j].style.background = 'yellow';
            ele[j + 1].style.background = 'yellow';
        }
        ele[ele.length - i - 1].style.background = 'green';
    }
    ele[0].style.background = 'green';
    enableSortingBtn(); // Re-enable buttons after sorting
    enableSizeSlider(); // Re-enable size slider after sorting
}

// Event Listener for Bubble Sort Button
document.getElementById("bubble").addEventListener("click", async function() {
    disableSizeSlider();
    disableSortingBtn();
    
    await bubble(); // Call the bubble sort function
});