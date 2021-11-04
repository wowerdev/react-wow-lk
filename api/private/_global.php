<?php

switch ($METHOD) {
  case 'getGlobalConfig':
    $response = [
      'status' => 200,
      'result' => [
        'tavern_teleport_enabled' => $config_tavern_teleport_enabled,
        'tavern_teleport_cost' => $config_tavern_teleport_cost,
        'fraction_change_enabled' => $config_fraction_change_enabled,
        'fraction_change_cost' => $config_fraction_change_cost,
        'race_change_enabled' => $config_race_change_enabled,
        'race_change_cost' => $config_race_change_cost,
        'name_change_enabled' => $config_name_change_enabled,
        'name_change_cost' => $config_name_change_cost,
        'vote_bonus_count' => $config_vote_bonus_count,
        'vote_enable' => $config_vote_enable,
        'vote_mmotop_url' => $config_vote_mmotop_url,
        'vote_mmotop_file_url' => $config_vote_mmotop_file_url,
        'server_name' => $config_server_name,
        'server_realmlist' => $config_server_realmlist
      ]
    ];
    break;
  default:
    $response['result'] = 'Неизвестный метод';
    break;
}

echo json_encode($response);
return;
