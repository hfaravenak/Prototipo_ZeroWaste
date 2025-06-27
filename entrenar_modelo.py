import sys
sys.stdout.reconfigure(encoding='utf-8')  # Evitar errores de impresión en consola de Windows

import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras import layers, models
import os

# Ruta a tu dataset
BASE_DIR = os.path.join(os.getcwd(), 'dataset')

# Generador de datos con aumento
datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    rotation_range=20,
    zoom_range=0.1,
    width_shift_range=0.1,
    height_shift_range=0.1,
    brightness_range=(0.8, 1.2),
    horizontal_flip=True,
    fill_mode='nearest'
)

# Generadores de entrenamiento y validación
train_generator = datagen.flow_from_directory(
    BASE_DIR,
    target_size=(180, 180),
    batch_size=8,
    class_mode='categorical',
    subset='training',
    shuffle=True
)

val_generator = datagen.flow_from_directory(
    BASE_DIR,
    target_size=(180, 180),
    batch_size=8,
    class_mode='categorical',
    subset='validation'
)

# Modelo CNN
model = models.Sequential([
    layers.Input(shape=(180, 180, 3)),
    layers.Conv2D(32, (3, 3), activation='relu'),
    layers.MaxPooling2D(2, 2),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D(2, 2),
    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.MaxPooling2D(2, 2),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(2, activation='softmax')  # 2 clases: arroz y fideos
])

# Compilar modelo
model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# Entrenar
model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=30
)

# Guardar modelo
model.save("modelo_comida.keras")
print("Modelo guardado como 'modelo_comida.keras'")
