const AUT_TOKEN_KEY_NAME = 'guess-what-to-watch';

export type Token = string;

const getToken = ():Token => {
  const token = localStorage.getItem(AUT_TOKEN_KEY_NAME);
  return token ?? '';
};

const saveToken = (token:Token):void => {
  localStorage.setItem(AUT_TOKEN_KEY_NAME, token);
};

const removeToken = ():void => {
  localStorage.removeItem(AUT_TOKEN_KEY_NAME);
};

export {getToken, saveToken, removeToken};
