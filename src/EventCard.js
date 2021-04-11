import styled from "styled-components";
import moment from "moment";

const Container = styled.div`
  margin-bottom: 0.5rem;
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
    filter: url("#filter");
  }
  :hover {
    transform: scale(1.02);
    box-shadow: 1px 2px 30px rgba(0, 0, 0, 0.2);
    img {
      filter: none;
    }
  }
`;

function EventCard({
  title,
  description,
  startDate,
  endDate,
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
          src={img}
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
            lineHeight: 1,
            marginTop: ".9rem",
            letterSpacing: ".03rem",
          }}
        >
          {/* {moment(startDate).format("MMMM Do YYYY, h:mma")} */}
          {moment(startDate).format("dddd, MMMM D, YYYY")}
        </h3>
      </div>
    </Container>
  );
}

export default EventCard;
