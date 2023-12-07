<?php
    include('../../config.php');

    $sql = "UPDATE agendamento SET status={$_POST['status']}, pago={$_POST['pago']} WHERE data='{$_POST['data']}' AND hora='{$_POST['hora']}' AND cpf='{$_POST['cpf']}'";

    $result = $connection->query($sql);

    mysqli_close($connection);
?>