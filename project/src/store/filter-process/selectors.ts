import { NameSpace } from '../../const';
import { State } from '../../types/store';

const getFilter = (state:State):string => state[NameSpace.FILTER].filter;
const getFilmFilterCount = (state:State):number => state[NameSpace.FILTER].filmFilterCount;
const getTabsMeaning = (state:State):string => state[NameSpace.FILTER].tabsMeaning;

export{ getFilter, getFilmFilterCount, getTabsMeaning};
