const DATA_BASE_OBJ = new Date('2026-01-08T00:00:00');
const DATA_BASE_TS = DATA_BASE_OBJ.getTime();
const FERIADOS_2026 = [
    "2026-01-01", "2026-04-03", "2026-05-01", "2026-09-07", 
    "2026-10-04", "2026-11-05", "2026-12-25"
];
const FERIADOS_TS = FERIADOS_2026.map(f => new Date(f + 'T00:00:00').getTime());
function ehFeriadoGeral(dataString) {
    return FERIADOS_2026.includes(dataString);
}
function calcularPosicaoNoCiclo(dataEscolhida) {
    const dataConsultaTS = new Date(dataEscolhida + 'T00:00:00').getTime();
    const diferencaDiasTotal = Math.floor((dataConsultaTS - DATA_BASE_TS) / 86400000);
    const feriadosPassados = FERIADOS_TS.filter(fTS => 
        fTS >= DATA_BASE_TS && fTS < dataConsultaTS
    ).length;
    let posicao = (diferencaDiasTotal - feriadosPassados) % 8;
    if (posicao < 0) posicao += 8;
    return posicao;
}
function verificarQuemFolga(posicao) {
    const grupos = ["Grupo 4", "Grupo 4", "Grupo 3", "Grupo 3", "Grupo 2", "Grupo 2", "Grupo 1", "Grupo 1"];
    return grupos[posicao] || "Ninguém";
}