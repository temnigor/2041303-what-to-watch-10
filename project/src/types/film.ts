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
  runTime: string,
  videoLink:string,
  isFavorite:boolean
}
