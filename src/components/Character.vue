<template>
  <div
    ref="character"
    :class="[
      $style.root,
      gameStore.isRun && $style.move,
      data.isJumping && $style.jump
    ]"
    @animationend="emits('jumpEnd')"
  />
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
  watchEffect,
} from 'vue';

import type { CharacterType } from '@/model/CharacterType';
import { useGameStore } from '@/stores/Game';

interface PropsType {
  data: CharacterType
}

interface EmitsType {
  (e: 'jumpEnd'): void;
  (e: 'getCharacterRef', value: HTMLDivElement): void;
}

const props = defineProps<PropsType>();
const emits = defineEmits<EmitsType>();

const gameStore = useGameStore();

const character = ref<HTMLDivElement | null>(null);
const isRun = ref<boolean>(false);

const left = computed<string>(() => `${props.data.x}px`);
const bottom = computed<string>(() => `${props.data.y}px`);

onMounted(() => {
  isRun.value = true;
});

watchEffect(() => {
  if (character.value !== null) {
    emits('getCharacterRef', <HTMLDivElement>character.value);
  }
});
</script>

<style module lang="scss">
.root {
  --character-left: v-bind(left);
  --character-bottom: v-bind(bottom);

  position: absolute;
  left: var(--character-left);
  bottom: var(--character-bottom);
  font-size: 30px;
  width: 35px;
  height: 40px;
  z-index: 10;
  border-radius: 10px;

  background: url("src/assets/character.png");
  background-position: 0 2px;
  background-size: 180px;
}

.move {
  animation: isMove 0.85s infinite step-end;
}

.jump {
  animation: isJump 0.8s linear, move 0.85s infinite step-end;
}

@keyframes isJump {
  0% {
    bottom: 10px;
  }

  10% {
    bottom: 30px;
  }

  20% {
    bottom: 50px;
  }

  30% {
    bottom: 60px;
  }

  40% {
    bottom: 70px;
  }

  50% {
    bottom: 80px;
  }

  60%  {
    bottom: 70px;
  }

  70% {
    bottom: 60px;
  }

  80% {
    bottom: 50px;
  }

  90% {
    bottom: 20px;
  }

  100% {
    bottom: 0;
  }
}

@keyframes isMove {
  0% {
    background-position: 0 2px;
  }

  15% {
    background-position: -34px -1px;
  }

  30% {
     background-position: -70px -3px;
   }

  45% {
    background-position: -110px -3px;
  }

  60% {
    background-position: 0 -48px;
  }

  75% {
    background-position: -34px -49px;
  }

  90% {
    background-position: -70px -48px;
  }

  100% {
    background-position: -110px -51px;
  }
}
</style>
