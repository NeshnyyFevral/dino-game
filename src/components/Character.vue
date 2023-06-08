<template>
  <div
    ref="character"
    :class="[
      $style.root,
      data.isJumping && $style.jump
    ]"
    :style="{
      'left': `${data.x}px`,
      'bottom': `${data.y}px`,
    }"
    @animationend="emits('jumpEnd')"
  >
    @
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted, ref, watch,
} from 'vue';

import type { Character } from '@/model/Character';

interface PropsType {
  data: Character
}

interface EmitsType {
  (e: 'jumpEnd');
  (e: 'bounding-data', value: DOMRect);
}

const props = defineProps<PropsType>();
const emits = defineEmits<EmitsType>();

const character = ref<HTMLDivElement | null>(null);
const isRun = ref<boolean>(false);

onMounted(() => {
  isRun.value = true;
});

let timer: number;
watch(() => props.data.isJumping, () => {
  if (props.data.isJumping) {
    timer = setInterval(() => {
      emits('bounding-data', character.value!.getBoundingClientRect());
    }, 30);
  } else {
    clearInterval(timer);
  }
}, { deep: true });
</script>

<style module lang="scss">
.root {
  position: absolute;
  font-size: 30px;
}

.jump {
  animation: isJump 1s;
}

@keyframes isJump {
  0% {
    bottom: 0;
  }

  50% {
    bottom: 50px;
  }

  100% {
    bottom: 0;
  }
}
</style>
