<!-- Copyright (c) 2023, Alix Mougenot (Au pied des Arbres), alix.mougenot@gmail.com -->
<!-- See license file. -->
<script setup lang="ts">
import PlantEditor from '@/components/PlantEditor.vue'
import PlantView from '@/components/PlantView.vue'
import { plantsKey } from '@/logic/provide'
import type { Plant } from '@/types'
import { inject, ref } from 'vue'

const allPlants = inject(plantsKey)
const currentPlant = ref<Plant | undefined>(undefined)

function selectPlant(id: string) {
  if (!allPlants?.value) {
    currentPlant.value = undefined
    return
  }
  const found_key = allPlants.value.index.get(id)
  if (found_key !== undefined) {
    currentPlant.value = allPlants?.value.list[found_key]
  } else {
    console.error('No plant with id ', id, ' found.')
    currentPlant.value = undefined
  }
}

function reset() {
  currentPlant.value = undefined
}
</script>
<template>
  <div class="main-container">
    <div>
      <div v-if="allPlants && allPlants.list.length > 0">
        <template v-for="plant of allPlants.list" :key="plant.id">
          <br />
          <PlantView :plant="plant" @selected="selectPlant($event)" />
        </template>
      </div>
      <div class="filler" v-else></div>
    </div>
    <div>
      <PlantEditor v-if="!currentPlant" />
      <PlantEditor v-else v-model="currentPlant" @cancel="reset()" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: row;
  column-gap: 3rem;
}

.filler {
  width: 650px;
}

.container-nav {
  position: fixed;
  flex-direction: row;
  top: var(--vp-header-height);
  left: 0;
  width: var(--vp-menu-width);
  min-width: var(--vp-menu-width);
  height: 100%;
  border-right: 1px solid var(--color-border);
  padding-left: var(--vp-margin-right);
}
</style>
