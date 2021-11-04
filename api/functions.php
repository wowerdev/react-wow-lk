<?php

/**
 * Метод проверяет авторизирован ли пользователь
 * Проверяет наличие куков и ищет пользователя по ним
 */
function isAuth()
{

  global $_IS_DEV_MODE, $antiXss, $auth_base;

  // TODO Удалить
  if ($_IS_DEV_MODE) {
    return true;
  }

  if (isset($_COOKIE['login']) and isset($_COOKIE['salt']) and isset($_COOKIE['verifier'])) {
    $login = $antiXss->xss_clean($_COOKIE['login']);
    $salt =  $_COOKIE['salt'];
    $verifier =  $_COOKIE['verifier'];
    $userInfo = $auth_base->select(
      'account',
      ['id'],
      [
        'salt' => $salt,
        'verifier' => $verifier,
        'username' => $login,
      ]
    );
    return boolval($userInfo);
  } else {
    return false;
  }
}

/**
 * Метод возращает id аккаунта пользователя
 * Если пользователь не авторизован возвращает false
 */
function getAccountId()
{
  global $antiXss, $_IS_DEV_MODE, $auth_base;

  //TODO удалить
  if ($_IS_DEV_MODE) {
    return 22;
  }

  if (isAuth()) {
    $login = $antiXss->xss_clean($_COOKIE['login']);
    $salt =  $_COOKIE['salt'];
    $verifier =  $_COOKIE['verifier'];
    $userInfo = $auth_base->select(
      'account',
      ['id'],
      [
        'salt' => $salt,
        'verifier' => $verifier,
        'username' => $login,
      ]
    );
    return $userInfo[0]['id'];
  } else {
    return false;
  }
}

/**
 * Метод возвращает кол-во бонусов для текущего аккаунта.
 * Если в таблице бонусов нет записи для данного аккаунта, создаёт запись
 * Если аккаунт не найден или таблицы нет, возращает false
 */
function initBonus()
{
  global $config_start_bonus, $auth_base;

  $accountId = getAccountId();
  if ($accountId) {
    $bonusInfo = $auth_base->select(
      'lk_bonus',
      ['count'],
      ['acc_id' => $accountId]
    );

    // Проверяем, существует ли сама таблица
    $hasError = isset($auth_base->error()[1]);
    if ($hasError) {
      return false;
    } else {
      // Проверяем есть ли в таблице с бонусами аккаунт, если нет, то создаём
      if (!$bonusInfo) {
        $auth_base->insert(
          'lk_bonus',
          [
            "acc_id" => $accountId,
            "count" => $config_start_bonus
          ]
        );
        return $config_start_bonus;
      } else {
        $bonusInfo = $auth_base->select(
          'lk_bonus',
          ['count'],
          ['acc_id' => $accountId]
        );
        return $bonusInfo[0]['count'];
      }
    }
  } else {
    return false;
  }
}

/**
 * Метод проверяет, существует ли персонаж на аккаунте
 */
function hasCharInAccount($guid)
{
  global $characters_base;
  if (!isAuth()) return false;
  $accountId = getAccountId();
  $valideGuid = intval($guid);
  if (!$valideGuid) return false;
  $data = $characters_base->select(
    'characters',
    ['guid'],
    [
      'guid' => $valideGuid,
      'account' => $accountId
    ]
  );
  return !!$data;
}

/**
 * Метод проверяет, находится ли персонаж онлайн
 * Возвращает строку состояния "online" | "offline"
 * Возвращает false, если случилась ошибка
 */
function getCharOnlineStatus($guid)
{
  global $characters_base;
  if (!isAuth()) return false;
  $accountId = getAccountId();
  $valideGuid = intval($guid);
  if (!$valideGuid) return false;
  $onlineData = $characters_base->select(
    'characters',
    ['online'],
    [
      'guid' => $valideGuid,
      'account' => $accountId
    ]
  );
  if (!$onlineData) return false;
  return $onlineData[0]['online'] ? 'online' : 'offline';
}

/**
 * Метод проверяет достаточно ли бонусов 
 */
function hasBonus($needCount)
{
  global $auth_base;
  if (!isAuth()) return false;
  $accountId = getAccountId();
  if (!$accountId) return false;
  $bonusInfo = $auth_base->select(
    'lk_bonus',
    ['count'],
    ['acc_id' => $accountId]
  );
  $current_bonus = $bonusInfo ? $bonusInfo[0]['count'] : 0;
  return $current_bonus >= $needCount;
}

/**
 * Метод добавляет бонусы
 */
function addBonusCount($count)
{
  global $auth_base;
  if (!isAuth()) return;
  $accountId = getAccountId();
  $auth_base->update(
    'lk_bonus',
    [
      'count[+]' => intval($count)
    ],
    ['acc_id' => $accountId]
  );
}

/**
 * Метод снимает бонусы
 */
function reduceBonusCount($count)
{
  global $auth_base;
  if (!isAuth()) return;
  $accountId = getAccountId();
  $auth_base->update(
    'lk_bonus',
    [
      'count[-]' => intval($count)
    ],
    ['acc_id' => $accountId]
  );
}

function logOut()
{
  setcookie("login", '', time() - 999999, "/", "", 0);
  setcookie("salt", "", time() - 999999, "/", "", 0);
  setcookie("verifier", "", time() - 999999, "/", "", 0);
}

function GetSRP6RegistrationData($username, $password)
{
  // generate a random salt
  $salt = random_bytes(32);

  // calculate verifier using this salt
  $verifier = CalculateSRP6Verifier($username, $password, $salt);

  // done - this is what you put in the account table!
  return array($salt, $verifier);
}

function CalculateSRP6Verifier($username, $password, $salt)
{
  // algorithm constants
  $g = gmp_init(7);
  $N = gmp_init('894B645E89E1535BBDAD5B8B290650530801B18EBFBF5E8FAB3C82872A3E9BB7', 16);

  // calculate first hash
  $h1 = sha1(strtoupper($username . ':' . $password), TRUE);

  // calculate second hash
  $h2 = sha1($salt . $h1, TRUE);

  // convert to integer (little-endian)
  $h2 = gmp_import($h2, 1, GMP_LSW_FIRST);

  // g^h2 mod N
  $verifier = gmp_powm($g, $h2, $N);

  // convert back to a byte array (little-endian)
  $verifier = gmp_export($verifier, 1, GMP_LSW_FIRST);

  // pad to 32 bytes, remember that zeros go on the end in little-endian!
  $verifier = str_pad($verifier, 32, chr(0), STR_PAD_RIGHT);

  // done!
  return $verifier;
}

function VerifySRP6Login($username, $password, $salt, $verifier)
{
  // re-calculate the verifier using the provided username + password and the stored salt
  $checkVerifier = CalculateSRP6Verifier($username, $password, $salt);

  // compare it against the stored verifier
  return ($verifier === $checkVerifier);
}

function isValidLoginReg($str)
{
  if (strlen($str) > 32 or strlen($str) < 4) {
    return false;
  } else if (!ctype_alnum($str)) {
    return false;
  } else {
    return true;
  }
}

function isValidPassReg($str)
{
  if (strlen($str) > 32 or strlen($str) < 4) {
    return false;
  } else if (!ctype_alnum($str)) {
    return false;
  } else {
    return true;
  }
}

function isValidEmail($email)
{
  return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}
