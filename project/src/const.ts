export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  Error = '/404',
  OtherRoute = '*'
}
export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NavMenuMoviePage {
  OVERVIEW = 'Overview',
  DETAILS = 'Details',
  REVIEWS = 'Reviews'
}

export const MainGenreFilter = {
  AllGenres : 'All genres',
  Comedy: 'Comedies',
  Crime : 'Crime',
  Documental : 'Documentary',
  Drama : 'Dramas',
  Horror : 'Horror',
  Kids: 'Kids & Family',
  Romans : 'Romance',
  SciFi : 'Sci-Fi',
  Thriller : 'Thrillers'
};
export enum Rating {
  BAD = 'Bad',
  NORMAL = 'Normal',
  GOOD = 'Good',
  VERY = 'Very good',
  AWESOME = 'Awesome'
}
