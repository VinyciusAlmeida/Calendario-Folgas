const DATA_BASE = new Date('2026-01-08T00:00:00');

const FOLGAS_GERAIS = [
    // --- Feriados Fixos (Todo ano) ---
    "01-01", // Ano Novo
    "05-01", // Dia do Trabalho
    "09-07", // Independência do Brasil
    "12-25", // Natal
    "11-05",
    
    // --- Datas Específicas (Variáveis ou Únicas) ---
    "2026-04-03", // Sexta-feira da Paixão 2026
    "2026-10-04", // Eleições 2026 (1º Turno)
];

function ehFeriadoGeral(dataString) {
    const dataApenasMesDia = dataString.substring(5); 

    return FOLGAS_GERAIS.includes(dataString) || FOLGAS_GERAIS.includes(dataApenasMesDia);
}

function calcularPosicaoNoCiclo(dataEscolhida) {
    const dataConsulta = new Date(dataEscolhida + 'T00:00:00');
    const diferencaTempo = dataConsulta - DATA_BASE;
    let diferencaDias = Math.floor(diferencaTempo / (1000 * 60 * 60 * 24));

    let deslocamento = 0;
    
    let dataLoop = new Date(DATA_BASE);
    while (dataLoop < dataConsulta) {
        const ano = dataLoop.getFullYear();
        const mes = String(dataLoop.getMonth() + 1).padStart(2, '0');
        const dia = String(dataLoop.getDate()).padStart(2, '0');
        const strDataLoop = `${ano}-${mes}-${dia}`;

        if (ehFeriadoGeral(strDataLoop)) {
            deslocamento++;
        }
        dataLoop.setDate(dataLoop.getDate() + 1);
    }

    let posicao = (diferencaDias - deslocamento) % 8;
    if (posicao < 0) posicao += 8;

    return posicao;
}

function verificarQuemFolga(posicao) {
    if (posicao === 0 || posicao === 1) return "Grupo 4";
    if (posicao === 2 || posicao === 3) return "Grupo 3";
    if (posicao === 4 || posicao === 5) return "Grupo 2";
    if (posicao === 6 || posicao === 7) return "Grupo 1";

    return "Ninguém";
}