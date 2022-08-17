import { useAppSelector } from "../hooks";

const SLICE_STEP = 8;
type MainShowMoreButtonProps = {
  setSlice: (slice: number) => void,
  sliceEnd: number
  }
function MainShowMoreButton ({setSlice, sliceEnd}:MainShowMoreButtonProps) {
  const{filmFilterCount} = useAppSelector((state)=>state);
  return(
    <div className="catalog__more">
      {sliceEnd >= filmFilterCount || filmFilterCount === 0
        ? null
        :
        <button className="catalog__button" type="button" onClick={()=>{
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
