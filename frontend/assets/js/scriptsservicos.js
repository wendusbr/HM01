function CarregarTabela(){
    document.getElementById('tableServicos').innerHTML = '';
    setTimeout(GerarTabela, 100); // Tempo de 100ms para não sobrecarregar o servidor
}

function  GerarTabela(){
    $.ajax({
        url: '../app/api/endpoints/GET_geral.php',
        type: 'GET',
        data:{
            table: 'servico'
        },

        success: (response) => {
            const dados = JSON.parse(response);
            const tbody = document.getElementById('tableServicos');

            for(var i=0; i<dados.length; i++){
                var row = `<tr id="${i}">`;

                dados[i]['descricao'] === null ? dados[i]['descricao']='' : false;

                row += `
                    <td hidden>${dados[i]['idServico']}</td>
                    <td>${dados[i]['nome']}</td>
                    <td>${dados[i]['descricao']}</td>
                    <td>${dados[i]['preco']}</td>

                    <td class="text-center">
                        <a role="button" class="acao-editar" onclick="ColetaDadosLinha(${i})"><i class="bi bi-pencil-square"></i></a>
                        <a role="button" class="acao-excluir" onclick="ExcluirTupla(${dados[i]['idServico']})"><i class="bi bi-trash"></i></a>
                    </td>
                `
                row += '</row>';

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

        document.getElementById('idServico').value = rowData[0];
        document.getElementById('editarNome').value = rowData[1];
        document.getElementById('editarDescricao').value = rowData[2];
        document.getElementById('editarPreco').value = rowData[3];

        $('#modalEditarServico').modal('show');
    }
}

function ExcluirTupla(chave){
    window.sessionStorage.setItem('chave', chave);

    $('#modalConfirmacao').modal('show');
}

$(document).ready(function(){
    CarregarTabela();
})

$('#cadastrar').on('submit', function(event){
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preco = document.getElementById('preco').value;

    $.ajax({
        url: '../app/api/endpoints/POST_servico.php',
        type: 'POST',
        data: {
            nome: nome,
            descricao: descricao,
            preco: preco
        }
    })

    $('#modalNovoServico').modal('hide');
    $('#nome').val('');
    $('#descricao').val('');
    $('#preco').val('');
    CarregarTabela();
})

$('#editar').on('submit', function(event){
    event.preventDefault();

    const idServico = document.getElementById('idServico').value;
    const nome = document.getElementById('editarNome').value;
    const descricao = document.getElementById('editarDescricao').value;
    const preco = document.getElementById('editarPreco').value;

    $.ajax({
        url: '../app/api/endpoints/POST_updateservico.php',
        type: 'POST',
        data: {
            idServico: idServico,
            nome: nome,
            descricao: descricao,
            preco: preco
        }
    })

    $('#modalEditarServico').modal('hide');
    CarregarTabela();
})

$('#excluir').on('click', function(event){
    event.preventDefault();
    const chave = window.sessionStorage.getItem('chave');

    $.ajax({
        url: '../app/api/endpoints/POST_deleteservico.php',
        type: 'POST',
        data: {
            idServico: chave
        }
    })

    CarregarTabela();
    $('#modalConfirmacao').modal('hide');
})

$("#filtroBusca").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#tableServicos tr").each(function () {
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

$('#novoServico').on('click', function(event){
    event.preventDefault();

    $('#modalNovoServico').modal('show');
})