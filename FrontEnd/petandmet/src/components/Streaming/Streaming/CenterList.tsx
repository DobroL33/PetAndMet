// CenterList.js
import React, { useEffect } from "react";
import useCenterList from "../../../hooks/Center/useCenterList";

function CenterList() {
  const { centerList, fetchCenterList } = useCenterList();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCenterList();
        console.log("Fetched center list:", centerList); // 로그 추가
      } catch (error) {
        console.error("Error fetching center list:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>보호소 목록</h2>
      <ul>
        {centerList.map((center) => (
          <li key={center.centerId}>{center.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CenterList;
