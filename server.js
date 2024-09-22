const express = require('express');
const QRCode = require('qrcode');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para generar el código QR
app.post('/generate_qr', async (req, res) => {
    const { text, color, format } = req.body;

    // Opciones del QR, con fondo transparente
    const qrOptions = {
        color: {
            dark: color || '#000000',  // color del código QR
            light: '#0000'  // fondo transparente
        }
    };

    try {
        // Generar el QR en el formato solicitado
        let qrCode;
        if (format === 'svg') {
            qrCode = await QRCode.toString(text, { type: 'svg', ...qrOptions });
            res.setHeader('Content-Type', 'image/svg+xml');
        } else if (format === 'jpg') {
            const qrImage = await QRCode.toDataURL(text, qrOptions);
            qrCode = qrImage.replace(/^data:image\/png;base64,/, "");  // Obtener solo la base64
            res.setHeader('Content-Type', 'image/jpeg');
        } else {
            const qrImage = await QRCode.toDataURL(text, qrOptions);
            qrCode = qrImage.replace(/^data:image\/png;base64,/, "");  // Obtener solo la base64
            res.setHeader('Content-Type', 'image/png');
        }

        // Responder con el QR
        res.json({ qrCode });
    } catch (error) {
        res.status(500).send('Error al generar el código QR');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
