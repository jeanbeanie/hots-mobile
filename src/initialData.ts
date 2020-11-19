import {IThumbnailProps} from './interfaces';

export const gameModes: string[] = ['Storm League', 'Quick Match', 'ARAM'];

export const gameMaps: IThumbnailProps[] = [
  {
    name: 'Tomb of the Spider Queen',
    imageURL: require('./images/maps/spider-queen.jpeg'),
  },
  {name: 'Dragon Knight', imageURL: require('./images/maps/spider-queen.jpeg')},
  {
    name: 'Volkyse Industry',
    imageURL: require('./images/maps/spider-queen.jpeg'),
  },
  {name: 'Pirate Bay', imageURL: require('./images/maps/spider-queen.jpeg')},
  {name: 'Atarac Pass', imageURL: require('./images/maps/spider-queen.jpeg')},
  {
    name: 'Battlefield of Eternity',
    imageURL: require('./images/maps/spider-queen.jpeg'),
  },
];

export const gameHeroes: IThumbnailProps[] = [
  {name: 'Lunara', imageURL: require('./images/heroes/lunara.jpg')},
  {name: 'Raynor', imageURL: require('./images/heroes/lunara.jpg')},
];
