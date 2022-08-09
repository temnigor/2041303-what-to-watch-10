export type ServerFilm = {
  id:number
  backgroundImage:string,
    posterImage:string,
    previewImage:string,
    name:string,
    genre:string,
    released:string,
    description: string,
    rating:number,
    scoresCount:number,
    director:string,
    starring: string[],
    runTime: string,
    previewVideoLink:string,
    isFavorite:string,
    backgroundColor:string
  };

export type Film = {
  id:string,
  bigPoster:string,
  poster: string,
  previewImage:string,
  filmName:string,
  genre: string,
  yearCreation : string,
  description:string,
  rating: number,
  ratingCount: number,
  director: string,
  starring: string[],
  runTime: number,
  videoLink:string,
  isFavorite:boolean,
  backgroundColor:string
}


