<?php
include '../config.php';

$name=$_POST['name'];
unlink(DIR_UPLOAD .$name);
