from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

model = load_model('retina_model.h5')

labels_map_inv = {0: 'bad', 1: 'good', 2: 'outlier'}
IMG_SIZE = (128, 128)

def remove_optic_disc(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, mask = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY)
    mask = cv2.bitwise_not(mask)
    return cv2.bitwise_and(img, img, mask=mask)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'مافي صورة'}), 400

    file = request.files['image']
    img_bytes = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(img_bytes, cv2.IMREAD_COLOR)

    if img is None:
        return jsonify({'error': 'الصورة مو صالحة'}), 400

    img = remove_optic_disc(img)
    img = cv2.resize(img, IMG_SIZE)
    img_input = np.expand_dims(img, axis=0) / 255.0

    pred = model.predict(img_input)
    class_idx = int(np.argmax(pred))
    confidence = float(np.max(pred)) * 100

    return jsonify({
        'prediction': labels_map_inv[class_idx],
        'confidence': f'{confidence:.1f}%'
    })

if __name__ == '__main__':
    app.run(debug=True)