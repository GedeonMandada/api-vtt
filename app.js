const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute
//   max: 60 // limit each IP to 60 requests per minute
// });
// app.use(limiter);

// JSON parser for raw POST bodies
app.use(express.json({ limit: '200mb' }));

// Multer setup for file upload (JSON only)
const upload = multer({ storage: multer.memoryStorage() });

// Time formatter
function toVTTTime(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(Math.floor(seconds % 60)).padStart(2, '0');
  const ms = String(Math.round((seconds % 1) * 1000)).padStart(3, '0');
  return `${h}:${m}:${s}.${ms}`;
}

// POST: JSON body
app.post('/convert-to-vtt', (req, res) => {
  const segments = req.body?.transcription?.segments;
  if (!segments || !Array.isArray(segments)) {
    return res.status(400).json({ error: 'Missing transcription.segments' });
  }

  let vtt = "WEBVTT\n\n";
  segments.forEach((seg, i) => {
    vtt += `${i + 1}\n`;
    vtt += `${toVTTTime(seg.start)} --> ${toVTTTime(seg.end)}\n`;
    vtt += `${seg.text.trim()}\n\n`;
  });

  res.set('Content-Type', 'text/vtt');
  res.send(vtt);
});

// POST: File upload version
app.post('/upload-json', upload.single('file'), (req, res) => {
  try {
    const content = req.file.buffer.toString();
    const json = JSON.parse(content);
    const segments = json?.transcription?.segments;

    if (!segments || !Array.isArray(segments)) {
      return res.status(400).json({ error: 'Missing transcription.segments' });
    }

    let vtt = "WEBVTT\n\n";
    segments.forEach((seg, i) => {
      vtt += `${i + 1}\n`;
      vtt += `${toVTTTime(seg.start)} --> ${toVTTTime(seg.end)}\n`;
      vtt += `${seg.text.trim()}\n\n`;
    });

    res.set('Content-Type', 'text/vtt');
    res.send(vtt);
  } catch (err) {
    res.status(500).json({ error: 'Failed to parse uploaded JSON file' });
  }
});

app.get('/', (req, res) => {
  res.send('Whisper JSON → VTT API is running 🚀');
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
