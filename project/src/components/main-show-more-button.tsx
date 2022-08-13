import { MouseEvent } from 'react';
import { useAppSelector } from '../hooks';
const SLICE_STEP = 8;
type MainShowMoreButtonProps = {
  setSlice: (slice: number) => void,
  sliceEnd: number
  }
function MainShowMoreButton (props:MainShowMoreButtonProps) {
  const {filmsFiltered} = useAppSelector((state)=>state);

  return(
    <div className ="catalog__more">
      {props.sliceEnd === filmsFiltered.length || filmsFiltered.length === 0
        ? null
        :
        <button className ="catalog__button" type="button" onClick={(evt:MouseEvent<HTMLButtonElement>)=>{
          const slice = props.sliceEnd + SLICE_STEP;
          filmsFiltered.length < slice
            ? props.setSlice(filmsFiltered.length)
            : props.setSlice(slice);
        }}
        >
    Show more
        </button>}
    </div>
  );
}
export {MainShowMoreButton};
