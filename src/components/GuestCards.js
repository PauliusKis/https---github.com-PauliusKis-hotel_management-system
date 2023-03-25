import React from "react";

import "./GuestCard.css";

function GuestCards({ guests }) {
  // const [selectedGuest, setSelectedGuest] = useState(0);
  // const key = props.id;

  return (
    <div>
      {guests &&
        Array.isArray(guests) &&
        guests.map((listDetail, index) => {
          return (
            <div
              className="guest_card_container"
              id={listDetail.id}
              key={listDetail.id}
            >
              <p>{listDetail.first_name}</p>
              <p>{listDetail.last_name}</p>
              <p>{listDetail.job_title}</p>
            </div>
          );
        })}
    </div>
  );
}
export default GuestCards;
