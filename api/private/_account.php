<?php

if (isAuth()) {
  switch ($METHOD) {
    case 'getInfo':
      $accountId = getAccountId();
      if ($accountId) {
        $accountInfo = $auth_base->select(
          'account',
          ['username', 'joindate', 'last_login', 'last_ip', 'email', 'online'],
          ['id' => $accountId]
        );

        // TODO проверить состояние бана
        $isOnline = $accountInfo[0]['online'] === 1;

        if ($isOnline) {
          $onlineStatus = 'Онлайн';
        } else {
          $banInfo = $auth_base->select(
            'account_banned',
            ['id'],
            ['id' => $accountId, 'active' => 1]
          );
          $onlineStatus = $banInfo ? 'Забанен' : 'Оффлайн';
        }

        $accountInfo[0]['online_status'] = $onlineStatus;

        // Получаем бонусы аккантуа
        $bonuses = initBonus();
        if ($bonuses !== false) {
          $accountInfo[0]['bonuses'] = $bonuses;
        } else {
          $accountInfo[0]['bonuses'] = 'Таблицы бонусов не существует';
        }

        $response = [
          'status' => 200,
          'result' =>  $accountInfo[0]
        ];
      } else {
        $response['result'] = 'Пользователь не найден';
      }
      break;

    case 'regAccount':
      $rightCapchaValue = date("j") + 3;
      $currentData = $DATA->data;
      $login = $antiXss->xss_clean($currentData->login);
      $pass = $antiXss->xss_clean($currentData->password);
      $pass2 = $antiXss->xss_clean($currentData->password2);
      $email = $antiXss->xss_clean($currentData->email);
      $captcha = $antiXss->xss_clean($currentData->captcha);

      $currentError = false;

      if (!isValidPassReg($pass) || !isValidPassReg($pass2)) {
        $currentError = 'Невалидный пароль';
      }

      if ($pass != $pass2) {
        $currentError = 'Не совпадают пароли';
      }

      if (!isValidLoginReg($login)) {
        $currentError = 'Невалидный логин';
      }

      if ($captcha != $rightCapchaValue) {
        $currentError = "Неправильная капча, правильная: $rightCapchaValue";
      }

      if (!isValidEmail($email)) {
        $currentError = 'Невалидный эмейл';
      }

      if ($currentError) {
        $response['result'] = $currentError;
      } else {

        // Проверяем, есть ли акк с таким же ником
        $alreadyHasAccount = $auth_base->has(
          'account',
          ['username' => $login]
        );

        if ($alreadyHasAccount) {
          $response['result'] = 'Логин занят';
        } else {
          list($salt, $verifier) = GetSRP6RegistrationData($login, $pass);
          $auth_base->insert(
            'account',
            [
              'username' => $login,
              'salt' => $salt,
              'verifier' => $verifier
            ]
          );
          if ($auth_base->error()[2]) {
            $response['result'] = 'Произошла ошибка';
          } else {
            $newAccountId = $auth_base->id();
            $auth_base->insert('lk_bonus', [
              'acc_id' => $newAccountId,
              'count' => $config_start_bonus
            ]);
            $response['status'] = 200;
            $response['result'] = "Аккаунт " . strtoupper($login) . " успешно зарегистрирован!\nРеалмлист:\n$config_server_realmlist";
          }
        }
      }

      break;

    case "sendMail":

      $currentData = $DATA->data;
      $theme = $antiXss->xss_clean($currentData->theme);
      $email = $antiXss->xss_clean($currentData->email);
      $message = $antiXss->xss_clean($currentData->message);

      if (!isValidEmail($email)) {
        $response['result'] = 'Невалидный эмейл для ответа';
        break;
      }

      if (strlen($theme) > 100 || strlen($message) > 500) {
        $response['result'] = 'Длина превышает допустимую';
        break;
      }

      $msg = "Письмо с личного кабинета WoW\n\nТема:\n$theme\n\nСодержание:\n$message\nПочта для ответа: $email";

      // TODO Проверить на хосте какой формат у письма
      if (@mail($config_email, $theme, $msg)) {
        $response['status'] = 200;
        $response['result'] = "Письмо отправлено!\nОтвет придёт на $email";
        break;
      } else {
        $response['result'] = 'Не удалось отправить сообщение';
      }

      break;

    default:
      $response['result'] = 'Неизвестный метод';
      break;
  }
} else {
  $response['result'] = 'Вы не авторизированы';
}



echo json_encode($response);
return;
