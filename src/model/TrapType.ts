import { ref } from 'vue';

export interface TrapType {
  id: string;
  y: number;
  type: 1 | 0;
}

export interface TrapsRefType {
  [index: string]: HTMLDivElement
}

export const useTraps = () => {
  const trapsData = ref<TrapType[]>([]);

  const addTrap = (height: number, type?: 0 | 1) => {
    trapsData.value.push({
      id: Math.random().toString(16).substring(2, 10),
      y: height,
      type: type || 0,
    });
  };

  const removeTrap = (trapId: string) => {
    trapsData.value = trapsData.value.filter((trap) => trap.id !== trapId);
  };

  return {
    trapsData,
    addTrap,
    removeTrap,
  };
};
