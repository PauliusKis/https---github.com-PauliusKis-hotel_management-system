import React, { useState } from "react";
import Board from "./components/Board";
// import GuestCards from "./components/GuestCards";
import RoomCards from "./components/RoomCards";

import guestList from "./data/guestList.json";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import GuestSearch from "./components/GuestSearch";

const COLUMNS = [
  {
    name: "Info",
    items: [],
  },
  {
    name: "Guests",
    items: guestList.map((guest) => {
      return {
        ...guest,
        id: String(guest.id),
      };
    }),
  },
];

function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [columns, setColumns] = useState(COLUMNS);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    // We moving item to other column
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      if (selectedRoom) {
        // const roomItems = JSON.parse(localStorage.getItem(`room_${selectedRoom.id}`));
        // const newItems = {
        //   ...roomItems,

        // };
        localStorage.setItem(
          `room_${selectedRoom.id}`,
          JSON.stringify(destItems)
        );
      }
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  function loadRoomGuests(room) {
    const roomId = `room_${room.id}`;
    if (!localStorage.getItem(roomId)) {
      localStorage.setItem(roomId, JSON.stringify([]));
    }
    const guestsColumn = columns[0];
    const roomsColumn = columns[1];
    const roomGuests = JSON.parse(localStorage.getItem(roomId));
    setColumns({
      ...columns,
      0: {
        ...guestsColumn,
        items: roomGuests,
      },
      1: {
        ...roomsColumn,
        items: roomsColumn.items.filter(
          (guest) => !roomGuests.some((e) => Number(e.id) === Number(guest.id))
        ),
      },
    });
  }

  function handleRoomClick(room) {
    setSelectedRoom(room);
    loadRoomGuests(room);
    console.log("Selected room:", {
      ...room,
      items: JSON.parse(localStorage.getItem(`room_${room.id}`)),
    });
  }

  function handleSearch(text) {
    const query = text.trim().toLowerCase();

    const filteredGuests = guestList
      .filter(
        (guest) =>
          !columns[0].items.some((e) => Number(e.id) === Number(guest.id))
      )
      .filter(
        (guest) =>
          guest.first_name.toLowerCase().includes(query) ||
          guest.last_name.toLowerCase().includes(query) ||
          guest.job_title.toLowerCase().includes(query)
      )
      .map((guest) => {
        return {
          ...guest,
          id: String(guest.id),
        };
      });

    setColumns({
      ...columns,
      1: {
        ...columns[1],
        items: filteredGuests,
      },
    });
  }

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div className="App">
        <main className="flexbox">
          <div className="board_rooms__label">Rooms</div>
          <Board className="board-rooms">
            <RoomCards handleRoomClick={handleRoomClick} />
          </Board>
          {/* Kanban */}
          {Object.entries(columns).map(([id, column]) => {
            if (column.name === "Info" && !selectedRoom) {
              return (
                <div key={id}>
                  <h2>{column.name}</h2>
                  <p>No room selected.</p>
                </div>
              );
            }

            return (
              <div
                key={id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h2>{column.name}</h2>
                {column.name === "Info" ? (
                  <>
                    <h2>{selectedRoom.name}</h2>
                    <p>{selectedRoom.description}</p>
                  </>
                ) : column.name === "Guests" ? (
                  <>
                    <GuestSearch onFilter={handleSearch} />
                  </>
                ) : null}
                <div
                  style={{
                    margin: 8,
                    overflowX: "hidden",
                    overflowY: "scroll",
                  }}
                >
                  <Droppable droppableId={id}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgray",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#082642"
                                          : "#082642",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <p>{item.first_name}</p>
                                      <p>{item.last_name}</p>
                                      <p>{item.job_title}</p>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </DragDropContext>
  );
}

export default App;
