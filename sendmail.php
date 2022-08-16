<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception';
require 'phpmailer/src/PHPMailer';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguge('ru', 'phpmailer/language/');
$mail->IsHTML(true);

//от кого письмо
$mail->setFrom('wika1706@gmail.com', 'Manao');
//Кому отправить
$mail->addAddress('svistunovaviktoryia@gmail.com');
//Тема письма
$mail->Subject = 'Cайт на оценку';

//Тело письма
$body = '<h1>Cайт на оценку</h1>';
if(trim(!empty($_POST['name']))){
  $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['message']))){
  $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
}
if(trim(!empty($_POST['name']))){
  $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}

$mail->Body = $body;

//Отправляем
if(!$mail->send()) {
  $message = 'Ошибка';
}else {
  $message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>