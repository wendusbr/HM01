$("#cpf").mask("999.999.999-99");

function CarregarTabela(){
    document.getElementById('tableFuncionarios').innerHTML = '';
    setTimeout(GerarTabela, 10); // Tempo de 10ms para não sobrecarregar o servidor
}

function GerarTabela(){
    $.ajax({
        url: '../app/api/endpoints/GET_geral.php',
        type: 'GET',
        data: {
            table: 'funcionario'
        },

        success: (response) => {
            const dados = JSON.parse(response);
            const tbody = document.getElementById('tableFuncionarios');

            for(var i=0; i<dados.length; i++){
                var row = `<tr id=${i}>`;
                row += `
                    <td>${dados[i]['nome']}</td>
                    <td>${dados[i]['cpf']}</td>
                    <td class="text-end"><button class="btn btn-outline-success" onclick="ColetaDadosLinha(${i})"><i class="bi bi-pencil-square"></i></td>
                    <td class="text-end"><button class="btn btn-outline-danger" onclick="ExcluirTupla(${dados[i]['cpf']})"><i class="bi bi-trash"></i></td>
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
  
        for (var i = 0; i < 2; i++) 
            rowData[i] = cells[i].textContent;

        document.getElementById('editarCpf').value = rowData[1];
        document.getElementById('editarNome').value = rowData[0];

        $('#nav-editar-tab').tab('show'); // Mostrar automaticamente na aba de Edição
    }
}

function ExcluirTupla(chave){
    $.ajax({
        url: '../app/api/endpoints/POST_deletefuncionario.php',
        type: 'POST',
        data: {
            cpf: chave
        }
    })

    CarregarTabela();
}

$(document).ready(function(){
    CarregarTabela();
})

$('#cadastrar').on('submit', function(event){
    event.preventDefault();

    const cpf = document.getElementById('cpf').value;
    const nome = document.getElementById('nome').value;

    $.ajax({
        url: '../app/api/endpoints/POST_funcionario.php',
        type: 'POST',
        data: {
            cpf: cpf,
            nome: nome
        }
    })

    CarregarTabela();
})

$('#editar').on('submit', function(event){
    event.preventDefault();

    const cpf = document.getElementById('editarCpf').value;
    const nome = document.getElementById('editarNome').value;

    $.ajax({
        url: '../app/api/endpoints/POST_updatefuncionario.php',
        type: 'POST',
        data: {
            cpf: cpf,
            nome: nome,
        }
    })

    CarregarTabela();
})

$("#filtroBusca").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#tableFuncionarios tr").each(function () {
      var $row = $(this);
      var $cells = $row.find("td:lt(2)"); // Busca nas 2 primeiras colunas

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