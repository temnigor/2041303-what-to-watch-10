import { nanoid } from 'nanoid';
import { Film } from '../types/film';

const getRandomPoster = (arr:string[]) => arr[Math.floor(Math.random() * arr.length)];
const getRandomRating = () => Number((Math.random() * 10).toFixed(1));
const getRandomBoolean = () => Boolean(Math.floor(Math.random() * 2));
const poster = [
  './img/the-grand-budapest-hotel-poster.jpg',
  './img/aviator.jpg',
  './img/macbeth.jpg',
  './img/johnny-english.jpg',
  './img/bohemian-rhapsody.jpg'
];

const film = () => ({
  id: nanoid(5),
  bigPoster:'./img/bg-the-grand-budapest-hotel.jpg',
  poster: getRandomPoster(poster),
  previewImage: getRandomPoster(poster),
  filmName:'The Grand Budapest Hotel',
  genre: 'Drama',
  yearCreation : '2014',
  description:'In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave\'s friend and protege.Gustave prides himself on providing first-class service to the hotel\'s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave\'s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.',
  rating: getRandomRating(),
  ratingCount: 240,
  director: 'Wes Anderson',
  starring: [
    'Bill Murray',
    'Edward Norton',
    'Jude Law',
    'Willem Dafoe',
    'Saoirse Ronan',
    'Tony Revoloru',
    'Tilda Swinton',
    'Tom Wilkinson',
    'Owen Wilkinson',
    'Adrien Brody',
    'Ralph Fiennes',
    'Jeff Goldblum',
  ],
  runTime: '1h 39m',
  videoLink:'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
  isFavorite: getRandomBoolean()
});

const getFilms = ():Film[]=> Array.from({length:25}, ()=>film());
export {getFilms};
