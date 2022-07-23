import { MouseEvent, SetStateAction } from 'react';
import { MainGenreFilter } from '../const';

type MainGenreFilterProps = {
  filterName:string,
  setFilterName: (value:SetStateAction<string>)=>void
}

function MainGenreMenu (props:MainGenreFilterProps):JSX.Element {
  const genreMenu:JSX.Element[] = [];
  for(const [key, filter] of Object.entries(MainGenreFilter)) {
    genreMenu.push(
      <li key={filter} className = {`catalog__genres-item ${ props.filterName === filter ? 'catalog__genres-item--active' : ''}`} >
        <a href="#top" id={key}
          onClick={(event:MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            event.currentTarget.textContent !== null
              ? props.setFilterName(event.currentTarget.id)
              : props.setFilterName(MainGenreFilter.AllGenres);
          }}
          className ="catalog__genres-link"
        >
          {filter}
        </a>
      </li>
    );
  }
  return(
    <ul className ="catalog__genres-list">
      {genreMenu}
    </ul>
  );
}
export {MainGenreMenu};

