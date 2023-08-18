import { create } from 'zustand'

export interface ItemDetail {
  center_item_id: number
  center_uuid: string
  item_name: string
  item_target_price: number
  item_url: string
  setCenterItemId: (center_item_id: number) => void
  setCenterUuid: (center_uuid: string) => void
  setItemName: (item_name: string) => void
  setItemTargetPrice: (item_target_price: number) => void
  setItemUrl: (item_url: string) => void
}

export const ItemDetailStore = create<ItemDetail>(set => ({
  center_item_id: 0,
  center_uuid: '',
  item_name: '',
  item_target_price: 0,
  item_url: '',
  setCenterItemId: center_item_id => set({ center_item_id }),
  setCenterUuid: center_uuid => set({ center_uuid }),
  setItemName: item_name => set({ item_name }),
  setItemTargetPrice: item_target_price => set({ item_target_price }),
  setItemUrl: item_url => set({ item_url }),
}))

export interface Item {
  centerItems: ItemDetail[]
  total: number
  setCenterItems: (centerItems: ItemDetail[]) => void
  setTotal: (total: number) => void
}

export const ItemStore = create<Item>(set => ({
  centerItems: [],
  total: 0,
  setCenterItems: centerItems => set({ centerItems }),
  setTotal: total => set({ total }),
}))
