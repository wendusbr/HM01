<?php
    // Esse GET retorna todos os dados de uma tabela ordenados por nome (aplicado em Cliente, Funcionario e Serviço)

    include('../../config.php');

    $sql = "SELECT * FROM {$_GET['table']} ORDER BY nome";
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