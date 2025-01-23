import type { InjectionKey, Ref } from 'vue'

export interface MenuInjectionKeys {
  menuOpen: Ref<boolean>
  toggleMenu: VoidFunction
}

export const menuKey = Symbol() as InjectionKey<MenuInjectionKeys>
