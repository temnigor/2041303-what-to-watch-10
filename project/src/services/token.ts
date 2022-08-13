const AUT_TOKEN_KEY_NAME = 'guess-what-to-watch';

export type Token = string;

export const getToken = ():Token => {
  const token = localStorage.getItem(AUT_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token:Token):void => {
  localStorage.setItem(AUT_TOKEN_KEY_NAME, token);
};

export const removeToken = ():void => {
  localStorage.removeItem(AUT_TOKEN_KEY_NAME);
};
