<?php

/* https://api.telegram.org/bot5259054344:AAHMM9mgdLViPdW-3MQsA4w_5xWgqY5_msQ/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

 $name = $_POST['user_name'];
$phone = $_POST['user_phone'];
 $email = $_POST['user_email'];
$token = "5259054344:AAHMM9mgdLViPdW-3MQsA4w_5xWgqY5_msQ";
$chat_id = "-601175976";
$arr = array(
  // 'Имя пользователя: ' => $name,
  'Телефон: ' => $phone,
  // 'Email' => $email
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: thank-you.html');
} else {
  echo "Error";
}
?>