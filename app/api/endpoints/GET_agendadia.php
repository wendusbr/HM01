<?php
    include('../../config.php');

    $sql = "SELECT * FROM agenda_dia";
    $result = $connection->query($sql);

    $count = $result->num_rows;

    if($count){
        $response['rows'] = Array();
        
        while($row = $result->fetch_object())
            $response['rows'][] = $row;

        echo json_encode($response['rows']);
    }

    mysqli_close($connection);
?>