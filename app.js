document.addEventListener('DOMContentLoaded', function () {
    const qrCodes = ['qr1', 'qr2', 'qr3', 'qr4', 'qr5', 'qr6', 'qr7', 'qr8', 'qr9', 'qr10'];
    let boxes = Array.from({ length: qrCodes.length }, () => null);
    let scanning = false;

    const video = document.getElementById('preview');
    let scanner;

    document.getElementById('toggleSwitch').addEventListener('change', function () {
        if (this.checked) {
            startScanning();
        } else {
            stopScanning();
        }
    });

    function startScanning() {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(function (stream) {
                scanning = true;
                video.srcObject = stream;
                scanner = new Instascan.Scanner({ video: video });
                scanner.addListener('scan', function (content) {
                    const index = qrCodes.indexOf(content);
                    if (index !== -1) {
                        handleScannedQR(index);
                    } else {
                        alert('Invalid QR Code');
                    }
                });
                Instascan.Camera.getCameras().then(function (cameras) {
                    const backCamera = cameras.find(camera => camera.name.includes('back'));
                    if (backCamera) {
                        scanner.start(backCamera);
                    } else {
                        alert('Back camera not found.');
                    }
                }).catch(function (e) {
                    console.error(e);
                });
            })
            .catch(function (error) {
                console.error('getUserMedia error:', error);
            });
    }

    function stopScanning() {
        if (scanner) {
            scanner.stop();
            scanning = false;
        }
    }

    function handleScannedQR(index) {
        const availableBoxIndex = boxes.indexOf(null);
        if (availableBoxIndex !== -1) {
            boxes[availableBoxIndex] = qrCodes[index];
            updateBoxColors();
        } else {
            alert('All boxes are occupied. Cannot add more QR codes.');
        }
    }

    function updateBoxColors() {
        for (let i = 0; i < qrCodes.length; i++) {
            const box = document.getElementById(`box${i + 1}`);
            const qrCode = boxes[i];
            box.style.backgroundColor = qrCode ? 'red' : 'green';
        }
    }
});
