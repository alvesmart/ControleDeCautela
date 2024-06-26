// Função para salvar a cautela no localStorage
document.getElementById('cautelaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nomePessoa = document.getElementById('nomePessoa').value;
    const nomeMaterial = document.getElementById('nomeMaterial').value;
    const quantidade = document.getElementById('quantidade').value;
    const dataCautela = document.getElementById('dataCautela').value;

    const newCautela = {
        id: Date.now(),
        nomePessoa,
        nomeMaterial,
        quantidade,
        dataCautela
    };

    let cautelas = JSON.parse(localStorage.getItem('cautelas')) || [];
    cautelas.push(newCautela);
    localStorage.setItem('cautelas', JSON.stringify(cautelas));

    updateCautelaTable();
    document.getElementById('cautelaForm').reset();
});

// Função para adicionar uma linha de cautela na tabela
function addCautelaToTable(cautela) {
    const tbody = document.querySelector('#cautelaTable tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${cautela.nomePessoa}</td>
        <td>${cautela.nomeMaterial}</td>
        <td>${cautela.quantidade}</td>
        <td>${formatDate(cautela.dataCautela)}</td>
        <td><button onclick="removeCautela(${cautela.id})">Remover</button></td>
    `;

    tbody.appendChild(row);
}

// Função para formatar a data no formato dd/mm/yyyy
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Função para atualizar a lista de cautelas na tabela
function updateCautelaTable() {
    const tbody = document.querySelector('#cautelaTable tbody');
    tbody.innerHTML = '';

    let cautelas = JSON.parse(localStorage.getItem('cautelas')) || [];
    cautelas.forEach(cautela => addCautelaToTable(cautela));
}

// Função para remover uma cautela do localStorage e atualizar a tabela
function removeCautela(id) {
    let cautelas = JSON.parse(localStorage.getItem('cautelas')) || [];
    cautelas = cautelas.filter(cautela => cautela.id !== id);
    localStorage.setItem('cautelas', JSON.stringify(cautelas));

    updateCautelaTable();
}

// Carrega as cautelas armazenadas ao carregar a página
window.onload = function() {
    updateCautelaTable();
};

// Configura a função de impressão
document.getElementById('imprimirBtn').addEventListener('click', function() {
    const printContents = document.querySelector('#cautelaTable').outerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = `
        <html>
            <head>
                <title>Imprimir Lista</title>
                <style>
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: center;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                ${printContents}
            </body>
        </html>
    `;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
});