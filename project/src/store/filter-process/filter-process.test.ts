import { filmFilterCountAction, filterProcess, mainFilterChangAction, tabsMeaningAction} from './filter-process';

describe('Reducer: filterProcess', ()=>{
  it('changes the state should return the changed Filter', ()=>{
    const state = {
      filter:'genre',
      filmFilterCount:0,
      tabsMeaning:'some tabs'
    };
    expect(filterProcess.reducer(state, mainFilterChangAction('some genre')))
      .toEqual({
        filter:'some genre',
        filmFilterCount:0,
        tabsMeaning:'some tabs'
      });
  });
  it('changes the state should return the changed filmFilterCount', ()=>{
    const state = {
      filter:'genre',
      filmFilterCount:0,
      tabsMeaning:'some tabs'
    };
    expect(filterProcess.reducer(state, filmFilterCountAction(10)))
      .toEqual({
        filter:'genre',
        filmFilterCount:10,
        tabsMeaning:'some tabs'
      });
  });
  it('changes the state should return the changed tabsMeaning', ()=>{
    const state = {
      filter:'genre',
      filmFilterCount:0,
      tabsMeaning:'some tabs'
    };
    expect(filterProcess.reducer(state, tabsMeaningAction('correct tabs')))
      .toEqual({
        filter:'genre',
        filmFilterCount:0,
        tabsMeaning:'correct tabs'
      });
  });
});
