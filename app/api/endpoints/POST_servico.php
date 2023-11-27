<?php
    include('../../config.php');

    $sql = "INSERT INTO servico(nome, descricao, preco) VALUES ('{$_POST['nome']}', '{$_POST['descricao']}', {$_POST['preco']})";

    $result = $connection->query($sql);

    mysqli_close($connection);
?>