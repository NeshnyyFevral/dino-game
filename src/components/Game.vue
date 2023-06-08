<template>
  <div
    :class="[
      $style.root,
    ]"
  >
    <Character
      :data="characterData"
      @jump-end="characterData.isJumping = false"
      @bounding-data="intersectionHandler"
    />

    <Trap />
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  watch,
} from 'vue';

import Character from '@/components/Character.vue';
import Trap from '@/components/Trap.vue';
import { useCharacter } from '@/model/Character';

const { characterData, jump } = useCharacter(100, 0, 5);

const intersectionHandler = (character: DOMRect, trap?: DOMRect) => {
  console.log(character);
};

const keyEventHandler = (event: KeyboardEvent) => {
  switch (event.key) {
  case ' ': jump(); break; // space

  default:
  }
};

onMounted(() => {
  window.addEventListener('keydown', keyEventHandler);
});
</script>

<style module lang="scss">
.root {
  height: 400px;
  position: relative;
  margin-top: 50vh;
  transform: translate(-50%, -50%);
  left: 50%;
  display: flex;
  align-items: flex-end;
  border: 1px solid #000;
  width: 1000px;
}
</style>
