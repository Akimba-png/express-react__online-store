import { UserStore } from './user-store';

export type RootStore = {
  user: UserStore,
};

export const store: RootStore = {
  user: new UserStore,
};
