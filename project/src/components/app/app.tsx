import Main from '../../pages/main';

const TitleFilmModel = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year:  2014
};
function App( ): JSX.Element {
  return (
    <Main {...TitleFilmModel} />
  );
}

export default App;
