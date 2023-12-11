import axios from 'axios';

const storageAvailable = (type: 'localStorage' | 'sessionStorage'): boolean => {
  try {
    const storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e: any) {
    return false;
  }
};

const loadState = (): any | undefined => {
  try {
    if (!storageAvailable('localStorage')) {
      throw new Error('localStorage is not available');
    }

    const serializedState = window.localStorage.getItem('session');

    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);
    axios.defaults.headers.common['Authorization'] = `Bearer ${state.session.token}`;
    return JSON.parse(serializedState);
  } catch (e: any) {
    return undefined;
  }
};
 
const saveState = (state: any): void => {
  try {
    if (!storageAvailable('localStorage')) {
      throw new Error('localStorage is not available');
    }
    
    const serializedState = JSON.stringify(state);
    localStorage.setItem('session', serializedState);
  } catch (e: any) {
    console.log(e.message);
  }
};

export { loadState, saveState };
