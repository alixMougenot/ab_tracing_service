// Copyright (c) 2023, Alix Mougenot (Au pied des Arbres), alix.mougenot@gmail.com
// See license file.
import _ from 'lodash'

export type ID = string
export type TIME = string

// Types

export enum Visibility {
  PUBLIC_FACING,
  INTERNAL
}

export enum AquisitionType {
  GROWN,
  PURCHASED,
  GATHERED,
  HOME_MADE
}

export enum ReproductiveMaterialType {
  SEED,
  CUTTING,
  GRAFTING
}

export type GatheringPlace = {
  id: ID
  name: string | null
  notes: string
  address: string
  country: string
  isOrganicCompliant: boolean
}

export type GatheringPlaceEdit = Partial<GatheringPlace>
export type GatheringPlaceCreation = Exclude<GatheringPlace, 'id'>

export type SupplyInfo = {
  id: ID
  visibility: Visibility
  name: string | null
  supplier: string
  bill: string
  notes: string
  country: string | null
}

export type SupplyInfoEdit = Partial<SupplyInfo>
export type SupplyInfoCreation = Exclude<SupplyInfo, 'id'>

export type GrowingMaterial = {
  id: ID
  name: string | null
  notes: string
  visibility: Visibility
  isOrganicCompliant: boolean
  quantity: number
  unit: string
  creationDate: Date
  productionSteps: ID[]
  aquisitionType: AquisitionType
  aquisitionPlaces: ID[]
  aquisitionPurshaseInfo: ID[]
}

export type GrowingMaterialEdit = Partial<GrowingMaterial>
export type GrowingMaterialCreation = Exclude<GrowingMaterial, 'id'>

export type PlantTreatment = {
  id: ID
  name: string | null
  visibility: Visibility
  notes: string
  isOrganicCompliant: boolean
  quantity: number
  unit: string
  creationDate: Date
  homeProductionIngredients: ID[]
  aquisitionType: AquisitionType
  aquisitionPlaces: ID[]
  aquisitionPurshaseInfo: ID[]
}

export type PlantTreatmentEdit = Partial<PlantTreatment>
export type PlantTreatmentCreation = Exclude<PlantTreatment, 'id'>

export type PlantReproductionMaterial = {
  id: ID
  name: string | null
  latinName: string
  type: ReproductiveMaterialType
  visibility: Visibility
  notes: string
  isOrganic: boolean
  productionDate: Date
  quantity: number
  unit: string
  aquisitionType: AquisitionType
  germinationSource: ID | null
  harvestSource: ID[]
  aquisitionPlaces: ID[]
  aquisitionPurshaseInfo: ID[]
  treatmentSteps: ID[]
}

export type PlantReproductionMaterialEdit = Partial<PlantReproductionMaterial>
export type PlantReproductionMaterialCreation = Exclude<PlantReproductionMaterial, 'id'>

export type Plant = {
  id: ID
  name: string | null
  latinName: string
  notes: string
  visibility: Visibility
  isOrganic: boolean
  plantingDate: Date
  isStockPlant: boolean
  quantity: number
  unit: string
  aquisitionType: AquisitionType
  plantingSource: ID | null
  aquisitionPlaces: ID[]
  aquisitionPurshaseInfo: ID[]
  graftingSteps: ID[]
  maturationSteps: ID[]
  treatmentSteps: ID[]
}

export type PlantEdit = Partial<Plant>
export type PlantCreation = Exclude<Plant, 'id'>

//// Copy opperators ////

///// Diff opperators /////

// Deep diff between two objects. This will only recursively explore properties that are objects themselves.
// In this contect, arrays are considred values and are not diffed, they are replaced entirely.
export function diff<T extends { [key: string]: any }>(original: T, edited: T): Partial<T> {
  return _.transform(edited, function (result: any, value, key) {
    if (_.isObject(value) && !_.isArray(value)) {
      const d = diff(original[key], value)
      if (!_.isEqual(d, {})) {
        result[key] = d
      }
    } else if (value !== null && !_.isEqual(value, original[key])) {
      result[key] = value
    }
  })
}
