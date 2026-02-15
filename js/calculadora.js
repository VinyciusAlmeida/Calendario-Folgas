const DATA_BASE = new Date('2026-02-01T00:00:00');

function calcularPosicaoNoCiclo(dataEscolhida) {
    const dataConsulta = new Date(dataEscolhida + 'T00:00:00');

    const diferencaTempo = dataConsulta - DATA_BASE;
    const diferencaDias = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));

    let posicao = diferencaDias % 8;

    if (posicao < 0) {
        posicao += 8
    }

    return posicao;
}

function verificarQuemFolga(posicao) {
    if (posicao === 0 || posicao === 1) return "Grupo 4";
    if (posicao === 2 || posicao === 3) return "Grupo 3";
    if (posicao === 4 || posicao === 5) return "Grupo 2";
    if (posicao === 6 || posicao === 7) return "Grupo 1";

    return "Ninguém";
}