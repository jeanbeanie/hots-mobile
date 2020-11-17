type IThumbnailProps = {
  name: string;
  imageURL: string;
};

export const gameModes: string[] = ['Storm League', 'Quick Match', 'ARAM'];

export const gameMaps: IThumbnailProps[] = [
  {name: 'Tomb of the SpiderQueen', imageURL: '/'},
  {name: 'Dragon Knight', imageURL: '/'},
];

export const gameHeroes: IThumbnailProps[] = [
  {name: 'Lunara', imageURL: '/'},
  {name: 'Raynor', imageURL: '/'},
];
