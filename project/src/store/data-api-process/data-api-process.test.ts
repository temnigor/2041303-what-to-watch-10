import { dataAPIProcess, setIsErrorResponseAction } from './data-api-process';

describe('Reducer: dataAPIProcess', ()=>{
  it('changes the state should return the changed isErrorResponse for boolean', ()=>{
    const state = {
      allFilms:[],
      similarFilms:[],
      favoriteFilms:[],
      openedFilm: undefined,
      promoFilm:undefined,
      isErrorResponse:false,
      isLoadingFilms:true,
      reviews:[],
    };
    expect(dataAPIProcess.reducer(state, setIsErrorResponseAction(true)))
      .toEqual({
        allFilms:[],
        similarFilms:[],
        favoriteFilms:[],
        openedFilm: undefined,
        promoFilm:undefined,
        isErrorResponse:true,
        isLoadingFilms:true,
        reviews:[],
      });
  });
});
