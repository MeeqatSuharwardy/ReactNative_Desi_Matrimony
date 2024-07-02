import APP from './appConstants';

export const appReady = () => ({
    type: APP.READY,
});
  
export const appInit = () => ({
    type: APP.INIT,
});
  
export const appStart = payload => ({
    type: APP.START,
    payload,
});
