<?php
    include('../../config.php');

    $sql = "UPDATE cliente SET nome='{$_POST['nome']}', telefone='{$_POST['telefone']}', email='{$_POST['email']}' WHERE idCliente={$_POST['idCliente']}";

    $result = $connection->query($sql);

    mysqli_close($connection);
?>