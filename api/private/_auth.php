<?php

switch ($METHOD) {
  case 'isAuth':
    $response = [
      'status' => 200,
      'result' => isAuth()
    ];
    break;
  case 'setAuth':
    $conditions = isset($DATA->data->login) and isset($DATA->data->password);
    if ($conditions) {
      $currentData = $DATA->data;
      $login = strtoupper($antiXss->xss_clean($currentData->login));
      $password = $antiXss->xss_clean($currentData->password);
      $userInfo = $auth_base->select('account', ['salt', 'verifier', 'id'], ['username' => $login, 'LIMIT' => 1]);
      if ($userInfo) {
        $salt = $userInfo[0]['salt'];
        $verifier = $userInfo[0]['verifier'];
        $accountId = $userInfo[0]['id'];
        $isAuthUser = VerifySRP6Login($login, $password, $salt, $verifier);
        if ($isAuthUser) {
          setcookie("login", $login, time() + 9999999, '/', '', 0);
          setcookie("salt", $salt, time() + 9999999, '/', '', 0);
          setcookie("verifier", $verifier, time() + 9999999, '/', '', 0);
          $response = [
            'status' => 200,
            'result' => true
          ];
        } else {
          $response['result'] = 'Неверный логин / пароль';
        }
      } else {
        $response['result'] = 'Неверный логин / пароль';
      }
    } else {
      $response['result'] = 'Нет данных';
    }
    break;
  case 'logOut':
    logOut();
    $response = [
      'status' => 200,
      'result' => true
    ];
    break;
  default:
    $response['result'] = 'Неизвестный метод';
    break;
}

echo json_encode($response);
return;
