const inputData = document.getElementById('dataInput');
const botao = document.getElementById('btnVerificar');

// 1. VERIFICAR DIA ESPECÍFICO
botao.addEventListener('click', () => {
    const dataValida = inputData.value;
    if (!dataValida) {
        alert("Por favor, insira uma data!");
        return;
    }

    const posicao = calcularPosicaoNoCiclo(dataValida);
    const grupoDeFolga = verificarQuemFolga(posicao);

    // Limpa os cards
    document.querySelectorAll('.grupo-card').forEach(card => {
        card.classList.remove('folga-hoje');
        card.querySelector('.status').textContent = "Trabalhando";
    });

    // Mapeia o que vem da calculadora para o ID do HTML
    const idMapeado = {
        "Grupo A": "grupo-1",
        "Grupo B": "grupo-2",
        "Grupo C": "grupo-3",
        "Grupo D": "grupo-4"
    };

    const cardFolga = document.getElementById(idMapeado[grupoDeFolga]);
    if (cardFolga) {
        cardFolga.classList.add('folga-hoje');
        cardFolga.querySelector('.status').textContent = "FOLGA !";
        // Quando verifica o dia, já gera o calendário desse grupo automaticamente!
        gerarCalendario(cardFolga.querySelector('h3').textContent);
    }
});

// 2. FUNÇÃO ÚNICA PARA GERAR O CALENDÁRIO
function gerarCalendario(grupoParaDestacar) {
    const grade = document.getElementById('calendarioGrade');
    if (!grade) return;

    grade.innerHTML = ""; 

    const ano = 2026;
    const mes = 1; // Fevereiro

    for (let dia = 1; dia <= 28; dia++) {
        const dataFormatada = `2026-02-${dia.toString().padStart(2, '0')}`;
        
        const posicao = calcularPosicaoNoCiclo(dataFormatada);
        const quemFolga = verificarQuemFolga(posicao);

        const divDia = document.createElement('div');
        divDia.classList.add('dia'); // 'dia' minúsculo igual ao CSS
        divDia.textContent = dia;

        if (quemFolga === grupoParaDestacar) {
            divDia.classList.add('dia-folga');
        }

        grade.appendChild(divDia);
    }
}

// 3. FAZ OS CARDS SEREM CLICÁVEIS
document.querySelectorAll('.grupo-card').forEach(card => {
    card.style.cursor = "pointer";
    card.addEventListener('click', () => {
        const nomeGrupo = card.querySelector('h3').textContent; 
        
        // Destaque visual
        document.querySelectorAll('.grupo-card').forEach(c => c.classList.remove('folga-hoje'));
        card.classList.add('folga-hoje');

        gerarCalendario(nomeGrupo);
    });
});

// Inicializa o calendário com o Grupo 4 (que você disse que folga dia 01)
window.onload = () => gerarCalendario("Grupo 4");