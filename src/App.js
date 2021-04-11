import { useState } from "react";
import styled from "styled-components";
import { events } from "./events";
import EventCard from "./EventCard";
import BtnAdd from "./BtnAdd";
import Modal from "./Modal";
import EventAdd from "./EventAdd";
import GlobalCss from "./GlobalCss";
import moment from "moment";
import SvgFilter from "./SvgFilter";

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

const getFormattedEvents = (allEvents) => {
  let formatted = { featured: [], upcoming: [], past: [] };
  allEvents.forEach((event, index) => {
    let { startDate, endDate } = event;
    if (!endDate) endDate = startDate;
    const daysDiffStart = moment(startDate).diff(moment(), "days");
    const daysDiffEnd = moment(endDate).diff(moment(), "days");
    const onGoing = daysDiffEnd >= 0 && daysDiffStart <= 0;
    if (onGoing) return formatted.featured.push({ ...event, index });
    if (daysDiffEnd < 0) return formatted.past.push({ ...event, index });
    if (daysDiffEnd > 30) return formatted.upcoming.push({ ...event, index });
    // Catch all
    formatted.featured.push({ ...event, index });
  });
  return formatted;
};

function App() {
  const [showAddModal, setShowAddModal] = useState(true);
  const [allEvents, setEvent] = useState(events);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [timeBucket, setTimeBucket] = useState(timeBuckets[0]);
  const formattedEvents = getFormattedEvents(allEvents);
  const showEvents = formattedEvents[timeBucket] || [];
  return (
    <>
      <GlobalCss />
      <SvgFilter />
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
        <BtnAdd
          style={{ marginTop: "1.75rem" }}
          onClick={() => {
            setUpdateIndex(null);
            setShowAddModal(true);
          }}
        >
          <span />
          Add event
        </BtnAdd>
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
                  {`${name} (${formattedEvents[name].length})`}
                </TimeBtn>
                <span className={active ? "active tick" : " tick"} />
              </div>
            );
          })}
          <BtnAdd
            style={{ marginTop: "1.75rem" }}
            onClick={() => {
              setUpdateIndex(null);
              setShowAddModal(true);
            }}
          >
            <span />
            Add event
          </BtnAdd>
        </TimeContainer>
        {showEvents.length === 0 ? (
          <div style={{ width: "100%", textAlign: "center" }}>
            <h2
              style={{
                fontSize: "4rem",
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
            >
              Oooooops!
            </h2>
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "300",
                marginBottom: "1rem",
              }}
            >
              Looks like there aren't any events here.
            </p>
            <p
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                fontWeight: "300",
              }}
            >
              You can fix that by adding one! 🗓
            </p>
            <BtnAdd
              style={{ marginTop: "1.75rem" }}
              onClick={() => setShowAddModal(true)}
            >
              <span />
              Add event
            </BtnAdd>
          </div>
        ) : (
          <EventsContainer>
            {showEvents
              .sort((a, b) => {
                // Date ranges need to be handled differently... in relation to today
                switch (timeBucket) {
                  case "featured":
                    // Want to start with today and move forward
                    return a.startDate - b.startDate;
                  case "upcoming":
                    // Want to start with 30 days from now and move forward
                    return a.startDate - b.startDate;
                  case "past":
                  default:
                    // Want to start with the most recent + move backwards
                    return b.startDate - a.startDate;
                }
              })
              .map((data) => (
                <EventCard
                  onClick={() => {
                    setUpdateIndex(data.index);
                    setShowAddModal(true);
                  }}
                  {...data}
                />
              ))}
          </EventsContainer>
        )}
      </div>
      {showAddModal && (
        <Modal
          onClick={() => setShowAddModal(false)}
          onClose={() => setShowAddModal(false)}
        >
          <EventAdd
            key={updateIndex}
            onClose={() => setShowAddModal(false)}
            updatingEvent={allEvents[updateIndex]}
            updateEvent={(event) => {
              setEvent((prev) => {
                const nextEvents = [...prev];
                nextEvents[updateIndex] = event;
                return nextEvents;
              });
            }}
            addEvent={(addEvent) => {
              setEvent((prev) => [...prev, addEvent]);
            }}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
