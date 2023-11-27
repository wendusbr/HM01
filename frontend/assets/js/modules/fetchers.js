export function fetchFuncionarios(){
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

export function fetchClientes(){
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

export function fetchServicos(){
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

export function fetchHoras(){
    var hora = 9;
    var minuto = 0;
    select = document.getElementById('selectHoras');

    select.innerHTML = '<option selected>Selecione um horário...</option>'
    while(hora < 20){
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