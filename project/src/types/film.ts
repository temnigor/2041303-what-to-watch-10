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
    runTime: number,
    videoLink:string,
    previewVideoLink:string,
    isFavorite:boolean,
    backgroundColor:string
  };

export type Film = {
  id:number,
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
  videoLinkPlayer:string,
  videoLink:string,
  isFavorite:boolean,
  backgroundColor:string
}


