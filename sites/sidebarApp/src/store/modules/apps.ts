import type { AppModelType } from "@/models";
import { ref, type Ref } from "vue";
import store from "..";
import { defineStore, storeToRefs  } from "pinia";

export const useAppsStore = defineStore('apps', () => {

  const apps :Ref<AppModelType[]> = ref([])

  return {
    apps
  }

})

export function useAppsStoreRefs(){
  return storeToRefs(useAppsStore(store))
}
