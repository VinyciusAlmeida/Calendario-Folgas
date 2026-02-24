const MESES_NOMES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
let mesExibido = new Date().getMonth();
let anoExibido = 2026;
let grupoSelecionado = null;
const grade = document.getElementById('calendarioGrade');
const tituloMes = document.getElementById('mesAtual');
function gerarCalendario(grupoParaDestacar, mes, ano) {
    const fragmento = document.createDocumentFragment();
    grade.innerHTML = ""; 
    tituloMes.textContent = `${MESES_NOMES[mes]} ${ano}`;
    DIAS_SEMANA.forEach(diaNome => {
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
        const mesFormatado = mes < 9 ? `0${mes + 1}` : mes + 1;
        const diaFormatado = dia < 10 ? `0${dia}` : dia;
        const dataFormatada = `${ano}-${mesFormatado}-${diaFormatado}`;
        const divDia = document.createElement('div');
        divDia.className = 'dia';
        divDia.textContent = dia;
        const hoje = new Date();
        if (dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()) {
            divDia.classList.add('dia-hoje');
        }
        if (ehFeriadoGeral(dataFormatada)) {
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
    const msgSpan = document.getElementById('toastMensagem');
    if (!toast || !msgSpan) return;
    
    msgSpan.textContent = mensagem;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}
document.querySelectorAll('.grupo-card').forEach(card => {
    card.addEventListener('click', () => {
        const h3 = card.querySelector('h3');
        if (!h3) return;
        grupoSelecionado = h3.textContent;
        document.querySelectorAll('.grupo-card').forEach(c => c.classList.remove('ativo'));
        card.classList.add('ativo');
        gerarCalendario(grupoSelecionado, mesExibido, anoExibido);
    });
});
window.addEventListener('DOMContentLoaded', () => {
    gerarCalendario(grupoSelecionado, mesExibido, anoExibido);
});
window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
});