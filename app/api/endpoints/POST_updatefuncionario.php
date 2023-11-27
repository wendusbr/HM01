<?php
    include('../../config.php');

    $sql = "UPDATE funcionario SET nome='{$_POST['nome']}' WHERE cpf='{$_POST['cpf']}'";

    $result = $connection->query($sql);

    mysqli_close($connection);
?>