// Copyright (c) 2023, Alix Mougenot (Au pied des Arbres), alix.mougenot@gmail.com
// See license file.
import _ from 'lodash'

export type ID = string
export type DATE = string

// Types

export enum Visibility {
  PublicFacing = 'PUBLIC_FACING',
  Internal = 'INTERNAL'
}

export enum AquisitionType {
  Grown = 'GROWN',
  Purchased = 'PURCHASED',
  Gathered = 'GATHERED',
  HomeMade = 'HOME_MADE'
}

export enum ReproductiveMaterialType {
  Seed = 'SEED',
  Cutting = 'CUTTING',
  Grafting = 'GRAFTING'
}

export const VisibilityOptions = Object.values(Visibility)
  .filter((v) => typeof v === 'string')
  .map((v) => {
    switch (v) {
      case 'PUBLIC_FACING':
        return { value: v, label: 'Public (Visible to anyone with the QRCode)' }
      case 'INTERNAL':
        return { value: v, label: 'Internal (Only visible to me)' }
    }
  })

export const AquisitionOptions = Object.values(AquisitionType)
  .filter((v) => typeof v === 'string')
  .map((v) => {
    switch (v) {
      case 'GROWN':
        return { value: v, label: 'Grow on property' }
      case 'PURCHASED':
        return { value: v, label: 'Purchased' }
      case 'GATHERED':
        return { value: v, label: 'Gathered in nature' }
      case 'HOME_MADE':
        return { value: v, label: 'Home made' }
    }
  })

export const PlantAquisitionOptions = AquisitionOptions.filter((v) => v && v.value !== 'HOME_MADE')

export const ReproductiveMaterialOptions = Object.values(ReproductiveMaterialType)
  .filter((v) => typeof v === 'string')
  .map((v) => {
    switch (v) {
      case 'SEED':
        return { value: v, label: 'Seed' }
      case 'CUTTING':
        return { value: v, label: 'Cutting' }
      case 'GRAFTING':
        return { value: v, label: 'Grafting' }
    }
  })

export type GatheringPlace = {
  id: ID
  name: string | null
  notes: string
  address: string
  country: string
  isOrganicCompliant: boolean
}

export type GatheringPlaceEdit = Partial<GatheringPlace>
export type GatheringPlaceCreation = Omit<GatheringPlace, 'id'>

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
export type SupplyInfoCreation = Omit<SupplyInfo, 'id'>

export type GrowingMaterial = {
  id: ID
  name: string | null
  notes: string
  visibility: Visibility
  isOrganicCompliant: boolean
  quantity: number
  unit: string
  creationDate: DATE
  productionSteps: ID[]
  aquisitionType: AquisitionType
  aquisitionPlaces: ID[]
  aquisitionPurshaseInfo: ID[]
}

export type GrowingMaterialEdit = Partial<GrowingMaterial>
export type GrowingMaterialCreation = Omit<GrowingMaterial, 'id'>

export type PlantTreatment = {
  id: ID
  name: string | null
  visibility: Visibility
  notes: string
  isOrganicCompliant: boolean
  quantity: number
  unit: string
  creationDate: DATE
  homeProductionIngredients: ID[]
  aquisitionType: AquisitionType
  aquisitionPlaces: ID[]
  aquisitionPurshaseInfo: ID[]
}

export type PlantTreatmentEdit = Partial<PlantTreatment>
export type PlantTreatmentCreation = Omit<PlantTreatment, 'id'>

export type PlantReproductionMaterial = {
  id: ID
  name: string | null
  latinName: string
  type: ReproductiveMaterialType
  visibility: Visibility
  notes: string
  isOrganic: boolean
  productionDate: DATE
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
export type PlantReproductionMaterialCreation = Omit<PlantReproductionMaterial, 'id'>

export type Plant = {
  id: ID
  name: string | null
  latinName: string
  notes: string
  visibility: Visibility
  isOrganic: boolean
  plantingDate: DATE
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
export type PlantCreation = Omit<Plant, 'id'>

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
