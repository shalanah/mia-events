import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { events } from "./events";
import EventCard from "./EventCard";

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

// TODO: Add dark/light mode
const AddBtn = styled.button`
  background: #000;
  color: #fff;
  margin-top: 1.75rem;
  font-size: 1rem;
  padding: 1rem 1.5rem 1rem 3.5rem;
  line-height: 1;
  border-radius: 10px;
  display: inline-block;
  transition: 0.2s;
  position: relative;
  :hover {
    background: #444;
  }
  span {
    position: absolute;
    left: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    background: #fff;
    border-radius: 100%;
    height: 1.4em;
    width: 1.4em;
    display: inline-block;
    :before,
    :after {
      line-height: 0;
      content: "";
      width: 54%;
      height: 2px;
      position: absolute;
      background: #000;
      left: 23%;
      top: calc(50% - 1px);
    }
    :after {
      transform: rotate(90deg);
    }
  }
`;
const TimeContainer = styled.div`
  text-align: right;
  button {
    font-size: 1rem;
    color: #777;
  }
  button.active {
    color: #000;
  }
  div {
    margin-bottom: 0.5em;
  }
  div:last-of-type {
    margin-bottom: 0;
  }
`;

const timeBuckets = ["featured", "upcoming", "past"];

function App() {
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
        <AddBtn>
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
        <TimeContainer
          style={{
            display: "inline-block",
            borderRadius: "10px",
            margin: "0 2rem 0 0",
            background: "#efefef",
            minWidth: 220,
            padding: "1rem",
          }}
        >
          {timeBuckets.map((name) => {
            return (
              <div>
                <button
                  onClick={() => setTimeBucket(name)}
                  className={timeBucket === name ? "active" : ""}
                >
                  {name} (10)
                </button>
              </div>
            );
          })}
        </TimeContainer>
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
          }}
        >
          {allEvents.map((data) => (
            <EventCard {...data} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
