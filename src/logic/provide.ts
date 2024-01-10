// Copyright (c) 2023, Alix Mougenot (Au pied des Arbres), alix.mougenot@gmail.com
// See license file.
import type { InjectionKey, ComputedRef } from 'vue'
import type {
  GatheringPlace,
  GatheringPlaceCreation,
  GatheringPlaceEdit,
  GrowingMaterial,
  GrowingMaterialCreation,
  GrowingMaterialEdit,
  Plant,
  PlantCreation,
  PlantEdit,
  PlantReproductionMaterial,
  PlantReproductionMaterialCreation,
  PlantReproductionMaterialEdit,
  PlantTreatment,
  PlantTreatmentCreation,
  PlantTreatmentEdit,
  SupplyInfo,
  SupplyInfoCreation,
  SupplyInfoEdit
} from '@/types'

export const gatheringPlacesKey = Symbol() as InjectionKey<
  ComputedRef<{ list: GatheringPlace[]; index: Map<string, number> }>
>
export const mutateGatheringPlaceKey = Symbol() as InjectionKey<
  (id: string, update: GatheringPlaceEdit) => any
>
export const createGatheringPlaceKey = Symbol() as InjectionKey<
  (gatheringPlace: GatheringPlaceCreation) => any
>

export const supplyInfoKey = Symbol() as InjectionKey<
  ComputedRef<{ list: SupplyInfo[]; index: Map<string, number> }>
>
export const mutateSupplyInfoKey = Symbol() as InjectionKey<
  (id: string, udpate: SupplyInfoEdit) => any
>
export const createSupplyInfoKey = Symbol() as InjectionKey<(supplyInfo: SupplyInfoCreation) => any>

export const growingMaterialsKey = Symbol() as InjectionKey<
  ComputedRef<{ list: GrowingMaterial[]; index: Map<string, number> }>
>
export const mutateGrowingMaterialKey = Symbol() as InjectionKey<
  (id: string, update: GrowingMaterialEdit) => any
>
export const createGrowingMaterialKey = Symbol() as InjectionKey<
  (growingMaterial: GrowingMaterialCreation) => any
>

export const plantTreatmentsKey = Symbol() as InjectionKey<
  ComputedRef<{ list: PlantTreatment[]; index: Map<string, number> }>
>
export const mutatePlantTreatmentKey = Symbol() as InjectionKey<
  (id: string, update: PlantTreatmentEdit) => any
>
export const createPlantTreatmentKey = Symbol() as InjectionKey<
  (plantTreatment: PlantTreatmentCreation) => any
>

export const plantReproductionMaterialsKey = Symbol() as InjectionKey<
  ComputedRef<{ list: PlantReproductionMaterial[]; index: Map<string, number> }>
>
export const mutatePlantReproductionMaterialKey = Symbol() as InjectionKey<
  (id: string, update: PlantReproductionMaterialEdit) => any
>
export const createPlantReproductionMaterialKey = Symbol() as InjectionKey<
  (plantReproductionMaterial: PlantReproductionMaterialCreation) => any
>

export const plantsKey = Symbol() as InjectionKey<
  ComputedRef<{ list: Plant[]; index: Map<string, number> }>
>
export const mutatePlantKey = Symbol() as InjectionKey<(id: string, update: PlantEdit) => any>
export const createPlantKey = Symbol() as InjectionKey<(plant: PlantCreation) => any>
