<?php
    include('../../config.php');

    $sql = "INSERT INTO funcionario VALUES ('{$_POST['cpf']}', '{$_POST['nome']}')";

    $result = $connection->query($sql);

    mysqli_close($connection);
?>