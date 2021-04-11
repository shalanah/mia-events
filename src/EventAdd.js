import styled from "styled-components";
import { useState } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import BtnPrimary from "./BtnPrimary";
import { SingleDatePicker } from "react-dates";

const Label = styled.label`
  display: block;
  margin-bottom: 0.25rem;
  font-size: 1rem;
  text-align: left;
  span {
    font-size: 0.8rem;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.05em;
    margin: 15px 0px 8px 0px;
    white-space: nowrap;
    display: block;
  }
  textarea {
    min-height: 250px;
  }
  input,
  textarea,
  select {
    font-size: 1.2rem;
    padding: 0.75rem;
    width: 100%;
    border-radius: 4px;
    background: #eee;
    border: 1px solid #ccc;
  }
  .SingleDatePicker .DateInput {
    width: 100%;
  }
  input[type="file"] {
    background: transparent;
    border: none;
    padding: 0;
    font-size: 1rem;
  }
`;
const Btns = styled(BtnPrimary)`
  height: 45px;
`;
const BtnSubmit = styled(Btns)`
  display: block;
  width: 100%;
`;
const BtnRemove = styled(Btns)`
  background: red;
`;
const BtnDupe = styled(Btns)`
  background: #fff;
  color: #000;
  border: 2px solid #000;
  :hover {
    color: #fff;
  }
`;

// Makes 30min intervals for selection
const times = [];
const divisions = 2;
const beginHour = 7;
for (var i = 0; i < 24; i++) {
  for (var j = 0; j < divisions; j++) {
    times.push({ h: (i + beginHour) % 24, m: 60 * (j / divisions) });
  }
}

// Can also be EventUpdate
function EventAdd({ onAdd, onRemove, onClose, onUpdate, event }) {
  const [startDate, setStartDate] = useState(
    event ? moment(event.startDate) : moment()
  );
  const [endDate, setEndDate] = useState(
    event ? moment(event.endDate) : moment().add(1, "days")
  );
  const [multiDay, setMultiDay] = useState(event ? !!event.endDate : false);
  const [focus1, setFocus1] = useState(null);
  const [focus2, setFocus2] = useState(null);
  const [title, setTitle] = useState(event ? event.title : "");
  const [description, setDescription] = useState(
    event ? event.description : ""
  );
  const [img, setImg] = useState(event ? event.img : "");

  const onSubmit = () => {
    // TODO: Add validation
    onAdd({
      title,
      description,
      img,
      startDate: moment(startDate).valueOf(),
      createdDate: Date.now(), // TODO: add updated too
      ...(multiDay && { endDate }),
    });
    onClose();
  };
  const handleUpdate = () => {
    onUpdate({
      title,
      description,
      img,
      startDate: moment(startDate).valueOf(),
      createdDate: event.createdDate,
      updatedDate: Date.now(),
      ...(multiDay && { endDate }),
    });
    onClose();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2
        style={{
          textAlign: "left",
          fontSize: "2.5rem",
          paddingBottom: ".5rem",
          borderBottom: "2px solid #000",
        }}
      >
        {event ? "Update Event" : "Add New Event"}
      </h2>
      <Label>
        <span>Title</span>
        <input
          defaultValue={title}
          type={"text"}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </Label>
      <Label
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "flex-start",
        }}
      >
        <span style={{ display: "inline" }}>Multi-day event</span>
        <input
          defaultChecked={multiDay}
          style={{
            display: "inline",
            padding: "0px",
            width: "auto",
            marginLeft: 10,
          }}
          type={"checkbox"}
          onChange={() => setMultiDay((v) => !v)}
        />
      </Label>
      <div style={{ display: "flex" }}>
        <Label style={{ display: "inline-block", flex: "1" }}>
          <span>Start Date</span>
          <SingleDatePicker
            isOutsideRange={() => false}
            date={startDate}
            numberOfMonths={1}
            onDateChange={(date) => setStartDate(date)}
            focused={focus1}
            onFocusChange={({ focused }) => setFocus1(focused)}
            id="start" // PropTypes.string.isRequired,
          />
        </Label>
        {!multiDay && (
          <Label style={{ display: "inline-block", marginLeft: 10, flex: "1" }}>
            <span>Start Time</span>
            <select>
              <option>N/A</option>
              {times.map(({ h, m }, i) => {
                let min = (m + "").split("").length === 1 ? `0${m}` : m;
                let hours = h;
                let pm = false;
                if (hours > 11) {
                  hours = hours - 12;
                  pm = true;
                }
                if (hours === 0) hours = 12;
                hours = (hours + "").split("") === 1 ? `0${hours}` : hours;
                return (
                  <option key={i}>{`${hours}:${min} ${
                    pm ? "PM" : "AM"
                  }`}</option>
                );
              })}
            </select>
          </Label>
        )}
        {!multiDay && (
          <Label style={{ display: "inline-block", marginLeft: 10, flex: "1" }}>
            <span>End Time</span>
            <select>
              <option>N/A</option>
              {times.map(({ h, m }, i) => {
                let min = (m + "").split("").length === 1 ? `0${m}` : m;
                let hours = h;
                let pm = false;
                if (hours > 11) {
                  hours = hours - 12;
                  pm = true;
                }
                if (hours === 0) hours = 12;
                hours = (hours + "").split("") === 1 ? `0${hours}` : hours;
                return (
                  <option key={i}>{`${hours}:${min} ${
                    pm ? "PM" : "AM"
                  }`}</option>
                );
              })}
            </select>
          </Label>
        )}
        {multiDay && (
          <Label style={{ display: "inline-block", marginLeft: 10, flex: "1" }}>
            <span>End Date</span>
            <SingleDatePicker
              isOutsideRange={() => false}
              date={endDate}
              numberOfMonths={1}
              onDateChange={(date) => setEndDate(date)}
              focused={focus2}
              onFocusChange={({ focused }) => setFocus2(focused)}
              id="end"
            />
          </Label>
        )}
      </div>
      <Label>
        <span>Description</span>
        <textarea
          defaultValue={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Label>
      <Label style={{ marginTop: 10, display: "flex", alignItems: "center" }}>
        <span style={{ display: "inline", marginRight: 10 }}>Image</span>
        {img && (
          <img
            src={img}
            style={{ marginRight: 10 }}
            height={40}
            alt={"thumbnail"}
          />
        )}
        <input
          type={"file"}
          accept={"image/*"}
          onChange={(e) => {
            const file = e?.target?.files?.[0];
            if (file) setImg(URL.createObjectURL(file));
          }}
          style={{ display: "inline", width: "auto" }}
        />
      </Label>
      <div style={{ marginTop: "1.5rem", display: "flex", gap: "10px" }}>
        {event ? (
          <>
            <BtnRemove
              onClick={() => {
                onRemove();
                onClose();
              }}
            >
              Remove
            </BtnRemove>
            <BtnDupe onClick={onSubmit}>Add as new</BtnDupe>
            <Btns style={{ flex: "1" }} onClick={handleUpdate}>
              Update
            </Btns>
          </>
        ) : (
          <BtnSubmit onClick={onSubmit}>Submit</BtnSubmit>
        )}
      </div>
    </div>
  );
}

export default EventAdd;
