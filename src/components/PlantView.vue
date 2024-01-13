<script setup lang="ts">
import { type Plant, AquisitionType } from '@/types'

const { plant } = defineProps<{ plant: Plant }>()
const emit = defineEmits<{
  (e: 'selected', value: string): void
}>()
const verb = (() => {
  switch (plant.aquisitionType) {
    case AquisitionType.Grown:
      return 'Locally produced'
    case AquisitionType.Gathered:
      return 'Gathered in the wild'
    case AquisitionType.Purchased:
      return 'Puschased'
    default:
      return 'Made'
  }
})()

function handleClick() {
  emit('selected', plant.id)
}
</script>

<template>
  <div class="flex">
    <div class="inline">
      <h3>
        {{ plant.name }}
        {{ plant.isOrganic ? '- AB' : '' }}
      </h3>
      <h4>({{ plant.latinName }} - {{ new Date(plant.plantingDate).getFullYear() }})</h4>
      <span class="button" @click.stop="handleClick">Edit</span>
    </div>

    <span
      >{{ verb + ' ' + plant.quantity + ' ' + plant.unit }} in
      {{
        new Date(plant.plantingDate).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric'
        })
      }}. {{ plant.isStockPlant ? 'This plant is part of our stock plants.' : '' }}
    </span>
    <p>
      {{ plant.notes }}
    </p>

    <div class="group">TODO: Display tracing info.</div>
  </div>
</template>

<style scoped lang="scss">
.flex {
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
  max-width: 650px;

  .group {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    margin-top: 0.3rem;
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    margin-top: 1.5rem;
  }

  .inline {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.3rem;
  }

  span.button {
    text-decoration: underline;
    cursor: pointer;
    margin-left: auto;
  }
}
</style>
