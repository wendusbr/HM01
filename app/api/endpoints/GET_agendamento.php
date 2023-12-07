<?php
    include('../../config.php');

    $sql = "SELECT A.data, A.hora, A.cpf, C.nome AS nomeCliente, F.nome AS nomeFuncionario, S.nome AS nomeServico, A.status, A.pago FROM agendamento AS A, funcionario AS F, cliente AS C, servico AS S WHERE A.cpf=F.cpf AND A.idCliente=C.idCliente AND A.idServico=S.idServico ORDER BY A.data DESC, A.hora ASC";

    $result = $connection->query($sql);

    $count = $result->num_rows;

    if($count){
        $response['rows'] = Array();

        while($row = $result->fetch_object())
            $response['rows'][] = $row;

        echo json_encode($response['rows']);
    }

    mysqli_close($connection);
?>