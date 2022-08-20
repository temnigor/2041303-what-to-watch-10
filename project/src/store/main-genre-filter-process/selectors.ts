import { NameSpace } from '../../const';
import { State } from '../../types/store';

const getFilter = (state:State):string => state[NameSpace.MAIN].filter;
const getFilmFilterCount = (state:State):number => state[NameSpace.MAIN].filmFilterCount;

export{ getFilter, getFilmFilterCount};
