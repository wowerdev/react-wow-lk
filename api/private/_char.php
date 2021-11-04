<?php

if (isAuth()) {
  switch ($METHOD) {
    case 'getChars':
      $accountId = getAccountId();
      if ($accountId) {
        $allChars = $characters_base->select(
          'characters',
          ['guid', 'name', 'race', 'class(gameClass)', 'gender', 'level', 'online', 'arenaPoints', 'totalHonorPoints'],
          ['account' => $accountId]
        );

        // Получаем гильдии
        foreach ($allChars as $key => $charArray) {

          $guildName = $characters_base->select(
            'guild_member',
            ['[><]guild' => ['guildid' => 'guildid']],
            ['guild.name'],
            ['guild_member.guid' => $charArray['guid']]
          );
          $allChars[$key]['guildName'] = $guildName ? $guildName[0]['name'] : null;
        }

        $response = [
          'status' => 200,
          'result' => $allChars
        ];
      } else {
        $response['result'] = 'Пользователь не найден';
      }
      break;

    case 'tavernTeleport':
      // Включена ли услуга
      if (!$config_tavern_teleport_enabled) {
        $response['result'] = 'Услуга отключена';
        break;
      }
      // Переданы ли данные с UI (+ корректность)
      $currentData = $DATA->data;
      $guid = intval($currentData->guid);
      if (!$guid) {
        $response['result'] = 'Нет данных';
        break;
      }
      // Проверяем принадлжеит ли персонаж аккаунту.
      $hasCharInAccount = hasCharInAccount($guid);
      if (!$hasCharInAccount) {
        $response['result'] = 'Персонаж не принадлежит данному аккаунту';
        break;
      }
      // Достаточно ли бонусов
      $hasBonus = hasBonus($config_tavern_teleport_cost);
      if (!$hasBonus) {
        $response['result'] = 'Не хватает бонусов';
        break;
      }
      // Проверяем, не онлайн ли персонаж
      $onlineStatus = getCharOnlineStatus($guid);
      if (!$onlineStatus or $onlineStatus === 'online') {
        $response['result'] = 'Персонаж в игре';
        break;
      }
      // Ищем таверну персонажа
      $homeBindInfo = $characters_base->select(
        'character_homebind',
        ['mapId', 'posX', 'posY', 'posZ'],
        ['guid' => $guid]
      );
      if (!$homeBindInfo) {
        $response['result'] = 'Не удалось определить таверну персонажа. Возможно персонаж еще не был в игре';
        break;
      }
      // Все условия выполнены, перемещаем и списываем бонусы
      $teleportResult = $characters_base->update(
        'characters',
        [
          'map' => $homeBindInfo[0]['mapId'],
          'position_x' => $homeBindInfo[0]['posX'],
          'position_y' => $homeBindInfo[0]['posY'],
          'position_z' => $homeBindInfo[0]['posZ'],
        ],
        ['guid' => $guid]
      );
      // Проверяем на ошибки сервера, что бы не списать бонусы просто так
      if ($characters_base->error()[1]) {
        $response['result'] = 'Не удалось телепортировать персонажа';
        break;
      }
      // Ошибок нет, списываем бонусы
      reduceBonusCount($config_tavern_teleport_cost);
      $response = [
        'status' => 200,
        'result' => 'Персонаж телепортирован в таверну'
      ];
      break;

    case 'setChangeOnLogin':

      $currentData = $DATA->data;
      $guid = intval($currentData->guid);
      $serviceName = $antiXss->xss_clean($currentData->serviceName);

      $isActiveService = [
        "change_nick" => $config_name_change_enabled,
        "change_race" => $config_race_change_enabled,
        "change_fraction" => $config_fraction_change_enabled,
      ];

      $priceService = [
        "change_nick" => $config_name_change_cost,
        "change_race" => $config_race_change_cost,
        "change_fraction" => $config_fraction_change_cost,
      ];

      $maskServices = [
        "change_nick" => 1,
        "change_race" => 128,
        "change_fraction" => 64,
      ];

      $currentError = false;

      // Проверяем принадлжеит ли персонаж аккаунту.
      if (!hasCharInAccount($guid)) {
        $currentError = 'Персонаж не принадлежит данному аккаунту';
        break;
      }

      if (!$isActiveService[$serviceName]) {
        $currentError = 'Услуга отключена';
      }

      if (!$guid) {
        $currentError = 'Нет данных';
      }

      if (!hasBonus($priceService[$serviceName])) {
        $currentError = 'Не хватает бонусов';
      }

      $onlineStatus = getCharOnlineStatus($guid);
      if (!$onlineStatus or $onlineStatus === 'online') {
        $currentError  = 'Персонаж в игре';
      }

      if (!$currentError) {
        $characters_base->update(
          'characters',
          [
            'at_login' => $maskServices[$serviceName]
          ],
          ['guid' => $guid]
        );

        // Проверяем на ошибки сервера, что бы не списать бонусы просто так
        if ($characters_base->error()[1]) {
          $response['result'] = 'Не удалось выполнить действие';
          break;
        }

        // Ошибок нет, списываем бонусы
        reduceBonusCount($priceService[$serviceName]);
        $response = [
          'status' => 200,
          'result' => 'Успешно!'
        ];
      } else {
        $response['result'] = $currentError;
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
