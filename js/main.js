let mesExibido = 0;
let anoExibido = 2026;
let grupoSelecionado = null;

function gerarCalendario(grupoParaDestacar, mes, ano) {
    const grade = document.getElementById('calendarioGrade');
    const tituloMes = document.getElementById('mesAtual');
    
    grade.innerHTML = ""; 

    const mesesNomes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
                        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    tituloMes.textContent = `${mesesNomes[mes]} ${ano}`;

    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    diasSemana.forEach(diaNome => {
        const divSemana = document.createElement('div');
        divSemana.classList.add('dia-semana');
        divSemana.textContent = diaNome;
        grade.appendChild(divSemana);
    });

    const primeiroDiaDoMes = new Date(ano, mes, 1).getDay();

    for (let x = 0; x < primeiroDiaDoMes; x++) {
        const divVazia = document.createElement('div');
        divVazia.classList.add('dia-vazio');
        grade.appendChild(divVazia);
    }

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
        }

        if (grupoParaDestacar !== null) {
            if (ehFeriadoGeral(dataFormatada)) {
                divDia.classList.add('dia-feriado');
            } else if (quemFolga === grupoParaDestacar) {
                divDia.classList.add('dia-folga');
            }
        }

        grade.appendChild(divDia);
    }
}

document.getElementById('btnProximo').addEventListener('click', () => {
    if (anoExibido < 2026 || (anoExibido === 2026 && mesExibido < 11)) {
        mesExibido++;
        if (mesExibido > 11) {
            mesExibido = 0;
            anoExibido++;
        }
        gerarCalendario(grupoSelecionado, mesExibido, anoExibido);
    } else {
        mostrarAlerta("", "Não é possível avançar para meses posteriores a Dezembro de 2026!");
    }
});

document.getElementById('btnAnterior').addEventListener('click', () => {
    if (anoExibido > 2026 || (anoExibido === 2026 && mesExibido > 0)) {
        mesExibido--;
        if (mesExibido < 0) {
            mesExibido = 11;
            anoExibido--;
        }
        gerarCalendario(grupoSelecionado, mesExibido, anoExibido);
    } else {
        mostrarAlerta("", "Não é possível voltar para meses anteriores a Janeiro de 2026!");
    }
});

function mostrarAlerta(titulo, mensagem) {
    const toast = document.getElementById('toastAlerta');
    const msgSpan = document.getElementById('toastMensagem');

    msgSpan.textContent = mensagem;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000)
}

document.querySelectorAll('.grupo-card').forEach(card => {
    card.addEventListener('click', () => {
        grupoSelecionado = card.querySelector('h3').textContent;
        
        document.querySelectorAll('.grupo-card').forEach(c => c.classList.remove('ativo'));
        card.classList.add('ativo');
        
        gerarCalendario(grupoSelecionado, mesExibido, anoExibido);
    });
});

window.onload = () => gerarCalendario(grupoSelecionado, mesExibido, anoExibido);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log("Modo Offline Ativado!"))
    .catch(err => console.log("Erro no Offline:", err));
}