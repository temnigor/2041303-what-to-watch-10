import { createAction } from '@reduxjs/toolkit';

export const redirectRouteTo = createAction<string>('redirect');
