document.getElementById('qrForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const text = document.getElementById('text').value;
    const color = document.getElementById('color').value;
    const format = document.getElementById('format').value;

    const response = await fetch('/generate_qr', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text, color, format })
    });

    const data = await response.json();
    if (response.ok) {
        const qrResult = document.getElementById('qrResult');

        // Manejo de los diferentes formatos de imagen
        if (format === 'svg') {
            // Crear un blob para SVG
            const blob = new Blob([data.qrCode], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);

            qrResult.innerHTML = `
                <h3>Your QR Code:</h3>
                <object type="image/svg+xml" data="${url}" width="200" height="200"></object>
                <br>
                <a href="${url}" download="qr_code.svg">
                    <button>Download SVG QR Code</button>
                </a>
            `;
        } else {
            // Para PNG y JPG
            const fileExtension = format === 'jpg' ? 'jpg' : 'png';
            const imgSrc = `data:image/${fileExtension};base64,${data.qrCode}`;

            qrResult.innerHTML = `
                <h3>Your QR Code:</h3>
                <img src="${imgSrc}" alt="QR Code">
                <br>
                <a href="${imgSrc}" download="qr_code.${fileExtension}">
                    <button>Download ${fileExtension.toUpperCase()} QR Code</button>
                </a>
            `;
        }
    } else {
        console.error('Error generating QR code');
    }
});
