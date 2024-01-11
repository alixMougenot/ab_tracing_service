<!-- Copyright (c) 2023, Alix Mougenot (Au pied des Arbres), alix.mougenot@gmail.com -->
<!-- See license file. -->
<script setup lang="ts">
import type {
  GatheringPlace,
  GatheringPlaceCreation,
  GatheringPlaceEdit,
  GrowingMaterial,
  GrowingMaterialEdit,
  PlantTreatment,
  PlantTreatmentEdit,
  PlantTreatmentCreation,
  SupplyInfo,
  SupplyInfoEdit,
  SupplyInfoCreation,
  GrowingMaterialCreation,
  PlantReproductionMaterial,
  PlantReproductionMaterialEdit,
  PlantReproductionMaterialCreation,
  Plant,
  PlantEdit,
  PlantCreation
} from '@/types'

import { provide, computed } from 'vue'
import { RouterView } from 'vue-router'
import { useMutation, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import {
  gatheringPlacesKey,
  mutateGatheringPlaceKey,
  createGatheringPlaceKey,
  supplyInfoKey,
  mutateSupplyInfoKey,
  createSupplyInfoKey,
  growingMaterialsKey,
  mutateGrowingMaterialKey,
  createGrowingMaterialKey,
  plantTreatmentsKey,
  mutatePlantTreatmentKey,
  createPlantTreatmentKey,
  plantReproductionMaterialsKey,
  mutatePlantReproductionMaterialKey,
  createPlantReproductionMaterialKey,
  plantsKey,
  mutatePlantKey,
  createPlantKey
} from '@/logic/provide'
import MainHeader from './components/MainHeader.vue'

// Loading all major datasets at boot.
// All data is local and filtered by the backend depending on the user's rights.
// this is for the search and cross-links to work properly without constant calls to the backend.
// This stategy will not work for ever, when loading time becomes too long,
// refactor search and cross-linking to be backend dependent.

// Gathering Places
const gatheringPlacesQuery = useQuery(gql`
  query allGatheringPlaces {
    gatheringPlaces {
      id
      name
      notes
      address
      country
      isOrganicCompliant
    }
  }
`)

const gatheringPlaces = computed(() => {
  const list = (gatheringPlacesQuery.result.value?.gatheringPlaces as Array<GatheringPlace>) ?? []
  const map = new Map<string, number>()
  list.forEach((val, index) => {
    map.set(val.id, index)
  })
  return { list, index: map }
})

const mutateGatheringPlace = useMutation(
  gql`
    mutation editGatheringPlace($id: String!, $update: GatheringPlaceEdit!) {
      updateGatheringPlace(id: $id, update: $update)
    }
  `,
  { refetchQueries: ['allGatheringPlaces'] }
)

const createGatheringPlace = useMutation(
  gql`
    mutation createGatheringPlace($gatheringPlace: GatheringPlaceInput!) {
      createGatheringPlace(gatheringPlace: $gatheringPlace)
    }
  `,
  { refetchQueries: ['allGatheringPlaces'] }
)

provide(gatheringPlacesKey, gatheringPlaces)
provide(mutateGatheringPlaceKey, (id: String, update: GatheringPlaceEdit) =>
  mutateGatheringPlace.mutate({
    id,
    update
  })
)
provide(createGatheringPlaceKey, (create: GatheringPlaceCreation) =>
  createGatheringPlace.mutate({
    gatheringPlace: create
  })
)

// Supply Info
const supplyInfoQuery = useQuery(gql`
  query allSupplyInfo {
    supplyInfos {
      id
      visibility
      name
      supplier
      bill
      notes
      country
    }
  }
`)

const supplyInfo = computed(() => {
  const list = (supplyInfoQuery.result.value?.supplyInfos as Array<SupplyInfo>) ?? []
  const map = new Map<string, number>()
  list.forEach((val, index) => {
    map.set(val.id, index)
  })
  return { list, index: map }
})

const mutateSupplyInfo = useMutation(
  gql`
    mutation editSupplyInfo($id: ID!, $udpate: SupplyInfoInput!) {
      updateSupplyInfo(id: $id, update: $udpate)
    }
  `,
  { refetchQueries: ['allSupplyInfo'] }
)

const createSupplyInfo = useMutation(
  gql`
    mutation createSupplyInfo($supplyInfo: SupplyInfoInput!) {
      createSupplyInfo(supplyInfo: $supplyInfo)
    }
  `,
  { refetchQueries: ['allSupplyInfo'] }
)

provide(supplyInfoKey, supplyInfo)
provide(mutateSupplyInfoKey, (id: String, update: SupplyInfoEdit) =>
  mutateSupplyInfo.mutate({
    id,
    update
  })
)
provide(createSupplyInfoKey, (create: SupplyInfoCreation) =>
  createSupplyInfo.mutate({
    supplyInfo: create
  })
)

// Growing Material

const growingMaterialQuery = useQuery(gql`
  query allGrowingMaterials {
    growingMaterials {
      id
      name
      notes
      visibility
      isOrganicCompliant
      quantity
      unit
      creationDate
      homeProductionIngredients
      aquisitionType
      aquisitionPlaces
      aquisitionPurshaseInfo
    }
  }
`)

const growingMaterials = computed(() => {
  const list = (growingMaterialQuery.result.value?.growingMaterials as Array<GrowingMaterial>) ?? []
  const map = new Map<string, number>()
  list.forEach((val, index) => {
    map.set(val.id, index)
  })
  return { list, index: map }
})

const mutateGrowingMaterial = useMutation(
  gql`
    mutation editGrowingMaterial($id: ID!, $update: GrowingMaterialInput!) {
      updateGrowingMaterial(id: $id, update: $update)
    }
  `,
  { refetchQueries: ['allGrowingMaterials'] }
)

const createGrowingMaterial = useMutation(
  gql`
    mutation createGrowingMaterial($growingMaterial: GrowingMaterialInput!) {
      createGrowingMaterial(growingMaterial: $growingMaterial)
    }
  `,
  { refetchQueries: ['allGrowingMaterials'] }
)

provide(growingMaterialsKey, growingMaterials)
provide(mutateGrowingMaterialKey, (id: String, update: GrowingMaterialEdit) =>
  mutateGrowingMaterial.mutate({
    id,
    update
  })
)
provide(createGrowingMaterialKey, (create: GrowingMaterialCreation) =>
  createGrowingMaterial.mutate({
    growingMaterial: create
  })
)

// Plant Treatments

const plantTreatmentsQuery = useQuery(gql`
  query allPlantTreatments {
    plantTreatments {
      id
      name
      notes
      visibility
      isOrganicCompliant
      quantity
      unit
      creationDate
      homeProductionIngredients
      aquisitionType
      aquisitionPlaces
      aquisitionPurshaseInfo
    }
  }
`)

const plantTreatments = computed(() => {
  const list = (plantTreatmentsQuery.result.value?.plantTreatments as Array<PlantTreatment>) ?? []
  const map = new Map<string, number>()
  list.forEach((val, index) => {
    map.set(val.id, index)
  })
  return { list, index: map }
})

const mutatePlantTreatment = useMutation(
  gql`
    mutation editPlantTreatment($id: ID!, $update: PlantTreatmentInput!) {
      updatePlantTreatment(id: $id, update: $update)
    }
  `,
  { refetchQueries: ['allPlantTreatments'] }
)

const createPlantTreatment = useMutation(
  gql`
    mutation createPlantTreatment($plantTreatment: PlantTreatmentInput!) {
      createPlantTreatment(plantTreatment: $plantTreatment)
    }
  `,
  { refetchQueries: ['allPlantTreatments'] }
)

provide(plantTreatmentsKey, plantTreatments)
provide(mutatePlantTreatmentKey, (id: String, update: PlantTreatmentEdit) =>
  mutatePlantTreatment.mutate({
    id,
    update
  })
)
provide(createPlantTreatmentKey, (create: PlantTreatmentCreation) =>
  createPlantTreatment.mutate({
    plantTreatment: create
  })
)

// Plant Reproduction Materials

const plantReproductionMaterialsQuery = useQuery(gql`
  query allPlantReproductionMaterials {
    plantReproductionMaterials {
      id
      name
      latinName
      type
      visibility
      notes
      isOrganic
      productionDate
      quantity
      unit
      aquisitionType
      germinationSource
      harvestSource
      aquisitionPlaces
      aquisitionPurshaseInfo
      treatmentSteps
    }
  }
`)

const plantReproductionMaterials = computed(() => {
  const list =
    (plantReproductionMaterialsQuery.result.value
      ?.plantReproductionMaterials as Array<PlantReproductionMaterial>) ?? []
  const map = new Map<string, number>()
  list.forEach((val, index) => {
    map.set(val.id, index)
  })
  return { list, index: map }
})

const mutatePlantReproductionMaterial = useMutation(
  gql`
    mutation editPlantReproductionMaterial($id: ID!, $update: PlantReproductionMaterialInput!) {
      updatePlantReproductionMaterial(id: $id, update: $update)
    }
  `,
  { refetchQueries: ['allPlantReproductionMaterials'] }
)

const createPlantReproductionMaterial = useMutation(
  gql`
    mutation createPlantReproductionMaterial(
      $plantReproductionMaterial: PlantReproductionMaterialInput!
    ) {
      createPlantReproductionMaterial(plantReproductionMaterial: $plantReproductionMaterial)
    }
  `,
  { refetchQueries: ['allPlantReproductionMaterials'] }
)

provide(plantReproductionMaterialsKey, plantReproductionMaterials)
provide(mutatePlantReproductionMaterialKey, (id: String, update: PlantReproductionMaterialEdit) =>
  mutatePlantReproductionMaterial.mutate({
    id,
    update
  })
)
provide(createPlantReproductionMaterialKey, (create: PlantReproductionMaterialCreation) =>
  createPlantReproductionMaterial.mutate({
    plantReproductionMaterial: create
  })
)

// Plants

const plantsQuery = useQuery(gql`
  query allPlants {
    plants {
      id
      name
      latinName
      notes
      visibility
      isOrganic
      plantingDate
      isStockPlant
      quantity
      unit
      aquisitionType
      plantingSource
      aquisitionPlaces
      aquisitionPurshaseInfo
      graftingSteps
      maturationSteps
      treatmentSteps
    }
  }
`)
const plants = computed(() => {
  const list = (plantsQuery.result.value?.plants as Array<Plant>) ?? []
  const map = new Map<string, number>()
  list.forEach((val, index) => {
    map.set(val.id, index)
  })
  return { list, index: map }
})

const mutatePlant = useMutation(
  gql`
    mutation editPlant($id: ID!, $update: PlantInput!) {
      updatePlant(id: $id, update: $update)
    }
  `,
  { refetchQueries: ['allPlants'] }
)

const createPlant = useMutation(
  gql`
    mutation createPlant($plant: PlantInput!) {
      createPlant(plant: $plant)
    }
  `,
  { refetchQueries: ['allPlants'] }
)

provide(plantsKey, plants)
provide(mutatePlantKey, (id: String, update: PlantEdit) =>
  mutatePlant.mutate({
    id,
    update
  })
)
provide(createPlantKey, (create: PlantCreation) =>
  createPlant.mutate({
    plant: create
  })
)

const isLoading = computed(() => false)
</script>

<template>
  <header>
    <MainHeader />
  </header>
  <div class="container-content">
    <div v-if="isLoading">
      <h2>Chargement en cours</h2>
    </div>
    <RouterView v-else />
  </div>
</template>

<style scoped>
header {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--vp-header-height);
  padding: 1em 0;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-background);
}
.container-content {
  position: relative;
  margin-top: var(--vp-header-height);
  margin-left: var(--vp-menu-width);
  overflow-y: hidden;
}
</style>
