import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { events } from "./events";
import EventCard from "./EventCard";
import AddBtn from "./AddBtn";
import Modal from "./Modal";
import AddEvent from "./AddEvent";

const CSSReset = createGlobalStyle`
  body, html {
    line-height: 1.2;
    width: 100%;
    height: 100%;
  }
  *, *:after, *:before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
  }
  #root {
    padding: 10vmin;
  }
  button {
    background: none;
    font-weight: 600;
    letter-spacing: .03rem;
    outline: none;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
  }
  :focus {
    // TODO: add some distance to the border or outline
    border: 1px solid dotted;
  }
`;

const TimeBtn = styled.button`
  font-size: 1rem;
  color: #777;
  transition: 0.1s;
  :hover {
    color: #000;
  }
  &.active {
    color: #000;
  }
`;

const TimeContainer = styled.div`
  text-align: right;
  display: inline-block;
  border-radius: 10px;
  margin: 0 1rem 0 0;
  background: #efefef;
  min-width: 220px;
  padding: 1.5rem 1rem;
  div {
    margin-bottom: 0.5em;
  }
  div:last-of-type {
    margin-bottom: 0;
  }
  .tick {
    width: 0px;
    transition: 0.2s;
    height: 0rem;
    background: #000;
    position: absolute;
    right: -1rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .tick.active {
    width: 6px;
    height: 1.25rem;
  }
`;

const EventsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const timeBuckets = ["featured", "upcoming", "past"];

function App() {
  const [showAddModal, setShowAddModal] = useState(true);
  const [allEvents, setEvent] = useState(events);
  const [timeBucket, setTimeBucket] = useState(timeBuckets[0]);
  return (
    <>
      <CSSReset />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 0 1rem 0rem",
          borderBottom: "3px solid #000",
        }}
      >
        <h1 style={{ fontSize: "6rem", lineHeight: 1 }}>Events</h1>
        <AddBtn
          style={{ marginTop: "1.75rem" }}
          onClick={() => setShowAddModal(true)}
        >
          <span />
          Add event
        </AddBtn>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          paddingTop: "2rem",
        }}
      >
        <TimeContainer>
          {timeBuckets.map((name) => {
            const active = timeBucket === name;
            return (
              <div style={{ position: "relative" }}>
                <TimeBtn
                  onClick={() => setTimeBucket(name)}
                  className={active ? "active" : ""}
                >
                  {name} (10)
                </TimeBtn>
                <span className={active ? "active tick" : " tick"} />
              </div>
            );
          })}
          <AddBtn
            style={{ marginTop: "1.75rem" }}
            onClick={() => setShowAddModal(true)}
          >
            <span />
            Add event
          </AddBtn>
        </TimeContainer>
        <EventsContainer>
          {allEvents.map((data) => (
            <EventCard {...data} />
          ))}
        </EventsContainer>
      </div>
      {showAddModal && (
        <Modal
          onClick={() => setShowAddModal(false)}
          onClose={() => setShowAddModal(false)}
        >
          <AddEvent />
        </Modal>
      )}
    </>
  );
}

export default App;
