<?php
    include('../../config.php');

    $sql = "INSERT INTO agendamento(data, hora, idCliente, cpf, idServico) VALUES ('{$_POST['data']}', '{$_POST['hora']}', {$_POST['idCliente']}, '{$_POST['cpf']}', {$_POST['idServico']})";

    $result = $connection->query($sql);

    mysqli_close($connection);
?>