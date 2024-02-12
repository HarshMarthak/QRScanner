function registerUser() {

    // Redirect to welcome.html immediately
    window.location.href = 'welcome.html';
}
// Variables to track the state of cup boxes
const cup1 = document.getElementById('cup1');
const cup2 = document.getElementById('cup2');
const cup3 = document.getElementById('cup3');
const cup4 = document.getElementById('cup4');
const cup5 = document.getElementById('cup5');
const cup6 = document.getElementById('cup6');
const cup7 = document.getElementById('cup7');
const cup8 = document.getElementById('cup8');
const cup9 = document.getElementById('cup9');
const cup10 = document.getElementById('cup10');


// Instascan scanner instance
let scanner = new Instascan.Scanner({ video: document.getElementById('qrScanner') });

// Function to toggle box color
function toggleBoxColor(box) {
    if (box.style.backgroundColor === 'red') {
        box.style.backgroundColor = 'green';
    } else {
        box.style.backgroundColor = 'red';
    }
}

// Function to activate the camera automatically
function activateCamera() {
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]); // Use the first available camera
        } else {
            console.error('No cameras found.');
        }
    });
}

// Start the camera automatically when the page loads
activateCamera();

// Add a listener for the scan event
scanner.addListener('scan', function(content) {
    // Check the scanned content and change box color accordingly
    if (content === 'CUP-1') {
        toggleBoxColor(cup1);
    } else if (content === 'CUP-2') {
        toggleBoxColor(cup2);
    } else if (content === 'CUP-3') {
        toggleBoxColor(cup3);
    } else if (content === 'CUP-4') {
        toggleBoxColor(cup4);
    } else if (content === 'CUP-5') {
        toggleBoxColor(cup5);
    } else if (content === 'CUP-6') {
        toggleBoxColor(cup6);
    } else if (content === 'CUP-7') {
        toggleBoxColor(cup7);
    } else if (content === 'CUP-8') {
        toggleBoxColor(cup8);
    } else if (content === 'CUP-9') {
        toggleBoxColor(cup9);
    } else if (content === 'CUP-10') {
        toggleBoxColor(cup10);
    }
});

