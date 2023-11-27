<?php
    define('HOST', '127.0.0.1:3306');
    define('USER', 'root');
    define('PASS', '');
    define('BASE', 'hm01');

    $connection = new MySQLi(HOST, USER, PASS, BASE);
?>