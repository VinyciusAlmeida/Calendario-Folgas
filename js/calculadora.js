const DATA_BASE = new Date('2026-01-08T00:00:00');

const FERIADOS_2026 = [
    "2026-01-01", "2026-04-03", "2026-05-01", "2026-07-09", 
    "2026-10-04", "2026-11-05", "2026-12-25"
];

function ehFeriadoGeral(dataString) {
    return FERIADOS_2026.includes(dataString);
}

function calcularPosicaoNoCiclo(dataEscolhida) {
    const dataConsulta = new Date(dataEscolhida + 'T00:00:00');
    const diferencaTempo = dataConsulta - DATA_BASE;
    const diferencaDiasTotal = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));
    
    const feriadosPassados = FERIADOS_2026.filter(feriado => {
        const dFeriado = new Date(feriado + 'T00:00:00');
        return dFeriado >= DATA_BASE && dFeriado < dataConsulta;
    }).length;

    let posicao = (diferencaDiasTotal - feriadosPassados) % 8;
    if (posicao < 0) posicao += 8;

    return posicao;
}

function verificarQuemFolga(posicao) {
    const grupos = {
        0: "Grupo 4", 1: "Grupo 4",
        2: "Grupo 3", 3: "Grupo 3",
        4: "Grupo 2", 5: "Grupo 2",
        6: "Grupo 1", 7: "Grupo 1"
    };
    return grupos[posicao] || "Ninguém";
}