<?php
    include('../../config.php');

    $sql = "DELETE FROM servico WHERE idServico={$_POST['idServico']}";

    $result = $connection->query($sql);

    mysqli_close($connection);
?>