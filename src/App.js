import { useState } from "react";
import Btn from "./Btn";
import styled from "styled-components";
import { events } from "./events";
import EventCard from "./EventCard";
import BtnAdd from "./BtnAdd";
import Modal from "./Modal";
import EventAdd from "./EventAdd";
import GlobalCss from "./GlobalCss";
import moment from "moment";

const TimeBtn = styled(Btn)`
  font-size: 1rem;
  color: #777;
  outline-offset: 4px;
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
  @media screen and (max-width: 700px) {
    width: 100%;
    text-align: center;
    .tick {
      display: none;
    }
  }
`;

const EventsContainer = styled.div`
  width: 100%;
  display: grid;
  margin-bottom: 10vmin;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
  }
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

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 1rem 0rem;
  border-bottom: 3px solid #000;
`;

const Main = styled.main`
  display: flex;
  align-items: flex-start;
  padding-top: 2rem;
  gap: 20px;
  @media screen and (max-width: 700px) {
    padding-top: 1rem;
    flex-direction: column;
  }
`;

const H1 = styled.h1`
  font-size: 6rem;
  line-height: 1;
  @media screen and (max-width: 1000px) {
    font-size: 3rem;
  }
`;

function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [allEvents, setEvent] = useState(events);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [timeBucket, setTimeBucket] = useState(timeBuckets[0]);
  const formattedEvents = getFormattedEvents(allEvents);
  const showEvents = formattedEvents[timeBucket] || [];
  return (
    <>
      <GlobalCss />
      <Header>
        <H1>Events</H1>
        <BtnAdd
          className={"desktop-only"}
          style={{ marginTop: "1.75rem" }}
          onClick={() => {
            setUpdateIndex(null);
            setShowAddModal(true);
          }}
        >
          <span />
          Add event
        </BtnAdd>
      </Header>
      <Main>
        <TimeContainer>
          {timeBuckets.map((name) => {
            const active = timeBucket === name;
            return (
              <div style={{ position: "relative" }} key={name}>
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
              .map((data, i) => (
                <EventCard
                  key={i}
                  onClick={() => {
                    setUpdateIndex(data.index);
                    setShowAddModal(true);
                  }}
                  {...data}
                />
              ))}
          </EventsContainer>
        )}
      </Main>
      {showAddModal && (
        <Modal
          onClick={() => setShowAddModal(false)}
          onClose={() => setShowAddModal(false)}
        >
          <EventAdd
            key={updateIndex}
            onClose={() => setShowAddModal(false)}
            event={allEvents[updateIndex]}
            onUpdate={(event) => {
              setEvent((prev) => {
                const nextEvents = [...prev];
                nextEvents[updateIndex] = event;
                return nextEvents;
              });
            }}
            onRemove={() => {
              setEvent((prev) => {
                return [
                  ...prev.slice(0, updateIndex),
                  ...prev.slice(updateIndex + 1),
                ];
              });
            }}
            onAdd={(onAdd) => {
              setEvent((prev) => [...prev, onAdd]);
            }}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
