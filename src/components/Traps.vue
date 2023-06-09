<template>
  <div :class="$style.traps">
    <Trap
      v-for="item in traps"
      :key="item.id"
      :data="item"
      @get-trap-ref="setTrapRef"
      @remove-trap="emits('removeTrap', item.id)"
    >
      III
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
  trapsRef.value[trap.id] = characterRef;
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

}
</style>
