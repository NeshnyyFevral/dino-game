import { ref } from 'vue';

export interface TrapType {
  id: string;
  y: number;
}

export interface TrapsRefType {
  [index: string]: HTMLDivElement
}

export const useTraps = () => {
  const trapsData = ref<TrapType[]>([]);

  const addTrap = (height: number) => {
    trapsData.value.push({
      id: Math.random().toString(16).substring(2, 10),
      y: height,
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
