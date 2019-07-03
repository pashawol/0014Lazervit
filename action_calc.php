<?php

require __DIR__ . '/vendor/autoload.php';
include 'config.php';

$mail = new PHPMailer(true);
$mail->IsMail();
$mail->IsHTML(true);
$mail->Priority = '1';
$mail->Encoding = 'base64';
$mail->CharSet = 'utf-8';

///от кого письмо
$mail->setFrom('zayavka@lazersvit.com');

foreach ($address_to as $item) {
    $mail->addAddress($item);
}

// $mail->addAddress('horenkova369@gmail.com');
// $mail->addAddress('stab@inbox.support');


//Субъект
$mail->Subject = 'Заявка с сайта Lazersvit.Odessa';

$time = date('d.m.Y в H:i');
$html = '

<table style="width: 100%;">';


if (!empty($_POST['tel'])) {
    $html .= ' <tr style="background-color: #f8f8f8;"> 
 <td style="padding: 10px; border: #e9e9e9 1px solid;"> Телефон:</td>  
  <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['tel'] . '</b></td></tr>';
}

/*
 *                    images: self.images,
                         time: self.time,
                         bolezn: self.bolezn,
                         rast: self.rast,
                         color: self.color,//изменила ли цвет
                         travma: self.travma, //Травмируется ли родинка?
                         krov: self.krov,
                         tel: self.tel,
 */

if ($_POST['time']) {
    $html .= ' <tr style="background-color: #f8f8f8;"> 
 <td style="padding: 10px; border: #e9e9e9 1px solid;"> Когда появилась родинка:</td>   
 <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['time'] . '</b></td>';
}

if ($_POST['bolezn']) {
    $html .= ' <tr style="background-color: #f8f8f8;"> 
 <td style="padding: 10px; border: #e9e9e9 1px solid;"> Была ли в семье меланома или рак кожи:</td>   
 <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['bolezn'] . '</b></td>';
}

if ($_POST['rast']) {
    $html .= ' <tr style="background-color: #f8f8f8;"> 
 <td style="padding: 10px; border: #e9e9e9 1px solid;">Растёт ли родинка последние 6 месяцев:</td>   
 <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['rast'] . '</b></td>';
}

if ($_POST['color']) {
    $html .= ' <tr style="background-color: #f8f8f8;"> 
 <td style="padding: 10px; border: #e9e9e9 1px solid;">изменила ли цвет:</td>   
 <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['color'] . '</b></td>';
}

if ($_POST['travma']) {
    $html .= ' <tr style="background-color: #f8f8f8;"> 
 <td style="padding: 10px; border: #e9e9e9 1px solid;">Травмируется ли родинка:</td>   
 <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['travma'] . '</b></td>';
}

if ($_POST['krov']) {
    $html .= ' <tr style="background-color: #f8f8f8;"> 
 <td style="padding: 10px; border: #e9e9e9 1px solid;">Кровоточит или выделяет любую жидкость:</td>   
 <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_POST['krov'] . '</b></td>';
}


$html .= ' <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;">  Время отправки:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $time . '</b></td>
      <tr style="background-color: #f8f8f8;"> <td style="padding: 10px; border: #e9e9e9 1px solid;"> IP:</td>   <td style="padding: 10px; border: #e9e9e9 1px solid;">' . $_SERVER['REMOTE_ADDR'] . '</b></td> 
</table>
';
$mail->Body = $html;

$images = $_POST['images'];
if ($images !== "") {
    $images = explode(',', $images);
    var_dump($images);
    foreach ($images as $image) {
        $mail->addAttachment(DIR_UPLOAD . $image);
    }
}

if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}
if (!empty($uploadfile)) unlink($uploadfile);
if (!empty($uploadfile2)) unlink($uploadfile2);

//пишем csv
/*
$date = date('H:i d/m/Y');
$row = 1;
$file = __DIR__ . '/data.csv';
$handle = fopen($file, "r");
while (($data = fgetcsv($handle, 1000, ",")) !== false) {
    $row++;
}
fclose($handle);
//  1 - tel
// 2 - order
//3  - time
$fp = fopen($file, 'a');
fputcsv($fp, array('A' . $row, 'B' . $row, $_POST['tel'], $_POST['order'], $_POST['time'], $date));
fclose($fp);
*/






