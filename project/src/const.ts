export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  Error = '/404',
  OtherError = '*'
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

export enum FilterMainNavMenu {
  ALL_GENRES = 'All genres',
  COMEDY = 'Comedies',
  CRIME = 'Crime',
  DOCUMENTAL = 'Documentary',
  DRAMA = 'Dramas',
  HORROR = 'Horror',
  KIDS = 'Kids & Family',
  ROMANS = 'Romance',
  SCI_FI = 'Sci-Fi',
  THRILLER = 'Thrillers'
}

export const GenresFilter = {
  [FilterMainNavMenu.ALL_GENRES] : 'All genres',
  [FilterMainNavMenu.COMEDY] : 'Comedy',
  [FilterMainNavMenu.CRIME] : 'Crime',
  [FilterMainNavMenu.DOCUMENTAL] : 'Documental',
  [FilterMainNavMenu.DRAMA] : 'Drama',
  [FilterMainNavMenu.HORROR] : 'Horror',
  [FilterMainNavMenu.KIDS] : 'Kids & Family',
  [FilterMainNavMenu.ROMANS] : 'Romance',
  [FilterMainNavMenu.SCI_FI] : 'Sci-Fi',
  [FilterMainNavMenu.THRILLER] : 'Thrillers'
};

export enum Rating {
  BAD = 'Bad',
  NORMAL = 'Normal',
  GOOD = 'Good',
  VERY = 'Very good',
  AWESOME = 'Awesome'
}

export const TIME_VIDEO_LAG = 1000;
