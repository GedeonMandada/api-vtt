Absolutely! Here's a professional `README.md` for your **Whisper JSON → VTT API** project:

---

## 📝 Whisper JSON → VTT Converter API

This project provides an API to convert [Whisper-style](https://github.com/openai/whisper) transcription JSON into [WebVTT](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API) (`.vtt`) subtitle files.

Built with **Node.js**, **Express**, and **Multer**, it supports:

* Raw JSON POST input
* File uploads via multipart/form-data
* CORS and rate limiting
* Dockerized deployment

---

### 🚀 Features

* 🔁 Convert Whisper transcription JSON into `.vtt`
* 📥 Upload `.json` via file or raw POST body
* 🔐 Rate-limited and CORS-enabled
* 🐳 Docker-ready for deployment

---

### 📦 Installation

```bash
git clone https://github.com/your-username/whisper-vtt-api.git
cd whisper-vtt-api
npm install
```

---

### ▶️ Running the API

#### Locally:

```bash
node app.js
```

#### With Docker:

```bash
docker build -t whisper-vtt-api .
docker run -p 3000:3000 whisper-vtt-api
```

API will be available at: [http://localhost:3000](http://localhost:3000)

---

### 🔌 Endpoints

#### `POST /convert-to-vtt`

Converts Whisper JSON directly from request body.

**Headers:**

```http
Content-Type: application/json
Accept: text/vtt
```

**Body:**

```json
{
  "transcription": {
    "segments": [
      {
        "start": 0.0,
        "end": 2.5,
        "text": "Hello world."
      }
    ]
  }
}
```

**Response:**
Returns `.vtt` subtitle text.

---

#### `POST /upload-json`

Converts Whisper JSON uploaded as a `.json` file.

**Form-data field:**

| Key  | Type | Value                 |
| ---- | ---- | --------------------- |
| file | File | your\_json\_file.json |

**Response:**
Returns `.vtt` subtitle text.

---

### 🧪 Example cURL Usage

```bash
curl -X POST http://localhost:3000/convert-to-vtt \
  -H "Content-Type: application/json" \
  -d @your_transcription.json
```

```bash
curl -X POST http://localhost:3000/upload-json \
  -F "file=@your_transcription.json"
```

---

### 🔐 Rate Limiting

Limits each IP to **60 requests/minute** (configurable).

---

### 🛠 Technologies Used

* Node.js
* Express.js
* Multer (file uploads)
* express-rate-limit
* CORS
* Docker

---

### 📁 File Structure

```
├── app.js              # Main server
├── package.json        # Node dependencies
├── Dockerfile          # For Docker deployment
├── .gitignore
```

---

### 📄 License

MIT — Free to use and modify.

---

Let me know if you'd like the badge-style headers (Docker | Node | MIT | JSON API), GitHub Actions CI setup, or a `.zip` export!
