<?php
    include('../../config.php');

    $sql = "DELETE FROM funcionario WHERE cpf='{$_POST['cpf']}'";

    $result = $connection->query($sql);

    mysqli_close($connection);
?>