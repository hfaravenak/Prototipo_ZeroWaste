import cv2
import os
from pathlib import Path
from datetime import datetime

# Carpeta personalizada donde se guardarán las imágenes
FOTOS_PATH = Path(r'C:\Users\Pipe\Desktop\Prototipo\images')
FOTOS_PATH.mkdir(parents=True, exist_ok=True)

# Índice de la webcam es 0 en mi caso ya que la webcam esta conectada por usb. 
# Sino saben en que indice se encuentra su camara ejecuten el script webcam_verify
WEBCAM_INDEX = 0

def main():
    cap = cv2.VideoCapture(WEBCAM_INDEX)

    if not cap.isOpened():
        print("Error: No se puede acceder a la webcam")
        return

    print("Presiona 'f' para tomar una foto. Presiona 'q' para salir.")

    while True:
        ret, frame = cap.read()

        if not ret:
            print("Error: No se pudo capturar la imagen")
            break

        # Muestra el video en vivo
        cv2.imshow('Zero Waste Webcam - Presiona "f" para tomar foto', frame)

        # Espera por tecla presionada
        key = cv2.waitKey(1) & 0xFF

        # Si presionas 'f', tomar foto
        if key == ord('f'):
            nombre_archivo = datetime.now().strftime("%Y%m%d_%H%M%S") + ".jpg"
            ruta_foto = FOTOS_PATH / nombre_archivo
            cv2.imwrite(str(ruta_foto), frame)
            print(f"Imagen capturada y guardada: {ruta_foto}")

        # Si presionas 'q', salir del loop
        elif key == ord('q'):
            print("Saliendo del programa...")
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
