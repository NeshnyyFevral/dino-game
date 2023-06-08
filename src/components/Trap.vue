<template>
  <div
    :class="[
      $style.root,
      isRun && $style.isRun
    ]"
  >
    I
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isRun = ref<boolean>(false);

onMounted(() => {
  isRun.value = true;
});
</script>

<style module lang="scss">
.root {
  position: absolute;
  bottom: 0;
  left: 50%;
  font-size: 38px;
  line-height: 26px;
}

.isRun {
  animation: isRun infinite 3s;
}

@keyframes isRun {
  @for $i from 0% through 100% {
    #{$i} {
      left: calc(100% - $i);
    }
  }
}
</style>
