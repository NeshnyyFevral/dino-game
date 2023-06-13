<template>
  <div :class="$style.root">
    <div :class="$style.actions">
      <button
        :class="$style.button"
        @click.prevent="gameStore.isRun ? gameStore.stopGame() : gameStore.startGame()"
      >
        {{ textStartStopButton }}
      </button>
      <div :class="$style.gamePoints">
        {{ gamePoints }} GP (level {{ gameStore.level + 1 }})
      </div>
    </div>

    <Character
      :data="characterData"
      @jump-end="characterData.isJumping = false"
      @get-character-ref="setCharacterRef"
    />

    <Traps
      :traps="trapsData"
      @update-traps-ref="setTrapsRef"
      @remove-trap="localeRemoveTrap"
    />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';

import Character from '@/components/Character.vue';
import Traps from '@/components/Traps.vue';
import { useCharacter } from '@/model/CharacterType';
import { random, random7525 } from '@/model/Helpers';
import { TrapsRefType, useTraps } from '@/model/TrapType';
import { useGameStore } from '@/stores/Game';

let timer: number;
let oldGamePoint: number = 0;

const { characterData, jump } = useCharacter(200, 0);
const {
  trapsData,
  addTrap,
  removeTrap,
} = useTraps();
const gameStore = useGameStore();

const character = ref<HTMLDivElement | null>(null);
const traps = ref<TrapsRefType>({});
const oldTime = ref<number>(0);
const newTime = ref<number>(0);

const textStartStopButton = computed<string>(() => (gameStore.isRun ? 'Stop game' : 'Start game'));
const timeAlive = computed<number>(() => newTime.value - oldTime.value);
const gamePoints = computed<number>(() => Math.floor(timeAlive.value / 100));

const intersectionHandler = (character: HTMLDivElement, trap: HTMLDivElement) => {
  const characterRect = character.getBoundingClientRect();
  const trapRect = trap.getBoundingClientRect();

  const valueInRange = (value: number, min: number, max: number) => (value >= min) && (value <= max);

  const xIntersection = valueInRange(characterRect.left, trapRect.left, trapRect.right)
      || valueInRange(trapRect.left, characterRect.left, characterRect.right);

  const yIntersection = valueInRange(characterRect.top, trapRect.top, trapRect.bottom)
      || valueInRange(trapRect.top, characterRect.top, characterRect.bottom);

  if (xIntersection && yIntersection) {
    gameStore.stopGame();
  }
};

const setCharacterRef = (characterRef: HTMLDivElement) => { character.value = characterRef; };
const setTrapsRef = (trapsRef: TrapsRefType) => { traps.value = trapsRef; };

const keyEventHandler = (event: KeyboardEvent) => {
  switch (event.key) {
  case ' ': jump(); break; // space

  default:
  }
};

const nextTick = () => {
  newTime.value = Date.now();
  if (character.value && Object.values(traps.value).every((trap) => !!trap)) {
    Object.values(traps.value).forEach((trap) => {
      intersectionHandler(<HTMLDivElement>character.value, <HTMLDivElement>trap);
    });
  }
};

const localeRemoveTrap = (id: string) => {
  removeTrap(id);
  delete traps.value[id];
};

onMounted(async () => {
  window.addEventListener('keydown', keyEventHandler);
});

onUnmounted(() => {
  window.removeEventListener('keydown', keyEventHandler);
});

watch(() => gameStore.isRun, async () => {
  trapsData.value = [];

  if (gameStore.isRun) {
    oldTime.value = Date.now();
    newTime.value = Date.now();
    gameStore.level = 0;

    addTrap(0);

    timer = window.setInterval(nextTick, 1000 / gameStore.FPS);
  } else {
    oldGamePoint = 0;
    clearInterval(timer);
  }
});

watch(() => gamePoints.value, () => {
  const newGamePoint = gamePoints.value;

  if (oldGamePoint !== newGamePoint) {
    if (newGamePoint % 100 === 0) {
      gameStore.level += 1;
      trapsData.value = [];
    }

    if (newGamePoint % 15 === 0) {
      const type = <0 | 1>random7525(0, 1);
      if (type === 0) {
        addTrap(0, type);
      } else {
        addTrap(random(60, 80), type);
      }
    }
    oldGamePoint = newGamePoint;
  }
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
  width: 90%;
}

.actions {
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 20px;
  left: 10px;
}

.gamePoints {
  font-size: 30px;
}

.button {
  position: relative;
  background: transparent;
  font-size: 24px;
  border: none;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: black;
    bottom: -20px;
    left: 0;
    opacity: 0;

    transition: opacity 0.2s,
            transform 0.2s;
    transition-timing-function: var(--transform-timing);
  }

  &:hover::after {
    transform: translateY(-20px);
    opacity: 1;
  }
}
</style>
