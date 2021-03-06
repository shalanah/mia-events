import styled from "styled-components";
import moment from "moment";
import tempImg from "./assets/mia.jpg";
import { formatHoursAndMinutes } from "./lib";

const Container = styled.button`
  margin-bottom: 0.5rem;
  text-align: left;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  transition: 0.2s;
  p {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  img {
    transition: 0.2s;
  }
  :hover {
    transform: scale(1.02);
    box-shadow: 1px 2px 30px rgba(0, 0, 0, 0.2);
  }
`;

const formatDates = ({ startDate, endDate, startTime, endTime }) => {
  if (startDate && endDate && moment(startDate).diff(endDate, "days") !== 0) {
    const start = moment(startDate).format("MMMM D, YYYY");
    const end = moment(endDate).format("MMMM D, YYYY");
    return `${start} - ${end}`;
  }
  const formatStartTime = startTime
    ? formatHoursAndMinutes({
        h: startTime[0],
        m: startTime[1],
        spaceBetween: false,
      })
    : "";
  const formatEndTime = endTime
    ? formatHoursAndMinutes({
        h: endTime[0],
        m: endTime[1],
        spaceBetween: false,
      })
    : "";
  const isThisYear = moment(startDate).year() === moment().year();
  const format = isThisYear ? "dddd, MMMM D" : "dddd, MMMM D, YYYY";
  return `${moment(startDate).format(format)}${
    formatStartTime ? `, ${formatStartTime}` : ""
  }${formatEndTime ? ` - ${formatEndTime}` : ""}`;
};

function EventCard({
  title,
  description,
  startDate,
  endDate,
  startTime,
  endTime,
  img,
  alt,
  ...props
}) {
  return (
    <Container {...props}>
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          height: "200px",
          position: "relative",
        }}
      >
        <img
          src={img || tempImg}
          alt={alt}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div
        style={{
          padding: "1rem 1rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          height: "auto",
          flex: "1",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "1.25rem",
              marginBottom: ".75rem",
            }}
          >
            {title}
          </h2>
          <p>{description}</p>
        </div>
        <h3
          style={{
            fontSize: "1rem",
            lineHeight: 1.2,
            marginTop: ".9rem",
            letterSpacing: ".03rem",
          }}
        >
          {formatDates({ startDate, endDate, startTime, endTime })}
        </h3>
      </div>
    </Container>
  );
}

export default EventCard;
