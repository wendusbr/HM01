function CarregarLucroDia(){
    setTimeout(fetchLucroDia, 100); // Tempo de 100ms para não sobrecarregar o servidor
}

function fetchLucroDia(){
    $.ajax({
        url: '../app/api/endpoints/GET_procedurelucrodia.php',
        type: 'GET',

        success: (response) => {
            var dado = JSON.parse(response);

            if(dado['Lucro do dia'] == null)
                dado['Lucro do dia'] = '0.00';

            document.getElementById('lucroHoje').innerHTML = 'R$ ' + dado['Lucro do dia'];
        }
    })
}

function ColetaDadosLinha(rowId){
    var row = document.getElementById(rowId); // Seleciona a linha com base no ID
  
    if(row){
        var cells = row.getElementsByTagName("td"); // Obtém todas as células da linha
        var rowData = []; // Vetor para armazenar os dados da linha
  
        for (var i = 0; i < 3; i++) // Linha 0 a 2
            rowData[i] = cells[i].textContent;
    }

    return rowData;
}

function MudaPago(rowId){
    const rowData = ColetaDadosLinha(rowId);

    const pago = document.getElementById('checkbox'+rowId).checked;
    
    $.ajax({
        url: '../app/api/endpoints/POST_updateagendamento.php',
        type: 'POST',
        data: {
            data: rowData[0],
            hora: rowData[1],
            cpf: rowData[2],
            status: pago,
            pago: pago
        }
    })

    CarregarLucroDia();
}

$(document).ready(function(){
    $.ajax({
        url: '../app/api/endpoints/GET_agendadia.php',
        type: 'GET',

        success: (response)=>{
            const dados = JSON.parse(response);
            const tbody = document.getElementById('agendaDia');
            
            for(var i=0; i<dados.length; i++){
                var row = `<tr id="${i}">`;
                row += `
                    <td hidden>${dados[i]['data']}</td>
                    <td>${dados[i]['hora']}</td>
                    <td hidden>${dados[i]['cpf']}</td>
                    <td>${dados[i]['nomeCliente']}</td>
                    <td>${dados[i]['nomeFuncionario']}</td>
                    <td>${dados[i]['nomeServico']}</td>
                    <td>${dados[i]['preco']}</td>
                `;

                dados[i]['pago']=='1' ?
                    row += `
                        <td>
                            <div class="form-check form-switch">
                                <input id="checkbox${i}" class="form-check-input" type="checkbox" role="switch" onclick="MudaPago(${i})" checked>
                            </div>
                        </td>
                    `
                :
                    row += `
                    <td>
                        <div class="form-check form-switch">
                            <input id="checkbox${i}" class="form-check-input" type="checkbox" role="switch" onclick="MudaPago(${i})">
                        </div>
                    </td>
                    `
                ;

                row += '</tr>';

                tbody.innerHTML += row;
            }
        }
    })

    CarregarLucroDia();
})