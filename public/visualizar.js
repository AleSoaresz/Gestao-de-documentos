const detalheContainer = document.getElementById('detalhe-documento');

async function carregarDetalhes() {
    // 1. Pega o ID que passamos pela URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    // 2. Busca os dados no servidor
    const res = await fetch('/documentos');
    const docs = await res.json();
    const doc = docs.find(d => d._id === id);

    if (!doc) {
        detalheContainer.innerHTML = "<h2>Documento não encontrado.</h2>";
        return;
    }

    // 3. Define se é PDF ou Imagem
    const arquivoUrl = `/uploads/${doc.nomeArquivo}`;
    const extensao = doc.nomeArquivo.split('.').pop().toLowerCase();
    let previewHTML = '';

    if (extensao === 'pdf') {
        previewHTML = `<iframe src="${arquivoUrl}" width="100%" height="600px" style="border-radius:8px; border:1px solid #e2e8f0;"></iframe>`;
    } else {
        previewHTML = `<img src="${arquivoUrl}" style="max-width:100%; border-radius:8px; border:1px solid #e2e8f0;">`;
    }

    // 4. Monta a tela
    detalheContainer.innerHTML = `
        <div class="card">
            <h2> ${doc.titulo}</h2>
            <p><strong>Descrição:</strong> ${doc.descricao || 'Sem descrição.'}</p>
            <div class="preview-area">${previewHTML}</div>
            
            <a href="${arquivoUrl}" download class="btn-download"> Baixar Arquivo Original</a>

            <div class="comentarios">
                <h4> Comentários</h4>
                <div id="coments-${doc._id}">
                    ${doc.comentarios.map(c => `
                        <div class="comentario-item">
                            <strong> ${c.autor}</strong>
                            <p>${c.texto}</p>
                            <small style="color: #94a3b8; font-size: 10px;">${new Date(c.data).toLocaleString()}</small>
                        </div>
                    `).join('')}
                </div>
                
                <div style="margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
                    <input type="text" id="nome-${doc._id}" placeholder="Seu nome">
                    <input type="text" id="msg-${doc._id}" placeholder="Escreva um comentário...">
                    <button onclick="comentar('${doc._id}')">Postar Comentário</button>
                </div>
            </div>
        </div>
    `;
}

async function comentar(id) {
    const autor = document.getElementById(`nome-${id}`).value;
    const texto = document.getElementById(`msg-${id}`).value;
    
    if(!autor || !texto) return alert("Preencha todos os campos!");

    const res = await fetch(`/documentos/${id}/comentar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ autor, texto })
    });

    if (res.ok) {
        carregarDetalhes(); // Recarrega para mostrar o novo comentário
    }
}

carregarDetalhes();