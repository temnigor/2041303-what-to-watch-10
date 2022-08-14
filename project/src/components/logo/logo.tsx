import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
type LogoProps = {
  footer?:boolean,
}
function Logo ({footer}:LogoProps):JSX.Element {
  const footerClassName = 'logo__link--light';
  return(
    <div className="logo">
      <Link className= {`logo__link ${footer ? footerClassName : ''}`} to = {AppRoute.Main} >
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}
export default Logo;
