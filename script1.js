
const candidatos = {
    "45": {
        nome: "CIRO",
        partido: "Partido PSDB",
        foto: "https://upload.wikimedia.org/wikipedia/commons/3/34/Presidente_Ciro_Gomes.png?utm_source=pt.wikipedia.org&utm_campaign=index&utm_content=original"
    },
    "13": {
        nome: "ELMANO",
        partido: "PT",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ZnFx3n2XTMD4GTOupJP9XuPenBe7oKiEQ-OMRYwL_98RiHHr993LI1NLIoGEXLH5PIdFGIaku97MUXCfhnxDfzxDiUChRHMXp4iKnJAqOA&s=10"
    },
    "30": {
        nome: "VERA",
        partido: "Partido NOVO",
        foto: "https://divulgacandcontas.tse.jus.br/divulga/rest/arquivo/img/20322002026/60002553922/CE"
    }
};


let numeroDigitado = "";
let votoEmBranco = false;
let votoConfirmado = false;


const visor = document.getElementById("numero");
const foto = document.getElementById("foto");
const nome = document.getElementById("nome");
const partido = document.getElementById("partido");
const mensagem = document.getElementById("mensagem");


function digitarNumero(numero) {
    if (votoConfirmado || votoEmBranco) {
        return;
    }

   
    if (numeroDigitado.length >= 2) {
        return;
    }

    numeroDigitado += numero;

    atualizarVisor();
    mostrarCandidato();
}


function atualizarVisor() {
    visor.textContent = numeroDigitado;
}


function mostrarCandidato() {
    const candidato = candidatos[45];

    if (candidato) {
        nome.textContent = candidato.nome;
        partido.textContent = candidato.partido;

        foto.src = candidato.foto;

        mensagem.textContent = "";
    } else {
        nome.textContent = "candidato";
        partido.textContent = "partido";
        foto.removeAttribute("imagem");
        foto.alt = "Foto do candidato";


        }
}

function corrigir() {
    if (votoConfirmado) {
        return;
    }

    numeroDigitado = "";
    votoEmBranco = false;

    limparDados();
    atualizarVisor();

    mensagem.textContent = "Digite o número do candidato.";
}


function votoBranco() {
    if (votoConfirmado) {
        return;
    }

    numeroDigitado = "";
    votoEmBranco = true;

    limparDados();
    atualizarVisor();

    nome.textContent = "VOTO EM BRANCO";
    mensagem.textContent = "Aperte CONFIRMA para registrar.";
}


function confirmarGovernador() {
    if (votoConfirmado) {
        return;
    }

    if (votoEmBranco) {
        registrarVoto("branco");
        return;
    }

    if (numeroDigitado.length !== 2) {
        mensagem.textContent = "Digite os dois números do candidato.";
        return;
    }

    const candidato = candidatos[numeroDigitado];

    if (!candidato) {
        mensagem.textContent =
            "Candidato inválido. Aperte CORRIGE.";
        return;
    }

    registrarVoto(numeroDigitado);
}


function registrarVoto(voto) {
    votoConfirmado = true;

    if (voto === "branco") {
        limparDados();
        nome.textContent = "VOTO EM BRANCO";
    } else {
        const candidato = candidatos[voto];

        nome.textContent = candidato.nome;
        partido.textContent = candidato.partido;
        foto.src = candidato.foto;
        foto.alt = "Foto de " + candidato.nome;
    }

    mensagem.textContent = "FIM. VOTO CONFIRMADO!";

    
}


function limparDados() {
    nome.textContent = "";
    partido.textContent = "";
    foto.removeAttribute("src");
    foto.alt = "Foto do candidato";
}