/**
 * Import class image
 */
import dk from '../assets/img/class/Ui-charactercreate-classes_deathknight.png';
import druid from '../assets/img/class/Ui-charactercreate-classes_druid.png';
import hunter from '../assets/img/class/Ui-charactercreate-classes_hunter.png';
import mage from '../assets/img/class/Ui-charactercreate-classes_mage.png';
import paladin from '../assets/img/class/Ui-charactercreate-classes_paladin.png';
import priest from '../assets/img/class/Ui-charactercreate-classes_priest.png';
import rogue from '../assets/img/class/Ui-charactercreate-classes_rogue.png';
import shaman from '../assets/img/class/Ui-charactercreate-classes_shaman.png';
import warlock from '../assets/img/class/Ui-charactercreate-classes_warlock.png';
import warrior from '../assets/img/class/Ui-charactercreate-classes_warrior.png';
import noClass from '../assets/img/class/Spell_shadow_nethercloak.png';

/**
 * Import race image
 */
import humanFemale from '../assets/img/race/Ui-charactercreate-races_human-female.png';
import humanMale from '../assets/img/race/Ui-charactercreate-races_human-male.png';

import orcFemale from '../assets/img/race/Ui-charactercreate-races_orc-female.png';
import orcMale from '../assets/img/race/Ui-charactercreate-races_orc-male.png';

import dwarfFemale from '../assets/img/race/Ui-charactercreate-races_dwarf-female.png';
import dwarfMale from '../assets/img/race/Ui-charactercreate-races_dwarf-male.png';

import nightelfFemale from '../assets/img/race/Ui-charactercreate-races_nightelf-female.png';
import nightelfMale from '../assets/img/race/Ui-charactercreate-races_nightelf-male.png';

import undeadFemale from '../assets/img/race/Ui-charactercreate-races_undead-female.png';
import undeadMale from '../assets/img/race/Ui-charactercreate-races_undead-male.png';

import taurenFemale from '../assets/img/race/Ui-charactercreate-races_tauren-female.png';
import taurenMale from '../assets/img/race/Ui-charactercreate-races_tauren-male.png';

import gnomeFemale from '../assets/img/race/Ui-charactercreate-races_gnome-female.png';
import gnomeMale from '../assets/img/race/Ui-charactercreate-races_gnome-male.png';

import trollFemale from '../assets/img/race/Ui-charactercreate-races_troll-female.png';
import trollMale from '../assets/img/race/Ui-charactercreate-races_troll-male.png';

import bloodelfFemale from '../assets/img/race/Ui-charactercreate-races_bloodelf-female.png';
import bloodelfMale from '../assets/img/race/Ui-charactercreate-races_bloodelf-male.png';

import draeneiFemale from '../assets/img/race/Ui-charactercreate-races_draenei-female.png';
import draeneiMale from '../assets/img/race/Ui-charactercreate-races_draenei-male.png';

import noRace from '../assets/img/class/Spell_shadow_nethercloak.png';

const raceSexMap = [
  [noRace, noRace],
  [humanMale, humanFemale],
  [orcMale, orcFemale],
  [dwarfMale, dwarfFemale],
  [nightelfMale, nightelfFemale],
  [undeadMale, undeadFemale],
  [taurenMale, taurenFemale],
  [gnomeMale, gnomeFemale],
  [trollMale, trollFemale],
  [noRace, noRace],
  [bloodelfMale, bloodelfFemale],
  [draeneiMale, draeneiFemale],
];

const gameClassMap = [
  {
    slug: 'Нет класса',
    color: '#da9803',
    icon: noClass,
    number: 0,
  },
  {
    slug: 'Воин',
    color: '#c79c6e',
    icon: warrior,
    number: 1,
  },
  {
    slug: 'Паладин',
    color: '#f58cba',
    icon: paladin,
    number: 2,
  },
  {
    slug: 'Охотник',
    color: '#abd473',
    icon: hunter,
    number: 3,
  },
  {
    slug: 'Разбойник',
    color: '#fff569',
    icon: rogue,
    number: 4,
  },
  {
    slug: 'Жрец',
    color: '#fff',
    icon: priest,
    number: 5,
  },
  {
    slug: 'Рыцарь смерти',
    color: '#c41f3b',
    icon: dk,
    number: 6,
  },
  {
    slug: 'Шаман',
    color: '#0070de',
    icon: shaman,
    number: 7,
  },
  {
    slug: 'Маг',
    color: '#69ccf0',
    icon: mage,
    number: 8,
  },
  {
    slug: 'Чернокнижник',
    color: '#9482c9',
    icon: warlock,
    number: 9,
  },
  {
    slug: 'Друид',
    color: '#ff7d0a',
    icon: druid,
    number: 10,
  },
  {
    slug: 'Друид',
    color: '#ff7d0a',
    icon: druid,
    number: 11,
  },
];

const noSidebarPages = ['/reg', '/auth'];

export { gameClassMap, noSidebarPages, raceSexMap };
