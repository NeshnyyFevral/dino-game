<template>
  <div :class="$style.traps">
    <Trap
      v-for="item in traps"
      :key="item.id"
      :data="item"
      @get-trap-ref="setTrapRef"
      @remove-trap="emits('removeTrap', item.id)"
    >
      <img
        v-if="item.type === 0"
        :class="[
          $style.image,
          item.type === 0 && $style.zombie
        ]"
        src="../assets/zombie1.gif"
        alt="trap"
      >
      <img
        v-else
        :class="$style.image"
        src="../assets/bat.gif"
        alt="trap"
      >
    </Trap>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

import Trap from '@/components/Trap.vue';
import type { TrapsRefType, TrapType } from '@/model/TrapType';

interface PropsType {
  traps: TrapType[]
}

interface EmitsType {
  (e: 'updateTrapsRef', value: TrapsRefType): void,
  (e: 'removeTrap', id: string): void,
}

const props = defineProps<PropsType>();
const emits = defineEmits<EmitsType>();

const trapsRef = ref<{[index: string]: HTMLDivElement}>({});

const setTrapRef = (characterRef: HTMLDivElement, id: string) => {
  const trap = props.traps.find((trap) => trap.id === id);
  trapsRef.value[trap!.id] = characterRef;
};

watchEffect(() => {
  emits('updateTrapsRef', trapsRef.value as TrapsRefType);
});

watchEffect(() => {
  if (!props.traps.length) trapsRef.value = {};
});
</script>

<style module lang="scss">
.traps {
  display: block;
}

.image {
  width: 70px;
  height: 50px;

  @media screen and (max-width: 1000px) {
    width: 50px;
  }
}

.zombie {
  transform: rotateY(180deg);
}
</style>
