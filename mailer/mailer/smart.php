<?php 

$name = $_POST['name'];
$phone = $_POST['comment'];
$email = $_POST['email'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$mail->isSMTP();          
$mail->Host = 'smtp.gmail.com'; 
$mail->SMTPAuth = true;           
$mail->Username = 'azhginartemdeveloper@gmail.com'; 
$mail->Password = 'cpzltktoozqetmvw';         
$mail->SMTPSecure = 'ssl';   
$mail->Port = 465; 
 
$mail->setFrom('forroyalee2@gmail.com', 'Заказчик');
$mail->addAddress('azhginartemdeveloper@gmail.com');
$mail->isHTML(true);

$mail->Subject = 'Данные';
$mail->Body    = '
		Заказчик оставил контакты <br> 
	Имя: ' . $name . ' <br>
	Номер телефона: ' . $phone . '<br>
	E-mail: ' . $email . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>