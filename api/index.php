<?php
require_once 'vendor/autoload.php';
require_once 'config.php';

use Medoo\Medoo;
use voku\helper\AntiXSS;
// Нужна в functions.php
$antiXss = new AntiXSS();

// TODO Поставить в false, если эта переменная в true, то все действия доступны без авторизации
$_IS_DEV_MODE = false;

require_once 'functions.php';

$response = [
  'status' => 500,
  'result' => ''
];

try {
  $auth_base = new Medoo([
    'database_type' => 'mysql',
    'database_name' => $auth_db_name,
    'server' => $server,
    'username' => $username,
    'password' => $password,
    'charset' => 'utf8',
    'collation' => 'utf8_general_ci',
    'port' => 3306,

    'error' => PDO::ERRMODE_WARNING,
  ]);

  $characters_base = new Medoo([
    'database_type' => 'mysql',
    'database_name' => $characters_db_name,
    'server' => $server,
    'username' => $username,
    'password' => $password,
    'charset' => 'utf8',
    'collation' => 'utf8_general_ci',
    'port' => 3306,

    'error' => PDO::ERRMODE_WARNING,
  ]);

  $JSON_POST_DATA = json_decode(file_get_contents('php://input'));

  if ($JSON_POST_DATA) {
    $DATA = $JSON_POST_DATA->data;
    $METHOD = $DATA->method;
    $OBJECT = $DATA->object;

    switch ($OBJECT) {
      case 'auth':
        require_once 'private/_auth.php';
        break;
      case 'char':
        require_once 'private/_char.php';
        break;
      case 'account':
        require_once 'private/_account.php';
        break;
      case 'global':
        require_once 'private/_global.php';
        break;
      default:
        $response['result'] = "Неизвестный api endpoint";
        echo json_encode($response);
        break;
    }
  } else {
    $response['result'] = "Нет данных";
    echo json_encode($response);
  }
} catch (\Throwable $th) {
  $response['result'] = $th->getMessage();
  echo json_encode($response);
}
