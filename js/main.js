let mesExibido = new Date().getMonth();
let anoExibido = 2026;
let grupoSelecionado = null;

function gerarCalendario(grupoParaDestacar, mes, ano) {
    const grade = document.getElementById('calendarioGrade');
    const tituloMes = document.getElementById('mesAtual');
    
    const fragmento = document.createDocumentFragment();
    grade.innerHTML = ""; 

    const mesesNomes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
                        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    tituloMes.textContent = `${mesesNomes[mes]} ${ano}`;

    ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].forEach(diaNome => {
        const div = document.createElement('div');
        div.className = 'dia-semana';
        div.textContent = diaNome;
        fragmento.appendChild(div);
    });

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();

    for (let x = 0; x < primeiroDia; x++) {
        const div = document.createElement('div');
        div.className = 'dia-vazio';
        fragmento.appendChild(div);
    }

    for (let dia = 1; dia <= ultimoDia; dia++) {
        const dataFormatada = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        const isFeriado = ehFeriadoGeral(dataFormatada);
        
        const divDia = document.createElement('div');
        divDia.className = 'dia';
        divDia.textContent = dia;

        if (isFeriado) {
            divDia.classList.add('dia-feriado');
        } else if (grupoParaDestacar) {
            const posicao = calcularPosicaoNoCiclo(dataFormatada);
            if (verificarQuemFolga(posicao) === grupoParaDestacar) {
                divDia.classList.add('dia-folga');
            }
        }
        fragmento.appendChild(divDia);
    }
    grade.appendChild(fragmento);
}

document.getElementById('btnProximo').addEventListener('click', () => {
    if (anoExibido === 2026 && mesExibido === 11) {
        mostrarAlerta("Ano não disponível!");
    } else {
        mesExibido++;
        if (mesExibido > 11) { mesExibido = 0; anoExibido++; }
        gerarCalendario(grupoSelecionado, mesExibido, anoExibido);
    }
});

document.getElementById('btnAnterior').addEventListener('click', () => {
    if (anoExibido === 2026 && mesExibido === 0) {
        mostrarAlerta("Início de 2026!");
    } else {
        mesExibido--;
        if (mesExibido < 0) { mesExibido = 11; anoExibido--; }
        gerarCalendario(grupoSelecionado, mesExibido, anoExibido);
    }
});

function mostrarAlerta(mensagem) {
    const toast = document.getElementById('toastAlerta');
    document.getElementById('toastMensagem').textContent = mensagem;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
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

window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log("SW Ativo!"))
            .catch(err => console.error("Erro no SW:", err));
    }
});