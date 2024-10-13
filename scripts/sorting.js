let isSorting = false; // Global variable to track sorting status
let time = 100; // Default speed

// Function to generate bars
function generateBars(noBar = 60) {
    document.getElementById("bar").innerHTML = '';
    let bars = []; 
    for (let i = 0; i < noBar; i++) {
        bars.push(Math.floor(Math.random() * 400) + 1);
    }

    const divs = document.querySelector('#bar');
    for (let x = 0; x < noBar; x++) {
        const temp = document.createElement("div");
        temp.classList.add('sort', 'baritem');
        temp.style.height = bars[x] + "px";
        divs.append(temp);
    }
}

// Event listener for size slider
let arrsizer = document.querySelector('#sizer');
arrsizer.addEventListener('input', function() {
    generateBars(parseInt(arrsizer.value));
});
generateBars();

// Event listener for speed slider
let sortspeed = document.querySelector('#speed');
sortspeed.addEventListener('input', function() {
    time = 500 - parseInt(sortspeed.value); // Adjust speed
});

// Event listener for generating new array
document.getElementById("newarr").addEventListener("click", function() {
    generateBars(arrsizer.value);
    enableSortingBtn();
    enableSizeSlider();
});

// Function to swap bars
function swap(ele1, ele2) {
    let temp = ele1.style.height;
    ele1.style.height = ele2.style.height;
    ele2.style.height = temp;
}

// Function to delay execution
function delay(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve(''); }, milisec); 
    }); 
}

// Sorting button control functions
function disableSortingBtn() {
    document.querySelectorAll(".sort-button").forEach(btn => btn.disabled = true);
}

function enableSortingBtn() {
    document.querySelectorAll(".sort-button").forEach(btn => btn.disabled = false);
}

// Size slider control functions
function disableSizeSlider() {
    document.getElementById("sizer").disabled = true;
}

function enableSizeSlider() {
    document.getElementById("sizer").disabled = false;
}

// Event listener for stopping sorting
document.getElementById('stop-sorting').addEventListener('click', () => {
    isSorting = false;
});



