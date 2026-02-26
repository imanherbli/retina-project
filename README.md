# retina-project
# 🔬 Retina Görüntüsü Sınıflandırma Sistemi

Bu proje, retina fundus görüntülerini derin öğrenme kullanarak otomatik olarak sınıflandıran bir web uygulamasıdır.

---

##  Projenin Amacı؟
Retina görüntülerini üç kategoriye ayırmak:
| Kategori | Açıklama |
|----------|----------|
| ✅ **Good** | Kaliteli ve analiz edilebilir görüntü |
| ❌ **Bad** | Düşük kaliteli veya bozuk görüntü |
| ⚠️ **Outlier** | Sınıflandırılamayan veya belirsiz görüntü |
##  Kullanılan Teknolojiler
### Yapay Zeka & Görüntü İşleme
- **TensorFlow / Keras** — CNN modelinin eğitimi
- **OpenCV** — Görüntü ön işleme ve Optik Disk kaldırma
- **NumPy** — Sayısal işlemler
### Backend
- **Python 3.13**
- **Flask** — REST API sunucusu
- **Flask-CORS** — Cross-Origin isteklerine izin verme
### Frontend
- **React.js** — Kullanıcı arayüzü
## Modelin Çalışma Mantığı

```
Ham Retina Görüntüsü
        ↓
Optik Disk Kaldırma (Thresholding)
        ↓
Boyut Değiştirme → 128x128
        ↓
Normalizasyon → [0, 1]
        ↓
CNN Modeli
        ↓
Sınıflandırma: Good / Bad / Outlier
```

### CNN Mimarisi
```
Conv2D(32) → MaxPooling
Conv2D(64) → MaxPooling
Flatten
Dense(128) → Dense(3, softmax)
```

---

## Proje Yapısı :

```
retina-project/
├── backend/
│   ├── app.py              ← Flask API
│   └── retina_model.h5     ← Eğitilmiş model
└── frontend/
    └── src/
        └── App.js          ← React arayüzü
```

---

## Kurulum ve Çalıştırma :
### Backend
```bash
cd backend
pip install flask flask-cors tensorflow opencv-python
python app.py
```
### Frontend
```bash
cd frontend
npm install
npm start
----

Uygulama `http://localhost:3000` adresinde çalışacaktır.

---

## Eğitim Verisi
-
Exudate detection for diabetic retinopathy with circular Hough transformation and convolutional neural networks makallesinde proje ve veri seti alındı

- **DRIMDB** veri seti kullanılmıştır
- Görüntüler `128x128` piksel boyutuna yeniden ölçeklendirilmiştir
- Eğitim sırasında %10 doğrulama ayrımı uygulanmıştır

---
##Geliştirici
Bu proje bir görüntü kalite sınıflandırma sistemi olarak geliştirilmiştir.
