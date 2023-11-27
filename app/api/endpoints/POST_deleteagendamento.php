<?php
    include('../../config.php');

    $sql = "DELETE FROM agendamento WHERE data='{$_POST['data']}' AND hora='{$_POST['hora']}' AND cpf='{$_POST['cpf']}'";

    $result = $connection->query($sql);
    
    mysqli_close($connection);
?>