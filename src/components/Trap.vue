<template>
  <div
    ref="trap"
    :class="[
      $style.root,
      gameStore.isRun && $style.isMove
    ]"
    @animationend="emits('removeTrap')"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  ref,
} from 'vue';

import type { TrapType } from '@/model/TrapType';
import { useGameStore } from '@/stores/Game';

interface PropsType {
  data: TrapType
}

interface EmitsType {
  (e: 'getTrapRef', value: HTMLDivElement, id: string): void,
  (e: 'removeTrap'): void,
}

const props = defineProps<PropsType>();
const emits = defineEmits<EmitsType>();

const gameStore = useGameStore();

const trap = ref<HTMLDivElement | null>(null);

const bottom = computed<string>(() => `${props.data.y}px`);

onMounted(() => {
  emits('getTrapRef', <HTMLDivElement>trap.value, props.data.id);
});
</script>

<style module lang="scss">
.root {
  --trap-bottom: v-bind(bottom);

  opacity: 0;
  position: absolute;
  font-size: 38px;
  line-height: 26px;
}

.isMove {
  animation: move 3s;
}

@keyframes move {
  @for $i from 0% through 100% {
    #{$i} {
      opacity: 1;
      left: calc(100% - $i);
      bottom: var(--trap-bottom);
    }
  }
}
</style>
