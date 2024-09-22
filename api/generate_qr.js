const QRCode = require('qrcode');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { text, color, format } = req.body;

        // Opciones del QR, con fondo transparente
        const qrOptions = {
            color: {
                dark: color || '#000000',  // color del código QR
                light: '#0000'  // fondo transparente
            }
        };

        try {
            let qrCode;
            if (format === 'svg') {
                qrCode = await QRCode.toString(text, { type: 'svg', ...qrOptions });
                res.setHeader('Content-Type', 'image/svg+xml');
            } else if (format === 'jpg') {
                const qrImage = await QRCode.toDataURL(text, qrOptions);
                qrCode = qrImage.replace(/^data:image\/png;base64,/, "");
                res.setHeader('Content-Type', 'image/jpeg');
            } else {
                const qrImage = await QRCode.toDataURL(text, qrOptions);
                qrCode = qrImage.replace(/^data:image\/png;base64,/, "");
                res.setHeader('Content-Type', 'image/png');
            }

            res.status(200).json({ qrCode });
        } catch (error) {
            res.status(500).send('Error al generar el código QR');
        }
    } else {
        res.status(405).send({ message: 'Only POST requests are allowed' });
    }
}
