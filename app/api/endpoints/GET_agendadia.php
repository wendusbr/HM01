<?php
    include('../../config.php');

    $sql = "SELECT A.data, A.hora, F.cpf, C.nome AS 'nomeCliente', F.nome AS 'nomeFuncionario', S.nome AS 'nomeServico', S.preco, A.pago 
    FROM Agendamento AS A, Cliente AS C, Funcionario AS F, Servico AS S 
    WHERE A.data=curdate() AND A.idCliente=C.idCliente AND A.cpf=F.cpf AND A.idServico=S.idServico 
    ORDER BY A.hora";

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