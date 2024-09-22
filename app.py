from flask import Flask, render_template, request, send_file
import qrcode
from io import BytesIO
from PIL import Image

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    data = request.form.get('text')
    color = request.form.get('color') or "black"
    
    # Crear un código QR con fondo transparente
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    
    img = qr.make_image(fill=color, back_color="white").convert("RGBA")
    
    # Convertir el blanco a transparente
    data = img.getdata()
    newData = []
    for item in data:
        if item[0] == 255 and item[1] == 255 and item[2] == 255:  # blanco
            newData.append((255, 255, 255, 0))  # transparente
        else:
            newData.append(item)
    img.putdata(newData)
    
    # Guardar la imagen en memoria
    img_io = BytesIO()
    img.save(img_io, 'PNG')
    img_io.seek(0)
    
    return send_file(img_io, mimetype='image/png', as_attachment=True, download_name='qr_code.png')

if __name__ == '__main__':
    app.run(debug=True)
