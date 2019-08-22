import { IUser } from './types';
import { IReduxAction } from '../types';

interface IUserPayload {
  user: IUser;
}

export interface IState extends IUser {}

const initialState: IState = {
  username: '请登录',
  avatarUrl: '',
};

export default (state = initialState, action: IReduxAction): IState => {
  switch (action.type) {
    case 'GQL_USER_SUCCESS': {
      const { user }: IUserPayload = action.data;
      return {
        ...state,
        ...user,
      };
    }
    default:
      return state;
  }
};
