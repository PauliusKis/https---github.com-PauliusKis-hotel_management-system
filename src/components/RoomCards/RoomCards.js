import React from "react";
import roomList from "../../data/roomList.json";
import "./RoomCards.scss";

function RoomCards(props) {
  return (
    <div>
      {roomList.map((room) => {
        return (
          <div
            key={room.id}
            id={room.id}
            className="room_card_container"
            onClick={() => props.handleRoomClick(room)}
          >
            <p>{room.name}</p>
            <p>{room.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default RoomCards;
