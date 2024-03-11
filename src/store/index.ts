import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { setRafInterval } from '@/utils/raf';

import { getSumDuration } from '../core/doc/raw-doc';

import { type AppSliceAction, type AppSliceState, createAppSlice } from './app';

export function createStore() {
  const useStore = create<AppSliceState & AppSliceAction>()(
    devtools(createAppSlice)
  );

  /**
   * start the interval
   */
  setRafInterval((delta) => {
    const { doc, currentTime, playing, setCurrentTime } = useStore.getState();

    if (!playing) {
      return;
    }

    const totalDuration = getSumDuration(doc);
    const newCurrentTime = (currentTime + delta) % totalDuration;

    setCurrentTime(newCurrentTime);
  });

  return useStore;
}

export const useStore = createStore();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).__useStore = useStore;
