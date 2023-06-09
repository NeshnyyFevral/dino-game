import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGameStore = defineStore('game', () => {
  const isRun = ref<boolean>(false);
  const gameId = ref<string>('');
  const FPS: number = 60;
  const countOfTraps = ref<number>(0);

  const startGame = () => {
    isRun.value = true;
    gameId.value = Math.random().toString(16).substring(2, 8);
  };

  const stopGame = () => {
    isRun.value = false;
  };

  return {
    gameId,
    isRun,
    startGame,
    stopGame,
    FPS,
    countOfTraps,
  };
});
