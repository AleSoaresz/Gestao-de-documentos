const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// 
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/resende_mori';

mongoose.connect(mongoURI)
    .then(() => console.log("Conectado ao MongoDB!"))
    .catch(err => console.error("Erro ao conectar:", err));

const DocumentoSchema = new mongoose.Schema({
    titulo: String,
    descricao: String,
    nomeArquivo: String,
    dataUpload: { type: Date, default: Date.now },
    comentarios: [{
        autor: String,
        texto: String,
        data: { type: Date, default: Date.now }
    }]
});

const Documento = mongoose.model('Documento', DocumentoSchema);

//configuração de Armazenamento Local (Multer)
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = /pdf|jpg|jpeg|png/;
        const ext = allowed.test(path.extname(file.originalname).toLowerCase());
        if (ext) return cb(null, true);
        cb(new Error("Formato inválido! Apenas PDF, JPG e PNG."));
    }
});

// ROTAS
app.post('/upload', upload.single('arquivo'), async (req, res) => {
    try {
        const novoDoc = new Documento({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            nomeArquivo: req.file.filename
        });
        await novoDoc.save();
        res.status(201).json(novoDoc);
    } catch (err) { res.status(400).send(err.message); }
});

app.get('/documentos', async (req, res) => {
    const docs = await Documento.find().sort({ dataUpload: -1 });
    res.json(docs);
});

app.post('/documentos/:id/comentar', async (req, res) => {
    const { autor, texto } = req.body;
    const doc = await Documento.findByIdAndUpdate(
        req.params.id,
        { $push: { comentarios: { autor, texto } } },
        { new: true }
    );
    res.json(doc);
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));

// No final do arquivo, onde você dá o app.listen:
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});