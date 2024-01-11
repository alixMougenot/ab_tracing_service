<!-- Copyright (c) 2023, Alix Mougenot (Au pied des Arbres), alix.mougenot@gmail.com -->
<!-- See license file. -->
<script setup lang="ts">
import PlantViewer from '@/components/PlantViewer.vue'
import { plantsKey } from '@/logic/provide'
import { inject } from 'vue'

const allPlants = inject(plantsKey)
</script>
<template>
  <div class="main-container">
    <div v-if="allPlants">
      <br />
      <PlantViewer />
      <template v-for="plant of allPlants.list" :key="plant.id">
        <br />
        <PlantViewer :modelValue="plant" />
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
