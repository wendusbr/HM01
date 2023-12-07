// import{
//     fetchFuncionarios,
//     fetchClientes,
//     fetchServicos
// }from "/assets/js/modules/fetchers";

function fetchFuncionarios(){
    $.ajax({
        url: '../app/api/endpoints/GET_geral.php',
        type: 'GET',
        data: {
            table: 'funcionario'
        },

        success: (response) => {
            const dados = JSON.parse(response);
            var select = document.getElementById('selectFuncionarios');

            select.innerHTML = '<option selected>Selecione um funcionário...</option>';
            for(var i=0; i<dados.length; i++){
                var option = `<option value="${dados[i]['cpf']}">${dados[i]['nome']}</option>`

                select.innerHTML += option;
            }
        }
    })
}

function fetchClientes(){
    $.ajax({
        url: '../app/api/endpoints/GET_geral.php',
        type: 'GET',
        data: {
            table: 'cliente'
        },

        success: (response) => {
            const dados = JSON.parse(response);
            var select = document.getElementById('selectClientes');

            select.innerHTML = '<option selected>Selecione um cliente...</option>';
            for(var i=0; i<dados.length; i++){
                var option = `<option value="${dados[i]['idCliente']}">${dados[i]['nome']}</option>`

                select.innerHTML += option;
            }
        }
    })
}

function fetchServicos(){
    $.ajax({
        url: '../app/api/endpoints/GET_geral.php',
        type: 'GET',
        data: {
            table: 'servico'
        },

        success: (response) => {
            const dados = JSON.parse(response);
            var select = document.getElementById('selectServicos');

            select.innerHTML = '<option selected>Selecione um serviço...</option>';
            for(var i=0; i<dados.length; i++){
                var option = `<option value="${dados[i]['idServico']}">${dados[i]['nome']}</option>`

                select.innerHTML += option;
            }
        }
    })
}

function fetchHoras(){
    var hora = 9;
    var minuto = 0;
    select = document.getElementById('selectHoras');

    select.innerHTML = '<option selected>Selecione um horário...</option>'
    while(hora < 20 || minuto==0){
        // Adaptação para formato de hora
        if(hora<10 && minuto==0)
            select.innerHTML += `<option value="0${hora}:0${minuto}">0${hora}:0${minuto}</option`;
        else if(hora < 10)
            select.innerHTML += `<option value="0${hora}:${minuto}">0${hora}:${minuto}</option`;
        else if(minuto==0)
            select.innerHTML += `<option value="${hora}:0${minuto}">${hora}:0${minuto}</option`;
        else
            select.innerHTML += `<option value="${hora}:${minuto}">${hora}:${minuto}</option`;

        if(minuto==30){
            minuto = 0;
            hora++;
        }
        else
            minuto = 30;
    }
}

function CarregarTabela(){
    document.getElementById('tableAgendamentos').innerHTML = '';
    setTimeout(GerarTabela, 100); // Tempo de 100ms para não sobrecarregar o servidor
}

function GerarTabela(){
    $.ajax({
        url: '../app/api/endpoints/GET_agendamento.php',
        type: 'GET',
        data: {
            table:'agendamento'
        },

        success: (response) => {
            const dados = JSON.parse(response);
            const tbody = document.getElementById('tableAgendamentos');
            for(var i=0; i<dados.length; i++){
                var row = `<tr id="${i}">`;

                dados[i]['status']=='1' ? dados[i]['status'] = 'Sim' : dados[i]['status'] = 'Não';
                dados[i]['pago']=='1' ? dados[i]['pago'] = 'Sim' : dados[i]['pago'] = 'Não';
                row += `
                    <td>${dados[i]['data']}</td>
                    <td>${dados[i]['hora']}</td>
                    <td hidden>${dados[i]['cpf']}</td>
                    <td>${dados[i]['nomeFuncionario']}</td>
                    <td>${dados[i]['nomeCliente']}</td>
                    <td>${dados[i]['nomeServico']}</td>
                    <td>${dados[i]['status']}</td>
                    <td>${dados[i]['pago']}</td>

                    <td class="text-center">
                        <a role="button" class="acao-editar" onclick="ColetaDadosLinha(${i})"><i class="bi bi-pencil-square"></i></a>
                        <a role="button" class="acao-excluir" onclick="ExcluirTupla('${dados[i]['data']}', '${dados[i]['hora']}', '${dados[i]['cpf']}')"><i class="bi bi-trash"></i></a>
                    </td>
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
  
        for (var i = 0; i < 8; i++) 
            rowData[i] = cells[i].textContent;

        document.getElementById('editarData').value = rowData[0];
        document.getElementById('editarHora').value = rowData[1];
        document.getElementById('editarCpf').value = rowData[2];
        document.getElementById('editarNomeCliente').value = rowData[3];
        document.getElementById('editarFuncionario').value = rowData[4];
        document.getElementById('editarServico').value = rowData[5];

        rowData[6]=='Sim' ? document.getElementById('status').checked = true : document.getElementById('status').checked = false;
        rowData[7]=='Sim' ? document.getElementById('pago').checked = true : document.getElementById('pago').checked = false;

        $('#modalEditarAgendamento').modal('show');
    }
}

function ExcluirTupla(data, hora, cpf){
    $.ajax({
        url: '../app/api/endpoints/POST_deleteagendamento.php',
        type: 'POST',
        data: {
            data: data,
            hora: hora,
            cpf: cpf
        }
    })

    CarregarTabela();
}

$(document).ready(function(){
    CarregarTabela();
    fetchFuncionarios();
    fetchClientes();
    fetchServicos();
    fetchHoras();
})

$('#cadastrar').on('submit', function(event){
    event.preventDefault();

    const data = document.getElementById('data').value;
    const hora = document.getElementById('selectHoras').value;
    const cpf = document.getElementById('selectFuncionarios').value;
    const idCliente = document.getElementById('selectClientes').value;
    const idServico = document.getElementById('selectServicos').value;

    $.ajax({
        url: '../app/api/endpoints/POST_agendamento.php',
        type: 'POST',
        data: {
            data: data,
            hora: hora,
            cpf: cpf,
            idCliente: idCliente,
            idServico: idServico
        }
    })

    CarregarTabela();
})

$('#editar').on('submit', function(event){
    event.preventDefault();

    const data = document.getElementById('editarData').value;
    const hora = document.getElementById('editarHora').value;
    const cpf = document.getElementById('editarCpf').value;
    const status = document.getElementById('status').checked;
    const pago = document.getElementById('pago').checked;

    $.ajax({
        url: '../app/api/endpoints/POST_updateagendamento.php',
        type: 'POST',
        data: {
            data: data,
            hora: hora,
            cpf: cpf,
            status: status,
            pago: pago
        }
    })

    $('#modalEditarAgendamento').modal('hide');
    CarregarTabela();
})