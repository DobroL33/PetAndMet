import { domain } from "hooks/customQueryClient";
import { useAccessToken } from "hooks/useAccessToken";
import axios from "axios";

// 신청하기 API 수정 해야함. (status, user_uuid 넣어야 하는데 예시에 없음) + flag가 기본값이 없대서 못 넣음
interface WalkForm {
  date: string;
  time: number;
  center_uuid: string;
  animal_uuid: string;
  user_uuid: string;
  status: string;
}

const useWalkForm = () => {
  const { accessToken } = useAccessToken();
  const sendWalkForm = async (data: WalkForm) => {
    try {
      const response = await axios.post(`${domain}/walk`, data, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });

      if (response.status === 200) {
        console.log("Form submitted successfully");
      } else {
        console.log("Failed to submit form");
      }
    } catch (error) {
      console.error("Error while submitting form:", error);
    }
  };

  return { sendWalkForm };
};

export default useWalkForm;
