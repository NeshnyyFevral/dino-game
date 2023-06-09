<template>
  <div
    ref="character"
    :class="[
      $style.root,
      gameStore.isRun && data.isJumping && $style.jump
    ]"
    @animationend="emits('jumpEnd')"
  >
    @
  </div>
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
  (e: 'jumpEnd');
  (e: 'getCharacterRef', value: HTMLDivElement);
}

const props = defineProps<PropsType>();
const emits = defineEmits<EmitsType>();

const gameStore = useGameStore();

const character = ref<HTMLDivElement | null>(null);
const isRun = ref<boolean>(false);

const left = computed<string>(() => `${props.data.x}px`);
const bottom = computed<string>(() => `100% - ${props.data.y}px`);

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
}

.jump {
  animation: isJump 0.7s;
}

@keyframes isJump {
  0% {
    bottom: 0;
  }

  50% {
    bottom: 70px;
  }

  100% {
    bottom: 0;
  }
}
</style>
