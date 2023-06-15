<template>
  <div
    :class="[
      $style.root,
      levelUp && $style.levelUp,
      failed && $style.failed
    ]"
    @animationend="levelUp = false, failed = false"
    @click="jump()"
  >
    <div :class="$style.actions">
      <button
        :class="$style.button"
        @click.stop="gameStore.isRun ? gameStore.stopGame() : gameStore.startGame()"
      >
        {{ textStartStopButton }}
      </button>
      <div :class="$style.gamePoints">
        {{ gamePoints }} GP (level {{ gameStore.level + 1 }})
      </div>
      <div :class="$style.gamePoints">
        Record: {{ appStorage.get('maxGP') || '0' }}
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
import { type TrapsRefType, useTraps } from '@/model/TrapType';
import { useGameStore } from '@/stores/Game';
import { appStorage } from '@/tools/AppStorageTools';
import {
  intersection,
  random6040,
  randomBetween,
  randomFrom,
} from '@/tools/HelperTools';

let timer: number;
let oldGamePoint: number = 0;

const { characterData, jump } = useCharacter(200, -2);
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

const levelUp = ref<boolean>(false);
const failed = ref<boolean>(false);

const textStartStopButton = computed<string>(() => (gameStore.isRun ? 'Stop game' : 'Start game'));
const timeAlive = computed<number>(() => newTime.value - oldTime.value);
const gamePoints = computed<number>(() => Math.floor(timeAlive.value / 100));

const intersectionHandler = (character: HTMLDivElement, trap: HTMLDivElement) => {
  if (intersection(character, trap)) {
    gameStore.stopGame();
    failed.value = true;
  }
};

const setCharacterRef = (characterRef: HTMLDivElement) => { character.value = characterRef; };
const setTrapsRef = (trapsRef: TrapsRefType) => { traps.value = trapsRef; };

const keyEventHandler = (event: KeyboardEvent) => {
  switch (event.key) {
  case ' ': jump(); break; // space
  case 'Escape': gameStore.stopGame(); break; // esc

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
    const maxGamePoints = appStorage.get('maxGP');
    if (maxGamePoints !== undefined) {
      if (maxGamePoints < newGamePoint) {
        appStorage.set('maxGP', newGamePoint);
      }
    } else {
      appStorage.set('maxGP', newGamePoint);
    }

    if (newGamePoint % 100 === 0) {
      gameStore.level += 1;
      trapsData.value = [];
      levelUp.value = true;
    }

    if (newGamePoint % 15 === 0) {
      const type = <0 | 1>random6040(0, 1);
      if (type === 0) {
        addTrap(0, type);
      } else {
        addTrap(randomBetween(60, 80), type);
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
  border: 5px solid #000;
  width: 90%;

  @media screen and (max-height: 500px) {
    height: 300px;
  }

  @media screen and (max-height: 400px) {
    height: 200px;
  }

  @media screen and (max-width: 1400px) {
    width: 99%;
  }
}

.levelUp {
  animation: levelUp 0.5s step-start;
}

.failed {
  animation: failed 0.5s step-start;
}

.actions {
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: -50px;
  left: 10px;

  @media screen and (max-width: 530px) {
    flex-direction: column;
    top: -110px
  }
}

.gamePoints {
  white-space: nowrap;
  font-size: 30px;
}

.button {
  position: relative;
  background: transparent;
  font-size: 24px;
  border: none;
  cursor: pointer;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background: black;
    bottom: -20px;
    left: 0;
    opacity: 0;

    transition: opacity 0.2s, transform 0.2s;
    transition-timing-function: var(--transform-timing);
  }

  &:hover::after {
    transform: translateY(-20px);
    opacity: 1;
  }
}

@keyframes levelUp {
  to {
    background: rgba(0, 255, 0, 0.1);
  }
}

@keyframes failed {
  to {
    background: rgba(255, 0, 0, 0.1);
  }
}
</style>
