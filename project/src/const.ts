export const SLICE_STEP = 8;
export const ALL_GENRE = 'All genres';

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

export enum APIRoute {
  Films = '/films',
  OneFilm = '/films/{filmId}',
  SimilarFilms = 'films/{filmId}/similar',
  PromoFilm = '/promo',
  FavoriteFilms = '/favorite',
  PostFavorite = '/favorite/{filmId}/{status}',
  Comments = '/comments/{filmId}',
  Login = '/login',
  logout = '/logout'
}

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown',
}

export enum NavMenuMoviePage {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews'
}

export enum Rating {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  Very = 'Very good',
  Awesome = 'Awesome'
}

export enum CatalogFilm {
  GenreFilter = 'GenreFilter',
  SimilarFilter = 'SimilarFilter',
  FavoriteFilter = 'FavoriteFilter'
}

export enum NameSpace {
  Data = 'Data',
  User = 'User',
  Filter = 'Filter'
}
