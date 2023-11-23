// useCenterData.ts
import { useCenterStore, State } from "./useCenterStore";
import customAxios from "utils/axiosUtil";
import { domain } from "hooks/customQueryClient";

async function fetchCenterData(center_uuid: string) {
  try {
    const response = await customAxios.get(
      `${domain}/center/detail?id=${center_uuid}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function useCenterData() {
  const centerData = useCenterStore((state: State) => state.centerData);
  const setCenterData = useCenterStore((state: State) => state.setCenterData);

  const updateCenterData = async (uuid: string) => {
    try {
      const data = await fetchCenterData(uuid);
      setCenterData(data);
    } catch (error) {
      console.error("Failed to update center data:", error);
    }
  };

  return {
    centerData,
    updateCenterData,
    setCenterData,
  };
}
