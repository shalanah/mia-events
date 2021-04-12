import styled from "styled-components";
import { useState } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import BtnPrimary from "./BtnPrimary";
import { SingleDatePicker } from "react-dates";
import { formatHoursAndMinutes } from "./lib";

const Label = styled.label`
  text-align: left;
  display: inline-block;
  span {
    font-size: 0.7rem;
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
    font-size: 1.1rem;
    line-height: 1.5;
    padding: 0.75rem;
    width: 100%;
    border-radius: 4px;
    background: #eee;
    border: 1px solid #ccc;
    @media screen and (max-width: 600px) {
      font-size: 0.9rem;
    }
  }
  .SingleDatePicker .DateInput {
    width: 100%;
    input {
      line-height: 1;
      color: #000;
    }
  }
  input[type="file"] {
    background: transparent;
    border: none;
    padding: 0;
    font-size: 1.1rem;
    @media screen and (max-width: 600px) {
      font-size: 0.9rem;
    }
  }
`;
const Btns = styled(BtnPrimary)`
  height: 45px;
  @media screen and (max-width: 600px) {
    font-size: 0.7rem;
    padding: 10px 15px;
  }
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
const Group = styled.div`
  margin: 10px 0px;
  :last-of-type {
    margin-bottom: 0px;
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

const Container = styled.div`
  padding: 2rem;
  @media screen and (max-width: 600px) {
    padding: 2rem 1rem 1rem;
  }
`;

const Checkbox = styled.input`
  display: inline-block;
  width: auto;
  top: 2.5px;
  position: relative;
  margin-left: 10px;
`;

const H2 = styled.h2`
  text-align: left;
  font-size: 2.5rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #000;
`;

const TimeSelect = ({ onChange, defaultValue }) => {
  return (
    <select
      defaultValue={`"${JSON.stringify(defaultValue)}"`}
      onChange={(e) => {
        const val = e.target.value;
        const arr = JSON.parse(JSON.parse(val));
        onChange(arr);
      }}
    >
      <option value={"null"}>N/A</option>
      {times.map(({ h, m }, i) => {
        return (
          <option value={JSON.stringify(`[${h},${m}]`)} key={i}>
            {formatHoursAndMinutes({ h, m })}
          </option>
        );
      })}
    </select>
  );
};

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
  const [startTime, setStartTime] = useState(event ? event.startTime : null);
  const [endTime, setEndTime] = useState(event ? event.endTime : null);

  const onSubmit = () => {
    // TODO: Add validation
    onAdd({
      title,
      description,
      img,
      startDate: moment(startDate)
        .hour(startTime ? startTime[0] : 0)
        .minute(startTime ? startTime[1] : 0)
        .valueOf(),
      createdDate: Date.now(), // TODO: add updated too
      startTime,
      endTime,
      ...(multiDay && { endDate }),
    });
    onClose();
  };
  const handleUpdate = () => {
    onUpdate({
      title,
      description,
      img,
      startDate: moment(startDate)
        .hour(startTime ? startTime[0] : 0)
        .minute(startTime ? startTime[1] : 0)
        .valueOf(),
      createdDate: event.createdDate,
      updatedDate: Date.now(),
      startTime,
      endTime,
      ...(multiDay && { endDate }),
    });
    onClose();
  };

  return (
    <Container>
      <H2>{event ? "Update Event" : "Add New Event"}</H2>
      <Group>
        <Label style={{ display: "block" }}>
          <span>Title</span>
          <input
            defaultValue={title}
            type={"text"}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Label>
      </Group>
      <Group style={{ textAlign: "left" }}>
        <Label
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            justifyContent: "flex-start",
            marginBottom: "5px",
          }}
        >
          <span style={{ display: "inline", marginBottom: 0 }}>
            Multi-day event
          </span>
          <Checkbox
            defaultChecked={multiDay}
            style={{ width: "auto" }}
            type={"checkbox"}
            onChange={() => setMultiDay((v) => !v)}
          />
        </Label>
      </Group>
      <Group style={{ display: "flex" }}>
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
          <Label style={{ marginLeft: 10, flex: "1" }}>
            <span>Start Time</span>
            <TimeSelect defaultValue={startTime} onChange={setStartTime} />
          </Label>
        )}
        {!multiDay && (
          <Label style={{ marginLeft: 10, flex: "1" }}>
            <span>End Time</span>
            <TimeSelect defaultValue={endTime} onChange={setEndTime} />
          </Label>
        )}
        {multiDay && (
          <Label style={{ marginLeft: 10, flex: "1" }}>
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
      </Group>
      <Group>
        <Label style={{ display: "block" }}>
          <span>Description</span>
          <textarea
            defaultValue={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Label>
      </Group>
      <Group>
        <Label style={{ display: "flex", alignItems: "center" }}>
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
      </Group>
      <Group style={{ marginTop: "1.5rem", display: "flex", gap: "10px" }}>
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
      </Group>
    </Container>
  );
}

export default EventAdd;
