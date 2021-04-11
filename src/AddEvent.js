import styled from "styled-components";

const Label = styled.label`
  display: block;
`;

function AddEvent() {
  return (
    <form>
      <Label>
        <span>Title</span>
        <input type={"text"} />
      </Label>
      <Label>
        <span>Description</span>
        <textarea />
      </Label>
      <Label>
        <span>Date</span>
        <input type={"text"} />
      </Label>
      <Label>
        <span>Image</span>
        <input type={"file"} />
      </Label>
      <Label>
        <span>Tag</span>
        <input type={"text"} />
      </Label>
      <submit />
    </form>
  );
}

export default AddEvent;
