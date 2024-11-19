import { proxy } from 'valtio';
import { useSnapshot } from 'valtio';

interface StoreState {
  open: boolean;
}

const store = proxy<StoreState>({ 
  open: false 
});

export const useStore = () => useSnapshot(store);

export { store };
