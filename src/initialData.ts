import {IThumbnailProps} from './interfaces';

interface IGameModes {
  name: string;
  activeMaps: gameMapKeys[];
}

enum gameMapKeys {
  'spider',
  'dragon',
  'volkskaya',
  'blackheart',
  'boe',
  'aterac',
  'aram',
}

export const gameModes: IGameModes[] = [
  {
    name: 'Storm League',
    activeMaps: [
      gameMapKeys.spider,
      gameMapKeys.dragon,
      gameMapKeys.volkskaya,
      gameMapKeys.aterac,
      gameMapKeys.boe,
    ],
  },
  {
    name: 'Quick Match',
    activeMaps: [
      gameMapKeys.spider,
      gameMapKeys.blackheart,
      gameMapKeys.aterac,
      gameMapKeys.dragon,
      gameMapKeys.volkskaya,
      gameMapKeys.boe,
    ],
  },
  {name: 'ARAM', activeMaps: [gameMapKeys.aram]},
];

interface IGameMap extends IThumbnailProps {
  key: gameMapKeys;
}

export const gameMaps: IGameMap[] = [
  {
    name: 'Tomb of the Spider Queen',
    imageURL: require('./images/maps/spider-queen.jpeg'),
    key: gameMapKeys.spider,
  },
  {
    name: 'Dragon Knight',
    key: gameMapKeys.dragon,
    imageURL: require('./images/maps/dragon-knight.png'),
  },
  {
    name: 'Volskaya Industries',
    imageURL: require('./images/maps/volskaya.png'),
    key: gameMapKeys.volkskaya,
  },
  {
    name: 'Pirate Bay',
    key: gameMapKeys.blackheart,
    imageURL: require('./images/maps/blackhearts-bay.jpeg'),
  },
  {
    name: 'Atarac Pass',
    key: gameMapKeys.aterac,
    imageURL: require('./images/maps/alterac.jpeg'),
  },
  {
    name: 'Battlefield of Eternity',
    key: gameMapKeys.boe,
    imageURL: require('./images/maps/boe.png'),
  },
  {
    name: 'ARAM',
    key: gameMapKeys.aram,
  },
];

export const gameHeroes: IThumbnailProps[] = [
  {name: 'Lunara', imageURL: require('./images/heroes/lunara.png')},
  {name: 'Raynor', imageURL: require('./images/heroes/raynor.png')},
  {name: 'Mei', imageURL: require('./images/heroes/mei.jpeg')},
  {name: 'Brightwing', imageURL: require('./images/heroes/brightwing.png')},
];
