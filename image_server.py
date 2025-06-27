from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS
import os
import cv2
from datetime import datetime
import atexit
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image as keras_image

app = Flask(__name__)
CORS(app)

# Rutas
IMAGES_FOLDER = r'C:\Users\Pipe\Desktop\Prototipo\images'
MODEL_PATH = r'C:\Users\Pipe\Desktop\Prototipo\modelo_comida.keras'

# Crear carpeta si no existe
if not os.path.exists(IMAGES_FOLDER):
    os.makedirs(IMAGES_FOLDER)

# Cargar modelo de clasificación
modelo_comida = load_model(MODEL_PATH)
clases = ['arroz_con_pollo', 'fideos']

# Cámara
camera = cv2.VideoCapture(0)
if not camera.isOpened():
    raise RuntimeError("No se pudo abrir la cámara")

@atexit.register
def liberar_camara():
    if camera.isOpened():
        print("Liberando cámara...")
        camera.release()

@app.route('/')
def list_images():
    try:
        files = sorted(
            [f for f in os.listdir(IMAGES_FOLDER) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
        )
        return jsonify(files)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/last', methods=['GET'])
def get_last_image_info():
    try:
        files = sorted(
            [f for f in os.listdir(IMAGES_FOLDER) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
        )
        if not files:
            return jsonify({'error': 'No hay imágenes'}), 404

        last_file = files[-1]
        filepath = os.path.join(IMAGES_FOLDER, last_file)
        imagen = cv2.imread(filepath)

        if imagen is None:
            return jsonify({'error': 'No se pudo leer la imagen'}), 500

        volumen = estimar_volumen(imagen)
        tipo_comida, confianza = clasificar_comida(filepath)

        return jsonify({
            'filename': last_file,
            'volumen_cm3': volumen,
            'tipo_comida': tipo_comida,
            'confianza': confianza
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/images/<filename>')
def get_image(filename):
    try:
        return send_from_directory(IMAGES_FOLDER, filename)
    except FileNotFoundError:
        return jsonify({'error': 'Imagen no encontrada'}), 404

def estimar_volumen(imagen):
    gris = cv2.cvtColor(imagen, cv2.COLOR_BGR2GRAY)
    gris_suave = cv2.GaussianBlur(gris, (5, 5), 0)
    _, umbral = cv2.threshold(gris_suave, 100, 255, cv2.THRESH_BINARY_INV)
    contornos, _ = cv2.findContours(umbral, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    area_pixeles = sum([cv2.contourArea(c) for c in contornos]) if contornos else 0
    print(f"[DEBUG] Área total detectada: {area_pixeles:.2f} px²")

    if area_pixeles < 93576.00:
        return 0

    diametro_plato_cm = 27
    radio_cm = diametro_plato_cm / 2
    area_plato_cm2 = np.pi * (radio_cm ** 2)

    ancho_imagen_px = imagen.shape[1]
    escala_pixeles_a_cm2 = area_plato_cm2 / (ancho_imagen_px ** 2)
    area_cm2 = area_pixeles * escala_pixeles_a_cm2

    altura_promedio_cm = 2
    volumen_cm3 = area_cm2 * altura_promedio_cm

    return round(volumen_cm3, 2)

def clasificar_comida(ruta_imagen):
    img = keras_image.load_img(ruta_imagen, target_size=(180, 180))
    img_array = keras_image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0
    pred = modelo_comida.predict(img_array)
    clase_index = np.argmax(pred[0])
    return clases[clase_index], float(np.max(pred[0]))

@app.route('/capture', methods=['POST'])
def capture_image():
    try:
        if not camera.isOpened():
            return jsonify({'error': 'Cámara no disponible'}), 500

        ret, frame = camera.read()
        if not ret:
            return jsonify({'error': 'No se pudo capturar la imagen'}), 500

        filename = datetime.now().strftime('%Y%m%d_%H%M%S') + '.jpg'
        filepath = os.path.join(IMAGES_FOLDER, filename)
        cv2.imwrite(filepath, frame)

        volumen = estimar_volumen(frame)
        tipo_comida, confianza = clasificar_comida(filepath)

        return jsonify({
            'filename': filename,
            'volumen_cm3': volumen,
            'tipo_comida': tipo_comida,
            'confianza': confianza
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("Servidor Flask corriendo en http://localhost:5000")
    app.run(port=5000)
