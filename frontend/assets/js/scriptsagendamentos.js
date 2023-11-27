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

function MudaStatus(data, hora, cpf, checkBoxId){
    const status = document.getElementById(checkBoxId).checked;

    $.ajax({
        url: '../app/api/endpoints/POST_updateagendamentostatus.php',
        type: 'POST',
        data: {
            data: data,
            hora: hora,
            cpf: cpf,
            status: status
        }
    })
}

function MudaPago(data, hora, cpf, checkBoxId){
    const pago = document.getElementById(checkBoxId).checked;

    $.ajax({
        url: '../app/api/endpoints/POST_updateagendamentopago.php',
        type: 'POST',
        data: {
            data: data,
            hora: hora,
            cpf: cpf,
            pago: pago
        }
    })
}

function CarregarTabela(){
    document.getElementById('tableAgendamentos').innerHTML = '';
    setTimeout(GerarTabela, 10); // Tempo de 10ms para não sobrecarregar o servidor
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

                row += `
                    <td>${dados[i]['data']}</td>
                    <td>${dados[i]['hora']}</td>
                    <td>${dados[i]['nomeFuncionario']}</td>
                    <td>${dados[i]['nomeCliente']}</td>
                    <td>${dados[i]['nomeServico']}</td>
                `;

                // IFs ternários para checkboxs
                dados[i]['status']=='1' ?
                    row += `
                        <td>
                            <div class="form-check form-switch">
                                <input id="status${i}" class="form-check-input" role="switch" value="${i}" type="checkbox" checked onclick="MudaStatus('${dados[i]['data']}', '${dados[i]['hora']}', '${dados[i]['cpf']}', 'status${i}')">
                            </div>
                        </td>
                    `
                :
                    row += `
                            <td>
                                <div class="form-check form-switch">
                                    <input id="status${i}" class="form-check-input" role="switch" value="${i}" type="checkbox" onclick="MudaStatus('${dados[i]['data']}', '${dados[i]['hora']}', '${dados[i]['cpf']}', 'status${i}')">
                                </div>
                            </td>
                    `;

                dados[i]['pago']=='1' ?
                    row += `
                        <td>
                            <div class="form-check form-switch">
                                <input id="pago${i}" class="form-check-input" role="switch" value="${i}" type="checkbox" checked onclick="MudaPago('${dados[i]['data']}', '${dados[i]['hora']}', '${dados[i]['cpf']}', 'pago${i}')">
                            </div>
                        </td>
                    `
                :
                    row += `
                            <td>
                                <div class="form-check form-switch">
                                    <input id="pago${i}" class="form-check-input" role="switch" value="${i}" type="checkbox" onclick="MudaPago('${dados[i]['data']}', '${dados[i]['hora']}', '${dados[i]['cpf']}', 'pago${i}')">
                                </div>
                            </td>
                    `;

                row += `<td class="text-end"><button class="btn btn-outline-danger" onclick="ExcluirTupla('${dados[i]['data']}', '${dados[i]['hora']}', '${dados[i]['cpf']}')"><i class="bi bi-trash"></i></td>`
                row += '</tr>'

                tbody.innerHTML += row;
            }
        }
    })
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