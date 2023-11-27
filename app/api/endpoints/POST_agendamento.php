<?php
    include('../../config.php');

    $sql = "INSERT INTO agendamento(data, hora, cpf, idCliente, idServico) VALUES ('{$_POST['data']}', '{$_POST['hora']}', '{$_POST['cpf']}', {$_POST['idCliente']}, {$_POST['idServico']})";

    $result = $connection->query($sql);

    mysqli_close($connection);
?>