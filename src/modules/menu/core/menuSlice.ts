import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MenuModel } from '@/models';
import { RootState } from '@/store';

interface IMenuState {
  menuList: MenuModel[];
}

const initialState: IMenuState = {
  menuList: [],
};

const menuSlice = createSlice({
  initialState,
  name: 'menu',
  reducers: {
    setMenuList(state, action: PayloadAction<MenuModel[]>) {
      state.menuList = action.payload;
    },
  },
});

// Actions
const menuActions = menuSlice.actions;

// Select
const selectMenuList = (state: RootState) => state.menu.menuList;

// Reducer
const menuReducer = menuSlice.reducer;

export { menuActions, menuReducer, selectMenuList };
