import { useAppSelector } from '../hooks';

export function UserSignErrorMassage ():JSX.Element | null {
  const {isErrorAuth} = useAppSelector((state)=>state);
  return(isErrorAuth) ?
    <div className="sign-in__message">
      <p>We can’t recognize this email <br/> and password combination. Please try again.</p>
    </div>
    : null;
}
