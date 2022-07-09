import Main from '../../pages/main';
type TitleFilm = {
  name:string,
  genre: string,
  year: number
}
function App(titleInfo: TitleFilm): JSX.Element {
  return (
    <Main {...titleInfo} />
  );
}

export default App;
