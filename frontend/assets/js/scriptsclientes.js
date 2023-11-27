$("#telefone").mask("(99) 99999-9999");
$("#editarTelefone").mask("(99) 99999-9999");

function CarregarTabela(){
    document.getElementById('tableClientes').innerHTML = '';
    setTimeout(GerarTabela, 10); // Tempo de 10ms para não sobrecarregar o servidor
}

function GerarTabela(){
    $.ajax({
        url: '../app/api/endpoints/GET_geral.php',
        type: 'GET',
        data: {
            table: 'cliente'
        },

        success: (response) => {
            const dados = JSON.parse(response);
            const tbody = document.getElementById('tableClientes');

            for(var i=0; i<dados.length; i++){
                var row = `<tr id=${i}>`;
                row += `
                    <td hidden>${dados[i]['idCliente']}</td>
                    <td>${dados[i]['nome']}</td>
                    <td>${dados[i]['telefone']}</td>
                    <td>${dados[i]['email']}</td>
                    <td class="text-end"><button class="btn btn-outline-success" onclick="ColetaDadosLinha(${i})"><i class="bi bi-pencil-square"></i></td>
                    <td class="text-end"><button class="btn btn-outline-danger" onclick="ExcluirTupla(${dados[i]['idCliente']})"><i class="bi bi-trash"></i></td>
                `;
                row += '</tr>';

                tbody.innerHTML += row;
            }
        }
    })
}

function ColetaDadosLinha(rowId){
    var row = document.getElementById(rowId); // Seleciona a linha com base no ID
  
    if(row){
        var cells = row.getElementsByTagName("td"); // Obtém todas as células da linha
        var rowData = []; // Vetor para armazenar os dados da linha
  
        for (var i = 0; i < 4; i++) 
            rowData[i] = cells[i].textContent;

        document.getElementById('idCliente').value = rowData[0];
        document.getElementById('editarNome').value = rowData[1];
        document.getElementById('editarTelefone').value = rowData[2];
        document.getElementById('editarEmail').value = rowData[3];

        $('#nav-editar-tab').tab('show'); // Mostrar automaticamente na aba de Edição
    }
}

function ExcluirTupla(chave){
    $.ajax({
        url: '../app/api/endpoints/POST_deletecliente.php',
        type: 'POST',
        data: {
            idCliente: chave
        }
    })

    CarregarTabela();
}

$(document).ready(function(){
    CarregarTabela();
})

$('#cadastrar').on('submit', function(event){
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    $.ajax({
        url: '../app/api/endpoints/POST_cliente.php',
        type: 'POST',
        data: {
            nome: nome,
            telefone: telefone,
            email: email
        }
    })

    CarregarTabela();
})

$('#editar').on('submit', function(event){
    event.preventDefault();

    const idCliente = document.getElementById('idCliente').value;
    const nome = document.getElementById('editarNome').value;
    const telefone = document.getElementById('editarTelefone').value;
    const email = document.getElementById('editarEmail').value;

    $.ajax({
        url: '../app/api/endpoints/POST_updatecliente.php',
        type: 'POST',
        data: {
            idCliente: idCliente,
            nome: nome,
            telefone: telefone,
            email: email
        }
    })

    CarregarTabela();
})

$("#filtroBusca").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#tableClientes tr").each(function () {
      var $row = $(this);
      var $cells = $row.find("td:lt(4)"); // Busca nas 4 primeiras colunas

      var rowContainsValue = false;

      $cells.each(function () {
        if ($(this).text().toLowerCase().indexOf(value) > -1) {
          rowContainsValue = true;
          return false; // Saia do loop interno se um valor for encontrado
        }
      });

      $row.toggle(rowContainsValue);
    });
});