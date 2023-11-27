<?php
    include('../../config.php');

    $sql = "UPDATE servico SET nome='{$_POST['nome']}', descricao='{$_POST['descricao']}', preco={$_POST['preco']} WHERE idServico={$_POST['idServico']}";

    $result = $connection->query($sql);

    mysqli_close($connection);
?>