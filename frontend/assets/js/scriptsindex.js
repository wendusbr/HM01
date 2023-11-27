$(document).ready(function(){
    $.ajax({
        url: '../app/api/endpoints/GET_agendadia.php',
        type: 'GET',
        data: {
            table: 'agenda_dia'
        },

        success: (response)=>{
            const dados = JSON.parse(response);
            const tbody = document.getElementById('agendaDia');
            
            for(var i=0; i<dados.length; i++){
                var row = '<tr>';
                row += `
                    <td>${dados[i]['Horario']}</td>
                    <td>${dados[i]['Cliente']}</td>
                    <td>${dados[i]['Barbeiro']}</td>
                    <td>${dados[i]['Servico']}</td>
                    <td>${dados[i]['Valor (R$)']}</td>
                `;
                row += '</tr>';

                tbody.innerHTML += row;
            }
        }
    })

    $.ajax({
        url: '../app/api/endpoints/GET_procedurelucrodia.php',
        type: 'GET',

        success: (response) => {
            var dado = JSON.parse(response);

            if(dado['Lucro do dia'] == null)
                dado['Lucro do dia'] = '0.00';

            document.getElementById('lucroHoje').innerHTML = 'R$ '+dado['Lucro do dia'];
        }
    })
})