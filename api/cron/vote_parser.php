<?php

/**
 * 
 * Скрипт для crona
 * Парсит файл голосования с mmotop
 * 
 */

require_once '../vendor/autoload.php';
require_once "../config.php";

use Medoo\Medoo;

$table_vote_name = 'lk_vote';

function raiseError($err)
{
  print_r($err);
  exit();
}

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

  // Маппинг для кол-во голосов от ммотопа (индекс больше 1 - это платные смс)
  $countVote = [0, 1, 10, 50, 100];
  $lastId = $auth_base->max($table_vote_name, 'vote_id');

  // Проверка на существование базы
  if ($auth_base->error()[2]) {
    raiseError($auth_base->error()[2]);
  }

  @$fileConnect = fopen($config_vote_mmotop_file_url, 'r');
  if (!$fileConnect) {
    raiseError('Не удалось найти файл с голосами');
  }

  // Построково читаем файл и заполняем таблицу голосов
  while ($fileCSVLine = fgetcsv($fileConnect, 0, "\t")) {
    // Проверяем что строка корректная (5 столбцов) и айди нет в нашей базе
    if (count($fileCSVLine) !== 5 || $lastId >= $fileCSVLine[0]) {
      continue;
    } else {
      $vote_id = $fileCSVLine[0];
      $vote_date = date('j', strtotime($fileCSVLine[1]));
      $vote_ip = $fileCSVLine[2];
      $vote_name = $fileCSVLine[3];
      $vote_count = $countVote[$fileCSVLine[4]];

      $accountId = $characters_base->select('characters', 'account', ['name' => $vote_name]);
      $accountId = $accountId ? $accountId[0] : -1;

      $auth_base->insert($table_vote_name, [
        'vote_id' => $vote_id,
        'vote_date' => $vote_date,
        'vote_ip' => $vote_ip,
        'vote_name' => $vote_name,
        'vote_count' => $vote_count,
        'vote_today' => 0,
        'acc_id' => $accountId,
      ]);
    }
  }

  // После того как записали голоса, ищем, кто не получал бонусы за сегодня
  $newVotes = $auth_base->select($table_vote_name, '*', [
    'vote_today' => 0,
    'vote_date' => date('j'),
    'acc_id[>]' => 0
  ]);


  foreach ($newVotes as $vote) {

    // Начисляем бонусы
    $auth_base->update('lk_bonus', [
      'count[+]' => $vote['vote_count'] * $config_vote_bonus_count
    ], [
      'acc_id' => $vote['acc_id']
    ]);

    // Проверка на существование базы lk_bonus
    if ($auth_base->error()[2]) {
      raiseError($auth_base->error()[2]);
    }

    // Проставляем флаг, что бонусы за сегодня начислены
    // Если акка нет в таблице с бонусами, ничего не придёт
    // Акк должен был добавится на этапе регистрации \ первой авторизации
    $auth_base->update($table_vote_name, [
      'vote_today' => 1
    ], [
      'vote_id' => $vote['vote_id']
    ]);
  }

  echo "Операция успешно выполнена!";
} catch (\Throwable $th) {
  var_dump($th->getMessage());
}
