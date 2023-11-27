<?php
    include('../../config.php');

    $sql = "CALL LucroDia(curdate())";
    $result = $connection->query($sql);

    $count = $result->num_rows;

    if($count){
        $response = $result->fetch_object();

        echo json_encode($response);
    }

    mysqli_close($connection);
?>