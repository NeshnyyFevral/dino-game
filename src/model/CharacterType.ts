import { ref } from 'vue';

import { useGameStore } from '@/stores/Game';

export interface CharacterType {
    x: number;
    y: number;
    isJumping: boolean;
    isFailing: boolean;
}

export const useCharacter = (x: number = 0, y: number = 0) => {
  const gameStore = useGameStore();

  const character = ref<CharacterType>({
    x,
    y,
    isFailing: false,
    isJumping: false,
  });

  const jump = () => {
    if (!gameStore.isRun) {
      gameStore.isRun = true;
    }

    character.value.isJumping = true;
  };

  return { characterData: character, jump };
};
