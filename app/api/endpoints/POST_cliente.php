<?php
    include('../../config.php');

    $sql = "INSERT INTO cliente(nome, telefone, email) VALUES ('{$_POST['nome']}', '{$_POST['telefone']}', '{$_POST['email']}')";

    $result = $connection->query($sql);

    mysqli_close($connection);
?>