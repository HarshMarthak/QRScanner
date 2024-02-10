document.addEventListener('DOMContentLoaded', function () {
    const qrCodes = ['qr1', 'qr2', 'qr3', 'qr4', 'qr5', 'qr6', 'qr7', 'qr8', 'qr9', 'qr10'];
    const boxes = Array.from({ length: qrCodes.length }, () => 'green');
    let scanning = false;

    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });

    scanner.addListener('scan', function (content) {
        if (scanning) {
            const index = qrCodes.indexOf(content);
            if (index !== -1) {
                toggleBoxState(index);
            } else {
                alert('Invalid QR Code');
            }
        }
    });

    document.getElementById('startScanButton').addEventListener('click', function () {
        if (!scanning) {
            startScanning();
        }
    });

    function startScanning() {
    Instascan.Camera.getCameras().then(function (cameras) {
        const backCamera = cameras.find(camera => camera.name.includes('back'));
        if (backCamera) {
            scanning = true;
            scanner.start({ video: backCamera, facingMode: 'environment' });
        } else {
            alert('Back camera not found.');
        }
    }).catch(function (e) {
        console.error(e);
    });
}

    function toggleBoxState(index) {
        boxes[index] = boxes[index] === 'green' ? 'red' : 'green';
        updateBoxColors();
    }

    function updateBoxColors() {
        for (let i = 0; i < qrCodes.length; i++) {
            const box = document.getElementById(`box${i + 1}`);
            box.style.backgroundColor = boxes[i];
        }
    }
});
