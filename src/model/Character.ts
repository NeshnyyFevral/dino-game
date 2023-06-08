import { ref } from 'vue';

export interface Character {
    x: number;
    y: number;
    speed: number;
    isJumping: boolean;
    isFailing: boolean;
}

export const useCharacter = (x: number = 0, y: number = 0, speed: number = 0) => {
  const character = ref<Character>({
    x,
    y,
    speed,
    isFailing: false,
    isJumping: false,
  });

  const jump = () => {
    character.value.isJumping = true;
  };

  return { characterData: character, jump };
};
