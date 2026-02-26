import { useState } from "react";

const LABELS = {
  good:    { text: "✅ SAĞLAM",           color: "#c6f6d5", textColor: "#276749" },
  bad:     { text: "❌ ŞEKER HASTALIĞINA SAHİP",          color: "#fed7d7", textColor: "#9b2c2c" },
  outlier: { text: "⚠️ Belirsiz",     color: "#fefcbf", textColor: "#744210" },
};

export default function App() {
  const [image, setImage]     = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  }

  async function handleSubmit() {
    if (!image) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Sunucuya bağlanılamadı, Flask'ın çalıştığından emin olun.");
    }

    setLoading(false);
  }

  return (
    <div style={{ fontFamily: "Arial", maxWidth: 500, margin: "50px auto", textAlign: "center" }}>
      <div style={{ background: "white", padding: 40, borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>

        <h1 style={{ color: "#2d3748" }}>🔬 Retina Görüntüsü Sınıflandırma</h1>
        <p style={{ color: "#718096" }}>Sınıflandırmak için bir retina görüntüsü yükleyin</p>

        <label style={{
          display: "block", border: "2px dashed #a0aec0", borderRadius: 12,
          padding: 30, margin: "20px 0", cursor: "pointer"
        }}>
          📁 Görüntü yüklemek için tıklayın
          <input type="file" accept="image/*" onChange={handleFileChange} hidden />
        </label>

        {preview && (
          <img src={preview} alt="Önizleme" style={{ maxWidth: "100%", borderRadius: 8, marginBottom: 16 }} />
        )}

        <button
          onClick={handleSubmit}
          disabled={!image || loading}
          style={{
            background: !image || loading ? "#a0aec0" : "#4299e1",
            color: "white", border: "none", padding: "12px 40px",
            borderRadius: 8, fontSize: 16, cursor: !image || loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Analiz ediliyor..." : "Görüntüyü Analiz Et"}
        </button>

        {error && (
          <div style={{ marginTop: 20, padding: 16, background: "#fed7d7", borderRadius: 8, color: "#9b2c2c" }}>
            {error}
          </div>
        )}

        {result && (
          <div style={{
            marginTop: 20, padding: 20, borderRadius: 8,
            background: LABELS[result.prediction].color,
            color: LABELS[result.prediction].textColor
          }}>
            <h2 style={{ margin: "0 0 8px" }}>{LABELS[result.prediction].text}</h2>
            <p style={{ margin: 0 }}>Güven oranı: {result.confidence}</p>
          </div>
        )}

      </div>
    </div>
  );
}