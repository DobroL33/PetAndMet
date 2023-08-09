import create from "zustand";
import { getAccessTokenFromLocalStorage } from "../useAuth";
import { domain } from "../../hooks/customQueryClient";
import axios from "axios";
import useAnimal from "../../hooks/Animal/useAnimal"; // Import useAnimal hook

console.log("useDonationItemsList 파일이 시작되었습니다.");

interface DonationItemsData {
  donationItemsId: number;
  donationItemsName: string;
  donationItemsTargetPrice: number;
}

interface UseDonationItemsListState {
  donationItemsList: Array<DonationItemsData>;
  fetchDonationItemsList: () => Promise<void>;
}

const useDonationItemsList = create<UseDonationItemsListState>((set) => ({
  donationItemsList: [],
  fetchDonationItemsList: async () => {
    try {
      const accessToken = getAccessTokenFromLocalStorage();

      if (!accessToken) {
        console.error(
          "액세스 토큰이 로컬 스토리지에 존재하지 않습니다. 로그인을 해주세요."
        );
        return;
      }

      const animalData = await useAnimal.getState().fetchAnimalData();

      const donationItemsListData = await fetchDonationItemsListDataFromApi(
        animalData.center_uuid, // Use the center_uuid from animalData
        accessToken
      );

      set({
        donationItemsList: donationItemsListData,
      });
    } catch (error) {
      console.error("도네이션 아이템 목록 데이터 가져오기 오류:", error);
    }
  },
}));

async function fetchDonationItemsListDataFromApi(
  center_uuid: string,
  accessToken: string
): Promise<Array<DonationItemsData>> {
  const url = `${domain}/center/item?uuid=${center_uuid}`;
  console.log(url);

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const centerItems = response.data.response.centerItems;

    console.log(centerItems);

    if (!Array.isArray(centerItems)) {
      console.error("API 응답 데이터가 배열 형태가 아닙니다.");
      throw new Error("API 응답 데이터 형식 오류");
    }

    const donationItemsListData: Array<DonationItemsData> = centerItems.map(
      (donationItem: any) => ({
        donationItemsId: donationItem.center_item_id,
        donationItemsName: donationItem.item_name,
        donationItemsTargetPrice: donationItem.item_target_price,
      })
    );

    return donationItemsListData;
  } catch (error) {
    console.error("API 요청 에러:", error);
    throw error;
  }
}

export default useDonationItemsList;
