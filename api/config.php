<?php

/**
 * 
 * НАСТРОЙКИ ПОДКЛЮЧЕНИЯ
 * 
 */

/**
 * IP подключения
 * По умолчанию: '127.0.0.1'
 */
$server = '127.0.0.1';

/**
 * Логин от mysql
 * По умолчанию: 'trinity'
 */
$username = 'root';

/**
 * Пароль от mysql
 * По умолчанию: 'trinity'
 */
$password = 'root';

/**
 * Имя базы данных авторизации. 
 * По умолчанию: 'auth'
 */
$auth_db_name = 'auth';

/**
 * Имя базы данных персонажей. 
 * По умолчанию: 'characters'
 */
$characters_db_name = 'characters';

/**
 * 
 * НАСТРОЙКИ ЛИЧНОГО КАБИНЕТА
 * 
 */

/**
 * Эмейл для получения писем (туда будут приходить письма с раздела "Обратная связь"). 
 * Отправка не работает на локальных серверах, php функция mail()
 */
$config_email = 'mail@mail.ru';

/**
 * Кол-во бонусы при создании аккаунта
 */
$config_start_bonus = 10;

/**
 * Название сервера (отображается над меню)
 */
$config_server_name = "wow-server.ru";

/**
 * Реалмлист сервера
 */
$config_server_realmlist = "set realmlist 127.0.0.1";

/**
 * Включено ли голосование (будет ли появляться в меню пункт)
 * (true/false), по умолчанию: true.
 */
$config_vote_enable = true;

/**
 * Кол-во бонусов за голосование
 * Если поставить 0, то бонусов за голосование не будет
 */
$config_vote_bonus_count = 2;

/**
 * Ссылка на голосование за ваш сервер
 */
$config_vote_mmotop_url = 'https://wow.mmotop.ru/servers/';

/**
 * Ссылка на файл проголосовавших mmotop (выдаётся mmotop'oм администратору сервера)
 * С этого файла будет парситься список проголосовавших, что бы зачислить бонусы
 * Ссылка примерно такого формата:
 */
$config_vote_mmotop_file_url = 'https://mmotop.ru/votes/13513060a81351e1349d.txt?1231223';


/**
 * Включена ли услуга переноса в таверну (true/false), по умолчанию: true.
 * И стоимость переноса в таверну
 */
$config_tavern_teleport_enabled = true;
$config_tavern_teleport_cost = 2;

/**
 * Включена ли услуга смены фракции (true/false), по умолчанию: true.
 * И стоимость смены фракции
 */
$config_fraction_change_enabled = true;
$config_fraction_change_cost = 10;

/**
 * Включена ли услуга смены рассы (true/false), по умолчанию: true.
 * И стоимость смены рассы
 */
$config_race_change_enabled = true;
$config_race_change_cost = 10;

/**
 * Включена ли услуга смены имени (true/false), по умолчанию: true.
 * И стоимость смены имени
 */
$config_name_change_enabled = true;
$config_name_change_cost = 1;

// Настройка часового пояса сервера (не менйяте, если часовой пояс МСК). | По умолчанию: date_default_timezone_set("Europe/Moscow");
date_default_timezone_set("Europe/Moscow");
