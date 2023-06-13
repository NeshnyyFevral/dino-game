import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGameStore = defineStore('game', () => {
  const isRun = ref<boolean>(false);
  const FPS: number = 60;
  const level: number = 0;

  const startGame = () => {
    isRun.value = true;
  };

  const stopGame = () => {
    isRun.value = false;
  };

  return {
    level,
    isRun,
    startGame,
    stopGame,
    FPS,
  };
});
