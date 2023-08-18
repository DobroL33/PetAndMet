import { useQuery } from 'react-query'
import customAxios from 'utils/axiosUtil'
import { ItemStore } from 'hooks/Item/CenterItemStore'

export function useCenterItemList(center_uuid: string | undefined) {
  const itemStore = ItemStore()
  const axiosData = async () => {
    try {
      const response = await customAxios.get(`/center/item?uuid=${center_uuid}`)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return useQuery('centerItemList', axiosData, {
    onSuccess: data => {
      if (data && data.response !== undefined) {
        itemStore.setCenterItems(data.response.centerItems)
        itemStore.setTotal(data.response.total)
      }
    },
  })
}
