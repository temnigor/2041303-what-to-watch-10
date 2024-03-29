import { SLICE_STEP } from '../../const';
import { useAppSelector } from '../../hooks';
import { getFilmFilterCount } from '../../store/filter-process/selectors';

type MainShowMoreButtonProps = {
  setSlice: (slice: number) => void,
  sliceEnd: number
  }
function MainShowMoreButton ({setSlice, sliceEnd}:MainShowMoreButtonProps) {
  const filmFilterCount = useAppSelector(getFilmFilterCount);
  return(
    <div className="catalog__more">
      {sliceEnd >= filmFilterCount || filmFilterCount === 0
        ? null
        :
        <button className="catalog__button" type="button"
          onClick={()=>{
            const slice = sliceEnd + SLICE_STEP;
            filmFilterCount < slice
              ? setSlice(filmFilterCount)
              : setSlice(slice);
          }}
        >
    Show more
        </button>}
    </div>
  );
}
export {MainShowMoreButton};
