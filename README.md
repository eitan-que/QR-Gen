
# QR Code Generator

Este es un generador de códigos QR simple que permite crear códigos QR personalizados en formato `.png`, `.jpg` y `.svg`, con la opción de cambiar el color del código QR. Puedes acceder a la aplicación en [qr-gen-ebon-eight.vercel.app](https://qr-gen-ebon-eight.vercel.app).

## Características

- **Exportación en múltiples formatos**: Genera códigos QR en formato PNG, JPG o SVG.
- **Colores personalizables**: Cambia el color del código QR según tus preferencias.
- **Fondo transparente**: Todos los códigos QR generados tienen un fondo transparente.
- **Descarga directa**: Los códigos QR generados pueden descargarse directamente desde el navegador.

## Requisitos

- Node.js
- Express.js
- QRCode (librería para generar códigos QR)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/qr-code-generator.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd qr-code-generator
   ```

3. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

4. Inicia el servidor:

   ```bash
   node server.js
   ```

5. Abre tu navegador y visita:

   ```
   http://localhost:3000
   ```

## Uso

1. Introduce el texto que quieres codificar en el código QR.
2. Selecciona el color del código QR mediante el selector de color.
3. Elige el formato de salida: PNG, JPG o SVG.
4. Haz clic en "Generate QR Code" para ver el resultado.
5. Descarga el código QR en el formato seleccionado.

## Estructura del proyecto

```bash
qr-code-generator/
├── public/
│   ├── index.html    # Interfaz de usuario
│   ├── style.css     # Estilos de la interfaz
│   └── script.js     # Lógica del cliente para generar y mostrar el QR
├── server.js         # Servidor Express para generar y devolver el QR
├── api/
│   └── generate_qr.js  # API para manejar la generación de códigos QR
├── package.json      # Dependencias del proyecto
└── README.md         # Documentación
```

## API

### POST `/generate_qr`

Genera un código QR basado en el texto proporcionado.

- **Body**:
  - `text`: El texto que será codificado en el QR (obligatorio).
  - `color`: El color del código QR en formato hexadecimal (opcional, por defecto negro).
  - `format`: El formato del código QR (`png`, `jpg`, o `svg`) (opcional, por defecto `png`).

- **Respuesta**:
  - Devuelve un código QR en formato de imagen o SVG dependiendo del formato solicitado.
