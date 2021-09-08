import { createReducer } from '@reduxjs/toolkit';
import { isUndefined } from 'lodash';
import t from 'store/types';
import { persistReducer, purgeStoredState } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  pageTitle: '',
  pageSubtitle: '',
  pageHint: '',
  preferencesPageTitle: '',
  sidebarExpended: true,
  dialogs: {},
  alerts: {},
  drawers: {},
  topbarEditViewId: null,
  requestsLoading: 0,
  backLink: false,
  appIsLoading: true,
  appIntlIsLoading: true,
};

const STORAGE_KEY = 'bigcapital:dashboard';

const CONFIG = {
  key: STORAGE_KEY,
  whitelist: [],
  storage,
};

const reducerInstance = createReducer(initialState, {
  [t.CHANGE_DASHBOARD_PAGE_TITLE]: (state, action) => {
    state.pageTitle = action.pageTitle;
  },

  [t.ALTER_DASHBOARD_PAGE_SUBTITLE]: (state, action) => {
    state.pageSubtitle = action.pageSubtitle;
  },

  [t.CHANGE_DASHBOARD_PAGE_HINT]: (state, action) => {
    state.pageHint = action.payload.pageHint;
  },

  [t.CHANGE_PREFERENCES_PAGE_TITLE]: (state, action) => {
    state.preferencesPageTitle = action.pageTitle;
  },

  [t.OPEN_DIALOG]: (state, action) => {
    state.dialogs[action.name] = {
      isOpen: true,
      payload: action.payload || {},
    };
  },

  [t.CLOSE_DIALOG]: (state, action) => {
    state.dialogs[action.name] = {
      ...state.dialogs[action.name],
      isOpen: false,
    };
  },

  [t.OPEN_ALERT]: (state, action) => {
    state.alerts[action.name] = {
      isOpen: true,
      payload: action.payload || {},
    };
  },

  [t.CLOSE_ALERT]: (state, action) => {
    state.alerts[action.name] = {
      ...state.alerts[action.name],
      isOpen: false,
    };
  },
  [t.OPEN_DRAWER]: (state, action) => {
    state.drawers[action.name] = {
      isOpen: true,
      payload: action.payload || {},
    };
  },
  [t.CLOSE_DRAWER]: (state, action) => {
    state.drawers[action.name] = {
      ...state.drawers[action.name],
      isOpen: false,
    };
  },
  [t.CLOSE_ALL_DIALOGS]: (state, action) => {},

  [t.SET_TOPBAR_EDIT_VIEW]: (state, action) => {
    state.topbarEditViewId = action.id;
  },

  [t.SIDEBAR_EXPEND_TOGGLE]: (state, action) => {
    const { toggle } = action.payload;
    state.sidebarExpended = isUndefined(toggle)
      ? !state.sidebarExpended
      : !!toggle;
  },

  [t.SET_DASHBOARD_BACK_LINK]: (state, action) => {
    const { backLink } = action.payload;
    state.backLink = backLink;
  },

  [t.APP_IS_LOADING]: (state, action) => {
    const { isLoading } = action.payload;
    state.appIsLoading = isLoading;
  },

  [t.APP_INTL_IS_LOADING]: (state, action) => {
    const { isLoading } = action.payload;
    state.appIntlIsLoading = isLoading;
  },

  [t.RESET]: () => {
    purgeStoredState(CONFIG);
  },
});

export default persistReducer(CONFIG, reducerInstance);

export const getDialogPayload = (state, dialogName) => {
  return typeof state.dashboard.dialogs[dialogName] !== 'undefined'
    ? state.dashboard.dialogs[dialogName].payload
    : {};
};

export const getDialogActiveStatus = (state, dialogName) => {
  return true;
};
