import { createSelector } from 'reselect';

const appReducer = state => state.app;

export const selectAppStatus = createSelector(appReducer, app => ({
    root: app.root,
    starting: app.starting,
    ready: app.ready,
    inactive: app.inactive,
    background: app.background,
    db: app.db
}));
