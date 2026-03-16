let mesExibido = new Date().getMonth();
let anoExibido = 2026;
let grupoSelecionado = null;

const MESES_NOMES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const grade = document.getElementById('calendarioGrade');
const tituloMes = document.getElementById('mesAtual');
const setorNomeSpan = document.getElementById('setorNome');
const CONFIG_SETORES = {
    producao: ["Grupo 1", "Grupo 2", "Grupo 3", "Grupo 4"],
    manutencao: ["D1", "D2"],
    eletrica: ["N1", "N2"]
};

function gerarCalendario(grupoParaDestacar, mes, ano) {
    if (!grade) return;
    grade.innerHTML = ""; 
    tituloMes.textContent = `${MESES_NOMES[mes]} ${ano}`;

    DIAS_SEMANA.forEach(diaNome => {
        const div = document.createElement('div');
        div.className = 'dia-semana';
        div.textContent = diaNome;
        grade.appendChild(div);
    });

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();

    for (let x = 0; x < primeiroDia; x++) {
        const div = document.createElement('div');
        div.className = 'dia-vazio';
        grade.appendChild(div);
    }
    
    const botaoAtivo = document.querySelector('.nav-btn.ativo');
    const setorAtivo = botaoAtivo ? botaoAtivo.dataset.area : 'producao';

    for (let dia = 1; dia <= ultimoDia; dia++) {
        const m = (mes + 1).toString().padStart(2, '0');
        const d = dia.toString().padStart(2, '0');
        const dataFormatada = `${ano}-${m}-${d}`;
        
        const divDia = document.createElement('div');
        divDia.className = 'dia';
        divDia.textContent = dia;
        
        const hoje = new Date();
        if (dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()) {
            divDia.classList.add('dia-hoje');
        }

        let temFolga = false;
        let ehFeriadoVisual = false;

       if (setorAtivo === 'producao') {
            if (ehFeriadoProducao(dataFormatada)) {
                temFolga = true; 
                ehFeriadoVisual = true;
            } else if (grupoParaDestacar) {
                const pos = calcularPosicaoProducao(dataFormatada);
                if (verificarQuemFolgaProd(pos) === grupoParaDestacar) temFolga = true;
            }
        } 
        else if (setorAtivo === 'manutencao') {
            if (ehFeriadoGeral(dataFormatada)) ehFeriadoVisual = true;
            if (grupoParaDestacar) {
                temFolga = verificarFolgaManutencao(dataFormatada, grupoParaDestacar);
            }
        } 
        else if (setorAtivo === 'eletrica') {
            if (grupoParaDestacar) {
                temFolga = verificarFolgaEletrica(dataFormatada, grupoParaDestacar);
            }
        }

        if (temFolga) divDia.classList.add('dia-folga');
        if (ehFeriadoVisual) divDia.classList.add('dia-feriado');

        grade.appendChild(divDia);
    }
}

function renderizarBotoesGrupo(setor) {
    const container = document.getElementById('containerGrupos');
    if (!container) return;
    container.innerHTML = "";
    (CONFIG_SETORES[setor] || []).forEach(nome => {
        const card = document.createElement('div');
        card.className = 'grupo-card';
        if (grupoSelecionado === nome) card.classList.add('ativo');
        card.innerHTML = `<h3>${nome}</h3>`;
        card.onclick = () => {
            grupoSelecionado = nome;
            document.querySelectorAll('.grupo-card').forEach(c => c.classList.remove('ativo'));
            card.classList.add('ativo');
            gerarCalendario(grupoSelecionado, mesExibido, anoExibido);
        };
        container.appendChild(card);
    });
}

document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('ativo'));
        btn.classList.add('ativo');
        if (setorNomeSpan) setorNomeSpan.textContent = btn.textContent;
        grupoSelecionado = null;
        renderizarBotoesGrupo(btn.dataset.area);
        gerarCalendario(null, mesExibido, anoExibido);
    };
});

document.getElementById('btnProximo').onclick = () => {
    if (anoExibido === 2026 &&mesExibido === 8) {
        mostrarAlerta("Calendário disponível apenas até Setembro de 2026!");
        return;
    }

    mesExibido++;
    if (mesExibido > 11) {
        mesExibido = 0;
        anoExibido++;
    }
    gerarCalendario(grupoSelecionado, mesExibido, anoExibido);
};

document.getElementById('btnAnterior').onclick = () => {
    if (anoExibido === 2026 && mesExibido === 0) {
        mostrarAlerta("Inicio do calendário em Janeiro de 2026!");
        return;
    }

    mesExibido--;
    if (mesExibido < 0) {
        mesExibido = 11; 
        anoExibido--; }
    gerarCalendario(grupoSelecionado, mesExibido, anoExibido);
};

window.onload = () => {
    renderizarBotoesGrupo('producao');
    gerarCalendario(null, mesExibido, anoExibido);
};