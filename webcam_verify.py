import cv2

for i in range(5):
    cap = cv2.VideoCapture(i)
    if cap.isOpened():
        ret, frame = cap.read()
        if ret:
            print(f"Camara encontrada en el indice {i}")
            cv2.imshow(f"Cámara índice {i}", frame)
            cv2.waitKey(2000)
            cv2.destroyAllWindows()
        cap.release()