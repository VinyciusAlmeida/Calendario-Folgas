
let mesExibido = 1;
let anoExibido = 2026;
let grupoSelecionado = "Grupo 4";

function gerarCalendario(grupoParaDestacar, mes, ano) {
    const grade = document.getElementById('calendarioGrade');
    const tituloMes = document.getElementById('mesAtual');
    
    grade.innerHTML = ""; 

    const mesesNomes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
                        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    tituloMes.textContent = `${mesesNomes[mes]} ${ano}`;

    const ultimoDiaDoMes = new Date(ano, mes + 1, 0).getDate();

    for (let dia = 1; dia <= ultimoDiaDoMes; dia++) {
        const dataFormatada = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        
        const posicao = calcularPosicaoNoCiclo(dataFormatada);
        const quemFolga = verificarQuemFolga(posicao);

        const divDia = document.createElement('div');
        divDia.classList.add('dia');
        divDia.textContent = dia;

        if (ehFeriadoGeral(dataFormatada)) {
            divDia.classList.add('dia-feriado');
        } else if (quemFolga === grupoParaDestacar) {
            divDia.classList.add('dia-folga');
        }

        grade.appendChild(divDia);
    }
}

document.getElementById('btnProximo').addEventListener('click', () => {
    mesExibido++;
    if (mesExibido > 11) {
        mesExibido = 0;
        anoExibido++;
    }
    gerarCalendario(grupoSelecionado, mesExibido, anoExibido);
});

document.getElementById('btnAnterior').addEventListener('click', () => {
    mesExibido--;
    if (mesExibido < 0) {
        mesExibido = 11;
        anoExibido--;
    }
    gerarCalendario(grupoSelecionado, mesExibido, anoExibido);
});

document.querySelectorAll('.grupo-card').forEach(card => {
    card.addEventListener('click', () => {
        grupoSelecionado = card.querySelector('h3').textContent;
        gerarCalendario(grupoSelecionado, mesExibido, anoExibido);
        
        document.querySelectorAll('.grupo-card').forEach(c => c.classList.remove('folga-hoje'));
        card.classList.add('folga-hoje');
    });
});

window.onload = () => gerarCalendario(grupoSelecionado, mesExibido, anoExibido);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log("Modo Offline Ativado!"))
    .catch(err => console.log("Erro no Offline:", err));
}