import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 0.5rem;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
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

function EventCard({ title, description, date, img, alt }) {
  return (
    <Container>
      <svg style={{ position: "absolute", left: "-100%", top: "-100%" }}>
        <filter
          id="filter"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
1 0 0 0 0
1 0 0 0 0
0 0 0 1 0"
            in="SourceGraphic"
            result="colormatrix"
          />
          <feComponentTransfer in="colormatrix" result="componentTransfer">
            <feFuncR type="table" tableValues="0.43 0.97" />
            <feFuncG type="table" tableValues="0.06 0.88" />
            <feFuncB type="table" tableValues="0.37 0.79" />
            <feFuncA type="table" tableValues="0 1" />
          </feComponentTransfer>
          <feBlend
            mode="normal"
            in="componentTransfer"
            in2="SourceGraphic"
            result="blend"
          />
        </filter>
      </svg>
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
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <div style={{ padding: "1rem 1rem 1.5rem" }}>
        <h2
          style={{
            fontSize: "1.25rem",
            marginBottom: ".75rem",
          }}
        >
          {title}
        </h2>
        <p>{description}</p>
        <h3
          style={{
            fontSize: "1rem",
            lineHeight: 1,
            marginTop: ".9rem",
            letterSpacing: ".03rem",
          }}
        >
          {date}
        </h3>
      </div>
    </Container>
  );
}

export default EventCard;
