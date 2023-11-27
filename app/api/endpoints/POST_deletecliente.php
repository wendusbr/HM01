<?php
    include('../../config.php');

    $sql = "DELETE FROM cliente WHERE idCliente={$_POST['idCliente']}";

    $result = $connection->query($sql);

    mysqli_close($connection);
?>