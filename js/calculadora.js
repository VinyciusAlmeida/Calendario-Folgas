const DATA_BASE_PROD = new Date('2026-01-08T00:00:00').getTime();
const DATA_BASE_MANUT = new Date('2026-01-04T00:00:00').getTime(); 
const DATA_BASE_ELETRICA = new Date('2026-01-01T00:00:00').getTime();

const FERIADOS_PROD = [
    "2026-01-01", "2026-04-03", "2026-05-01", "2026-09-07", 
    "2026-10-12", "2026-11-02", "2026-12-25"
];
const FERIADOS_PROD_TS = FERIADOS_PROD.map(f => new Date(f + 'T00:00:00').getTime());

const FERIADOS_MANUT = [
    "2026-01-01", "2026-02-17", "2026-04-03", "2026-04-21", 
    "2026-05-01", "2026-06-04", "2026-09-07", "2026-10-12", 
    "2026-11-02", "2026-11-15", "2026-11-20", "2026-12-25"
];
const FERIADOS_MANUT_TS = FERIADOS_MANUT.map(f => new Date(f + 'T00:00:00').getTime());

function ehFeriadoGeral(dataString) {
    return FERIADOS_MANUT.includes(dataString);
}

function ehFeriadoProducao(dataString) {
    return FERIADOS_PROD.includes(dataString);
}

function calcularPosicaoProducao(dataEscolhida) {
    const dataConsultaTS = new Date(dataEscolhida + 'T00:00:00').getTime();
    const diferencaDiasTotal = Math.floor((dataConsultaTS - DATA_BASE_PROD) / 86400000);
    const feriadosPassados = FERIADOS_PROD_TS.filter(fTS => fTS >= DATA_BASE_PROD && fTS < dataConsultaTS).length;
    let posicao = (diferencaDiasTotal - feriadosPassados) % 8;
    if (posicao < 0) posicao += 8;
    return posicao;
}

function verificarQuemFolgaProd(posicao) {
    const grupos = ["Grupo 4", "Grupo 4", "Grupo 3", "Grupo 3", "Grupo 2", "Grupo 2", "Grupo 1", "Grupo 1"];
    return grupos[posicao] || "Ninguém";
}

function verificarFolgaManutencao(dataEscolhida, grupo) {
    const dataObj = new Date(dataEscolhida + 'T00:00:00');
    const dataTS = dataObj.getTime();
    const diaSemana = dataObj.getDay(); 
    if (FERIADOS_MANUT_TS.includes(dataTS)) return true;
    const semanasDesdeBase = Math.floor((dataTS - DATA_BASE_MANUT) / (86400000 * 7));
    const isSemanaA = semanasDesdeBase % 2 === 0;
    if (grupo === "D1") {
        if (diaSemana === 0) return true; 
        if (isSemanaA && diaSemana === 6) return true; 
        if (!isSemanaA && diaSemana === 1) return true; 
    } else if (grupo === "D2") {
        if (diaSemana === 0) return true;
        if (!isSemanaA && diaSemana === 6) return true; 
        if (isSemanaA && diaSemana === 1) return true; 
    }
    return false;
}

function verificarFolgaEletrica(dataEscolhida, grupo) {
    const dataObj = new Date(dataEscolhida + 'T00:00:00');
    const dataTS = dataObj.getTime();

    const diferencaDias = Math.floor((dataTS - DATA_BASE_ELETRICA) / 86400000);
    const resto = Math.abs(diferencaDias % 2);

    if (grupo === "N1") {
        return resto === 1;
    } else if (grupo === "N2") {
        return resto === 0;
    }
    return false;
}