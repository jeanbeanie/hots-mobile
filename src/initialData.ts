import {IThumbnailProps} from './interfaces';

export const gameModes: string[] = ['Storm League', 'Quick Match', 'ARAM'];

export const gameMaps: IThumbnailProps[] = [
  {
    name: 'Tomb of the Spider Queen',
    imageURL: require('./images/maps/spider-queen.jpeg'),
  },
  {name: 'Dragon Knight', imageURL: require('./images/maps/dragon-knight.png')},
  {
    name: 'Volskaya Industries',
    imageURL: require('./images/maps/volskaya.png'),
  },
  {name: 'Pirate Bay', imageURL: require('./images/maps/blackhearts-bay.jpeg')},
  {name: 'Atarac Pass', imageURL: require('./images/maps/alterac.jpeg')},
  {
    name: 'Battlefield of Eternity',
    imageURL: require('./images/maps/boe.png'),
  },
];

export const gameHeroes: IThumbnailProps[] = [
  {name: 'Lunara', imageURL: require('./images/heroes/lunara.png')},
  {name: 'Raynor', imageURL: require('./images/heroes/raynor.png')},
  {name: 'Mei', imageURL: require('./images/heroes/mei.jpeg')},
  {name: 'Brightwing', imageURL: require('./images/heroes/brightwing.png')},
];
