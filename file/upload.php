<?php
include '../config.php';

$uploadfile = DIR_UPLOAD . basename($_FILES['file']['name']);

if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
    echo "ok";
} else {
    echo "not";
}

