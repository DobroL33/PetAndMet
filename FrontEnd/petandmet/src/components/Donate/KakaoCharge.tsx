import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAccessToken } from "hooks/useAccessToken";
import { domain } from "hooks/customQueryClient";

const KakaoCharge: React.FC = () => {
  const [userName, setUserName] = useState<string>("");

  const [selectedMoney, setSelectedMoney] = useState<string>("");

  const [isScriptLoaded, setScriptLoaded] = useState(false);
  const { accessToken, userUuid } = useAccessToken();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.5.js";
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChargeClick = () => {
    const IMP = (window as any).IMP;
    IMP.init("imp02430511");

    IMP.request_pay(
      {
        pg: "kakao",
        pay_method: "kakaopay",
        merchant_uid: "merchant_" + new Date().getTime(),
        name: "주문명 : 주문명 설정",
        amount: selectedMoney,
        buyer_email: "iamport@siot.do",
        buyer_name: "구매자이름",
        buyer_tel: "010-1234-5678",
        buyer_addr: "인천광역시 부평구",
        buyer_postcode: "123-456",
      },
      (rsp: any) => {
        if (rsp.success) {
          axios
            .post(
              `${domain}/mileage/charge`,
              {
                uuid: userUuid,
                mileage: selectedMoney,
              },
              {
                headers: {
                  Authorization: `${accessToken}`,
                },
              }
            )
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("결제에 실패하였습니다. 에러내용:", rsp.error_msg);
        }
        console.log(`"${domain}/mileage/charge"`);
      }
    );
  };

  return (
    <div className="card-body bg-white mt-0 shadow">
      <p style={{ fontWeight: "bold" }}>카카오페이 현재 사용가능</p>
      <label>userName : </label>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      {[5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 50000].map(
        (amount) => (
          <label key={amount} className="box-radio-input">
            <input
              type="radio"
              name="cp_item"
              value={amount}
              checked={selectedMoney === amount.toString()}
              onChange={() => setSelectedMoney(amount.toString())}
            />
            <span>{amount}원</span>
          </label>
        )
      )}
      <p style={{ color: "#ac2925", marginTop: "30px" }}>
        카카오페이의 최소 충전금액은 5,000원이며 <br />
        최대 충전금액은 50,000원 입니다.
      </p>
      <button
        type="button"
        className="btn btn-lg btn-block  btn-custom"
        onClick={handleChargeClick}
      >
        충 전 하 기
      </button>
    </div>
  );
};

export default KakaoCharge;
