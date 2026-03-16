
const LISTA_INFO_FERIADOS = [
    { data: "01/01", mes: 0, nome: "Confraternização Universal", tipo: "Geral" },
    { data: "17/02", mes: 1, nome: "Carnaval", tipo: "Manutenção" },
    { data: "03/04", mes: 3, nome: "Paixão de Cristo", tipo: "Geral" },
    { data: "21/04", mes: 3, nome: "Tiradentes", tipo: "Manutenção" },
    { data: "05/04", mes: 3, nome: "Páscoa", tipo: "Manutenção" },
    { data: "01/05", mes: 4, nome: "Dia do Trabalho", tipo: "Geral" },
    { data: "04/06", mes: 5, nome: "Corpus Christi", tipo: "Manutenção" },
    { data: "09/07", mes: 6, nome: "Carta Magna do Estado de S.Paulo", tipo: "Manutenção" },
    { data: "07/09", mes: 8, nome: "Independência do Brasil", tipo: "Geral" },
    { data: "12/10", mes: 9, nome: "N.S.Aparecida", tipo: "Manutenção" },
    { data: "02/11", mes: 10, nome: "Finados", tipo: "Manutenção" },
    { data: "05/11", mes: 10, nome: "Aniversário da Cidade", tipo: "Geral" },
    { data: "15/11", mes: 10, nome: "Proclamação da República", tipo: "Manutenção" },
    { data: "20/11", mes: 10, nome: "Consciência Negra", tipo: "Manutenção" },
    { data: "25/12", mes: 11, nome: "Natal", tipo: "Geral" }
];

function renderizarTabelaFeriados(mesAtual) {
    const corpoTabela = document.getElementById('corpoTabelaFeriados');
    const container = document.querySelector('.feriados-container');
    if (!corpoTabela) return;

    const feriadosDoMes = LISTA_INFO_FERIADOS.filter(f => f.mes === mesAtual);

    if (feriadosDoMes.length === 0) {
        container.style.display = "none"; 
        return;
    }

    container.style.display = "block";
    corpoTabela.innerHTML = feriadosDoMes.map(f => `
        <tr>
            <td><strong>${f.data}</strong></td>
            <td>${f.nome}</td>
            <td><span class="tag-setor ${f.tipo === 'Geral' ? 'geral' : 'especifico'}">${f.tipo}</span></td>
        </tr>
    `).join('');
}