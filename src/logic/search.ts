// Copyright (c) 2023, Alix Mougenot (Au pied des Arbres), alix.mougenot@gmail.com
// See license file.
import { ref, computed, type Ref, watch } from 'vue'
import Fuse from 'fuse.js'
import _ from 'lodash'
import type {} from '@/types'

// Builds a search engine from Fuse given the config and the collection to parse.
export function makeSearchEngine(
  config_option: any,
  input: Ref<string>,
  source: Array<{ id: string }>
) {
  const searchTerms = ref(input.value)
  const searchResults = ref([] as Array<{ id: string }>)
  const searchEngine = computed(() => {
    console.log('Search engine index update')
    if (source.length > 0) {
      return new Fuse(source, config_option)
    } else return null
  })

  // Debounce changes to input into searchTerms that triggers a watch chain.
  // Since this is async and needs to be run once at startup, this is done with watch and no computed.
  watch(
    input,
    _.debounce(() => {
      searchTerms.value = input.value
    }, 250)
  )

  watch(
    searchTerms,
    () => {
      if (searchTerms.value.length > 1) {
        if (!searchEngine.value) {
          console.log('Search engine not ready')
          return
        }
        const limit = searchTerms.value.indexOf(':') > 3 ? 1 : 12 // Explicit search
        const found = searchEngine.value.search(searchTerms.value, { limit }).map((x) => x.item)
        searchResults.value = found
      } else {
        searchResults.value = []
      }
    },
    { immediate: true }
  )

  return { searchResult: searchResults }
}
