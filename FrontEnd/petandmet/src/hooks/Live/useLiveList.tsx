import create from "zustand";
import axios from "axios";
import { domain } from "../../hooks/customQueryClient";
import { useCallback } from "react";

interface LiveData {
  liveId: number;
  animalUuid: string;
  centerUuid: string;
  sessionName: string;
  thumbnailImageUrl: string;
}

interface UseLiveListState {
  liveList: LiveData[];
  fetchLiveList: () => Promise<void>;
}
const useLiveList = create<UseLiveListState>((set) => ({
  liveList: [],
  fetchLiveList: async () => {
    try {
      const response = await axios.get(`${domain}/live?page=0&size=8`);

      // response의 상태 코드가 200이 아닌 경우를 확인합니다.
      if (response.status !== 200) {
        console.error("응답 코드가 200이 아닙니다:", response.status);
        return; // 여기에서 반환하여 추가 처리를 중지합니다.
      }

      console.log("response는", response);

      const responseData = response.data.response.lives;

      console.log("responseData는", responseData);

      const liveList: LiveData[] = responseData.map((live: any) => ({
        liveId: live.live_id,
        animalUuid: live.animal_uuid,
        centerUuid: live.center_uuid,
        sessionName: live.session_name,
        thumbnailImageUrl: live.thumbnail_image_url,
      }));

      console.log("라이브리스트는", liveList);

      set({ liveList });
    } catch (error) {
      console.error("라이브 데이터 가져오기 오류:", error);
    }
  },
}));

export default useLiveList;
