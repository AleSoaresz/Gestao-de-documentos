const uploadForm = document.getElementById('uploadForm');
const listaDocs = document.getElementById('lista-documentos');

// Lista apenas o resumo dos documentos
async function carregarDocumentos() {
    const res = await fetch('/documentos');
    const docs = await res.json();
    
    listaDocs.innerHTML = docs.map(doc => `
        <div class="card" style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem;">
            <div>
                <h3 style="margin: 0; color: #2563eb;"> ${doc.titulo}</h3>
                <small style="color: #64748b;">Enviado em: ${new Date(doc.dataUpload).toLocaleDateString()}</small>
            </div>
            <button onclick="window.open('visualizar.html?id=${doc._id}', '_blank')" style="width: auto; padding: 10px 20px;">
                 Abrir Documento
            </button>
        </div>
    `).join('');
}

// Lógica de Upload
uploadForm.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulo', document.getElementById('titulo').value);
    formData.append('descricao', document.getElementById('descricao').value);
    formData.append('arquivo', document.getElementById('arquivo').files[0]);

    const res = await fetch('/upload', { method: 'POST', body: formData });
    if (res.ok) {
        uploadForm.reset();
        carregarDocumentos();
    } else {
        alert("Erro no upload: Formato não permitido!");
    }
};

carregarDocumentos();