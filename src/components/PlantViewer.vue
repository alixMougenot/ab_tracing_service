<script setup lang="ts">
import {
  Visibility,
  type Plant,
  type PlantCreation,
  AquisitionType,
  PlantAquisitionOptions,
  VisibilityOptions,
  diff
} from '@/types'
import { inject, ref } from 'vue'
import { mutatePlantKey, createPlantKey } from '@/logic/provide'

const { modelValue } = defineProps<{ modelValue?: Plant }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: Plant): void
}>()

const placeHolder: PlantCreation = {
  name: '',
  latinName: '',
  notes: '',
  visibility: Visibility.internal,
  isOrganic: true,
  plantingDate: new Date().toISOString().slice(0, 10), // Only the date.
  isStockPlant: false,
  quantity: 0,
  unit: 'plants',
  aquisitionType: AquisitionType.grown,
  plantingSource: null,
  aquisitionPlaces: [],
  aquisitionPurshaseInfo: [],
  graftingSteps: [],
  maturationSteps: [],
  treatmentSteps: []
}

function handleDatesForEdit(plant: PlantCreation) {
  if (plant.plantingDate.length > 10) {
    plant.plantingDate = plant.plantingDate.slice(0, 10) // Only the date.
  }
  return plant
}

function handleDatesForSave(plant: PlantCreation) {
  if (plant.plantingDate.length > 0 && plant.plantingDate.length <= 10) {
    plant.plantingDate = plant.plantingDate + 'T00:00:00Z' // Set the time to midnight
  }
  return plant
}

const mutatePlant = inject(mutatePlantKey)
const createPlant = inject(createPlantKey)

const plant = ref<PlantCreation>(placeHolder)
if (modelValue != null) {
  plant.value = { ...modelValue }
  plant.value = handleDatesForEdit(plant.value)
}

const onSubmit = () => {
  if (mutatePlant && modelValue) {
    const tosave = handleDatesForSave(plant.value)
    const edit = diff(modelValue, tosave)
    console.log('editing plant:', edit)
    mutatePlant(modelValue.id, edit)
    const edited = { ...plant.value, id: modelValue.id }
    emit('update:modelValue', edited)
    plant.value = handleDatesForEdit(plant.value)
  } else if (createPlant && modelValue == undefined) {
    const tosave = handleDatesForSave(plant.value)
    console.log('creating plant:', tosave)
    createPlant(tosave)
    plant.value = handleDatesForEdit(plant.value)
  }
}
</script>

<template>
  <div>
    <form>
      <label>
        Latin Name:
        <input v-model="plant.latinName" type="text" />
      </label>

      <label>
        Name:
        <input v-model="plant.name" type="text" />
      </label>

      <label>
        Notes:
        <textarea v-model="plant.notes"></textarea>
      </label>

      <div class="group">
        <label class="inline">
          Quantity:
          <input v-model="plant.quantity" type="number" />
        </label>
        <label class="inline">
          Unit:
          <input v-model="plant.unit" type="text" />
        </label>
        <label class="inline">
          Is Organic:
          <input v-model="plant.isOrganic" type="checkbox" />
        </label>
      </div>

      <div class="group">
        <label class="inline">
          Planting Date:
          <input v-model="plant.plantingDate" type="date" />
        </label>
        <label class="inline">
          Is Stock Plant:
          <input v-model="plant.isStockPlant" type="checkbox" />
        </label>
      </div>

      <div class="group">
        <label class="inline">
          Aquisition:
          <select v-model="plant.aquisitionType">
            <option
              v-for="option in PlantAquisitionOptions"
              :value="option?.value"
              :key="option?.value"
            >
              {{ option?.label }}
            </option>
          </select>
        </label>
        <label class="inline">
          Visibility:
          <select v-model="plant.visibility">
            <option v-for="option in VisibilityOptions" :value="option?.value" :key="option?.value">
              {{ option?.label }}
            </option>
          </select>
        </label>
      </div>

      <!-- For the array fields, you might need a more complex UI, such as a list with add/remove buttons -->
      <!-- For now, I'll just use a text input where you can enter IDs separated by commas -->

      <section>
        <label v-if="plant.aquisitionType == AquisitionType[AquisitionType.grown]">
          Used Reproductive Material (leave empty when naturally present):
          <input v-model="plant.plantingSource" type="text" />
        </label>
        <label v-else-if="plant.aquisitionType == AquisitionType[AquisitionType.gathered]">
          Where was it gathered:
          <input v-model="plant.aquisitionPurshaseInfo" type="text" />
        </label>
        <label v-else-if="plant.aquisitionType == AquisitionType[AquisitionType.purchased]">
          Where was it bougt:
          <input v-model="plant.aquisitionPurshaseInfo" type="text" />
        </label>
        <label>
          Graftings used:
          <input v-model="plant.graftingSteps" type="text" />
        </label>
        <label>
          Maturation Products used:
          <input v-model="plant.maturationSteps" type="text" />
        </label>
        <label>
          Treatment used:
          <input v-model="plant.treatmentSteps" type="text" />
        </label>
      </section>

      <!-- Add other form fields here... -->
      <button type="submit" @click.prevent="onSubmit">
        {{ modelValue == null ? 'Create' : 'Save' }}
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  row-gap: 0.7rem;
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

  label {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: baseline;

    &.inline {
      flex-direction: row;
      align-items: center;
      gap: 0.3rem;

      input {
        width: auto;
      }
    }

    input {
      width: 100%;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  textarea {
    width: 100%;
  }

  button {
    width: auto;
    flex-grow: 0;
    align-self: flex-end;
  }
}
</style>
