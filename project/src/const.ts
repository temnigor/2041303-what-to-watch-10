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

export const MainGenreFilter = {
  'ALL_GENRES' : 'All genres',
  'COMEDY' : 'Comedies',
  'CRIME' : 'Crime',
  'DOCUMENTAL' : 'Documentary',
  'DRAMA' : 'Dramas',
  'HORROR' : 'Horror',
  'KIDS' : 'Kids & Family',
  'ROMANS' : 'Romance',
  'SCI_FI' : 'Sci-Fi',
  'THRILLER' : 'Thrillers'
};

export const GenresFilter = {
  'ALL_GENRES' : 'All genres',
  'COMEDY' : 'Comedy',
  'CRIME' : 'Crime',
  'DOCUMENTAL' : 'Documental',
  'DRAMA' : 'Drama',
  'HORROR' : 'Horror',
  'KIDS' : 'Kids & Family',
  'ROMANS' : 'Romance',
  'SCI_FI' : 'Sci-Fi',
  'THRILLER' : 'Thrillers'
};

export enum Rating {
  BAD = 'Bad',
  NORMAL = 'Normal',
  GOOD = 'Good',
  VERY = 'Very good',
  AWESOME = 'Awesome'
}

export const TIME_VIDEO_LAG = 1000;
