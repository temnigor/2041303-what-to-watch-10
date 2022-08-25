import { NameSpace } from '../../const';
import { State } from '../../types/store';

const getFilter = (state:State):string => state[NameSpace.Filter].filter;
const getFilmFilterCount = (state:State):number => state[NameSpace.Filter].filmFilterCount;
const getTabsMeaning = (state:State):string => state[NameSpace.Filter].tabsMeaning;

export{ getFilter, getFilmFilterCount, getTabsMeaning};
