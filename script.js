const display = document.getElementById("display");

function add(corrige) {
    display.value += corrige;
}

function apagar(corrige) {
    document.getElementById("display").value =
        document.getElementById("display").value.slice(0, -1);
}

const candidatos = {

    "13": {
        nome: "Lula",
        partido: "PT",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Os6OEIdbaRVcqp8yhD6ZaCvlXyeEedN2duVkYuJwpJ-2S1ReY4RijCA&s=10ss"
    },

    "22": {
        nome: "Flavio",
        partido: "PL",
        foto: "https://i.metroimg.com/Q4lSEu3GPmyhjKqESn0c43UPIk0nDzFrMRIzFCVKYes/rs:fill:1200:1200:1/g:no/q:85/f:webp/plain/https://images.metroimg.com/2026/08/flavio-bolsonaro-live.jpg"
    }

};


let cpfAtual = "";


function entrarNaUrna() {

    const cpf = document.getElementById("cpf").value.trim();

    const mensagem = document.getElementById("mensagemCPF");



    if (cpf.length !== 11 || isNaN(cpf)) {

        mensagem.textContent =
            "Digite um CPF com 11 números.";

        return;
    }



    const votaram =
        JSON.parse(localStorage.getItem("cpfsVotaram")) || [];


    if (votaram.includes(cpf)) {

        mensagem.textContent =
            "Este CPF já foi utilizado para votar.";

        return;
    }



    cpfAtual = cpf;



    document.getElementById("telaCPF").style.display = "none";

    document.getElementById("telaUrna").style.display = "flex";


    limparVoto();
}


function digitarNumero(numero) {

    const visor =
        document.getElementById("numero");



    if (visor.textContent.length >= 2) {
        return;
    }


  

    visor.textContent += numero;



    mostrarCandidato();
}


function mostrarCandidato() {

    const numero =
        document.getElementById("numero").textContent;

    const nome =
        document.getElementById("nome");

    const partido =
        document.getElementById("partido");

    const foto =
        document.getElementById("foto");

    const mensagem =
        document.getElementById("mensagem");




    nome.textContent = "";

    partido.textContent = "";

    mensagem.textContent = "";

    foto.style.display = "none";

    if (numero.length < 2) {
        return;
    }



    const candidato = candidatos[numero];



    if (candidato) {

        nome.textContent = candidato.nome;

        partido.textContent =
            candidato.partido;

        foto.src = candidato.foto;

        foto.style.display = "block";

        mensagem.textContent =
            "concluido";

    }


    else {

        nome.textContent = "";

        partido.textContent = "";

        foto.style.display = "none";

        mensagem.textContent =
            "VOTO NULO";
    }
}



function votoBranco() {

    const visor =
        document.getElementById("numero");

    const nome =
        document.getElementById("nome");

    const partido =
        document.getElementById("partido");

    const foto =
        document.getElementById("foto");

    const mensagem =
        document.getElementById("mensagem");


    visor.textContent = "";

    nome.textContent = "VOTO EM BRANCO";

    partido.textContent = "";

    foto.style.display = "none";

    mensagem.textContent =
        "Você selecionou voto em branco.";
}



function corrigir() {

    limparVoto();
}


function limparVoto() {

    document.getElementById("numero").textContent = "";

    document.getElementById("nome").textContent = "Vote";

    document.getElementById("partido").textContent = "conciente";

    document.getElementById("mensagem").textContent = "";

    document.getElementById("foto").style.display = "none";

    document.getElementById("foto").src = "";
}




function confirmar() {

    const numero =
        document.getElementById("numero").textContent;

    const nome =
        document.getElementById("nome").textContent;

    const mensagem =
        document.getElementById("mensagem");




    if (
        numero === "" &&
        nome !== "VOTO EM BRANCO"
    ) {

        alert("Digite um número ou escolha BRANCO.");

        return;
    }


    let tipoVoto;


   

    if (nome === "VOTO EM BRANCO") {

        tipoVoto = "BRANCO";

    }



    else if (!candidatos[numero]) {

        tipoVoto = "NULO";

    }


    else {

        tipoVoto = candidatos[numero].nome;

    }
    
  

    const votaram =
        JSON.parse(localStorage.getItem("cpfsVotaram")) || [];

    votaram.push(cpfAtual);

    localStorage.setItem(
        "cpfsVotaram",
        JSON.stringify(votaram)
    );

    alert(
        "VOTO CONFIRMADO!\n\n" +
        "Tipo: " + tipoVoto
    );


    document.getElementById("telaUrna").style.display = "none";

    document.getElementById("telaCPF").style.display = "flex";


    document.getElementById("cpf").value = "";

    document.getElementById("mensagemCPF").textContent = "";

    limparVoto();

    cpfAtual = "";
}