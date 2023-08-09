import React, { useEffect } from "react";
import useDonationItemsList from "../../../hooks/Donate/useDontationItemsList";

function DonationItemsList() {
  const { donationItemsList, fetchDonationItemsList } = useDonationItemsList();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchDonationItemsList();
      } catch (error) {
        console.error("Error fetching donation items list:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>도네이션 아이템 목록</h2>
      {donationItemsList.length > 0 ? (
        <ul>
          {donationItemsList.map((item) => (
            <li key={item.donationItemsId}>{item.donationItemsName}</li>
          ))}
        </ul>
      ) : (
        <p>도네이션 아이템이 없습니다.</p>
      )}
    </div>
  );
}

export default DonationItemsList;
