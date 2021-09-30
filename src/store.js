import { initializeStore } from 'fluxible-js';

function getInitialStore() {
  return {
    user: null
  };
}

initializeStore({
  initialStore: getInitialStore(),
  persist: {
    useJSON: false,
    syncStorage: window.localStorage,
    restore: savedStore => ({
      user: savedStore.user
    })
  }
});