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
  ADVENTURE = 'Adventurers',
  DRAMA = 'Dramas',
  HORROR = 'Horror',
  KIDS = 'Kids & Family',
  ACTIONS = 'Actions',
  FANTASY = 'Fantasy',
  THRILLER = 'Thrillers'
}

export const GenresFilter = {
  [FilterMainNavMenu.ALL_GENRES] : 'All genres',
  [FilterMainNavMenu.COMEDY] : 'Comedy',
  [FilterMainNavMenu.CRIME] : 'Crime',
  [FilterMainNavMenu.ADVENTURE] : 'Adventure',
  [FilterMainNavMenu.DRAMA] : 'Drama',
  [FilterMainNavMenu.HORROR] : 'Horror',
  [FilterMainNavMenu.KIDS] : 'Kids & Family',
  [FilterMainNavMenu.ACTIONS] : 'Action',
  [FilterMainNavMenu.FANTASY] : 'Fantasy',
  [FilterMainNavMenu.THRILLER] : 'Thriller'
};

export enum Rating {
  BAD = 'Bad',
  NORMAL = 'Normal',
  GOOD = 'Good',
  VERY = 'Very good',
  AWESOME = 'Awesome'
}

export enum FavoriteStatus {
FAVORITE = 1,
HEATH = 0
}

export enum CatalogFilm {
  GENRE_FILTER = 'GenreFilter',
  SIMILAR_FILTER = 'SimilarFilter',
  FAVORITE_FILTER = 'FavoriteFilter'
}

export enum NameSpace {
  DATA = 'DATA',
  USER = 'USER',
  MAIN = 'MAIN'
}
