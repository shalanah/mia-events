import styled from "styled-components";
import { useState } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
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
    min-width: 100px;
    white-space: nowrap;
    display: block;
  }
  textarea {
    min-height: 300px;
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

const times = [];
const divisions = 2;
const beginHour = 7;
for (var i = 0; i < 24; i++) {
  for (var j = 0; j < divisions; j++) {
    times.push({ h: (i + beginHour) % 24, m: 60 * (j / divisions) });
  }
}

function EventAdd({ addEvent, onClose }) {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [multiDay, setMultiDay] = useState(false);
  const [focus1, setFocus1] = useState(null);
  const [focus2, setFocus2] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  const onSubmit = () => {
    // TODO: there should def be some checking of input + warnings
    addEvent({
      img,
      title,
      description,
      startDate: moment(startDate).valueOf(),
      createdDate: Date.now(), // maybe updated
    });
    onClose();
  };
  console.log({ img, title, description, startDate, endDate, multiDay });

  return (
    <div style={{ padding: "2rem" }}>
      <Label>
        <span>Title</span>
        <input
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
              {times.map(({ h, m }) => {
                let min = (m + "").split("").length === 1 ? `0${m}` : m;
                let hours = h;
                let pm = false;
                if (hours > 11) {
                  hours = hours - 12;
                  pm = true;
                }
                if (hours === 0) hours = 12;
                hours = (hours + "").split("") === 1 ? `0${hours}` : hours;
                return <option>{`${hours}:${min} ${pm ? "PM" : "AM"}`}</option>;
              })}
            </select>
          </Label>
        )}
        {!multiDay && (
          <Label style={{ display: "inline-block", marginLeft: 10, flex: "1" }}>
            <span>End Time</span>
            <select>
              <option>N/A</option>
              {times.map(({ h, m }) => {
                let min = (m + "").split("").length === 1 ? `0${m}` : m;
                let hours = h;
                let pm = false;
                if (hours > 11) {
                  hours = hours - 12;
                  pm = true;
                }
                if (hours === 0) hours = 12;
                hours = (hours + "").split("") === 1 ? `0${hours}` : hours;
                return <option>{`${hours}:${min} ${pm ? "PM" : "AM"}`}</option>;
              })}
            </select>
          </Label>
        )}
        {multiDay && (
          <Label style={{ display: "inline-block", marginLeft: 10, flex: "1" }}>
            <span>End Date</span>
            <SingleDatePicker
              date={endDate}
              numberOfMonths={1}
              onDateChange={(date) => setEndDate(date)}
              focused={focus2}
              onFocusChange={({ focused }) => setFocus2(focused)}
              id="end" // PropTypes.string.isRequired,
            />
          </Label>
        )}
      </div>
      <Label>
        <span>Description (Markdown)</span>
        <textarea
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Label>
      <Label style={{ marginTop: 10 }}>
        <span style={{ display: "inline", marginRight: 10 }}>Image</span>
        <input
          type={"file"}
          onChange={(e) => {
            const file = e?.target?.files?.[0];
            if (file) setImg(URL.createObjectURL(file));
          }}
          style={{ display: "inline", width: "auto" }}
        />
      </Label>
      <button>Clear</button>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

export default EventAdd;
