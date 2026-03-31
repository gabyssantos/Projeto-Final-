const modal = document.getElementById("modal");
const btnFoto = document.getElementById("btnFoto");
const fecharModal = document.getElementById("fecharModal");

const abrirCamera = document.getElementById("abrirCamera");
const video = document.getElementById("video");
const canvas = document.createElement("canvas");

const tirarFoto = document.getElementById("tirarFoto");
const fileInput = document.getElementById("fileInput");

const preview = document.getElementById("preview");

let streamAtual = null;

// Abrir modal
btnFoto.addEventListener("click", () => {
    modal.style.display = "flex";
});

// Fechar modal
fecharModal.addEventListener("click", () => {
    fecharCamera();
    modal.style.display = "none";
});

// Abrir câmera REAL
abrirCamera.addEventListener("click", async () => {
    try {
        streamAtual = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        });

        video.srcObject = streamAtual;

    } catch (erro) {
        alert("Erro ao acessar câmera");
        console.error(erro);
    }
});

// Tirar foto
tirarFoto.addEventListener("click", () => {
    if (!streamAtual) return;

    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0);

    const imagem = canvas.toDataURL("image/png");

    preview.innerHTML = `<img src="${imagem}">`;

    fecharCamera();
    modal.style.display = "none";
});

// Upload por arquivo
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}">`;
        };

        reader.readAsDataURL(file);
        modal.style.display = "none";
    }
});

// Fechar câmera
function fecharCamera() {
    if (streamAtual) {
        streamAtual.getTracks().forEach(track => track.stop());
        streamAtual = null;
    }
}

// Submit
document.getElementById("formReclamacao").addEventListener("submit", function(e) {
    e.preventDefault();

    const dados = {
        nome: document.getElementById("nome").value,
        telefone: document.getElementById("telefone").value,
        rua: document.getElementById("rua").value,
        bairro: document.getElementById("bairro").value,
        reclamacao: document.getElementById("reclamacao").value,
        tipo: document.getElementById("tipo_reclamacao").value
    };

    console.log("Dados enviados:", dados);
    alert("Reclamação salva com sucesso!");
});