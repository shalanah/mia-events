import styled from "styled-components";
import Btn from "./Btn";

const BtnPrimary = styled(Btn)`
  background: #000;
  color: rgb(255, 255, 255);
  font-size: 0.9rem;
  padding: 0.85rem 1.5rem;
  line-height: 1;
  border-radius: 5px;
  transition: 0.2s;
  font-weight: 800;
  cursor: pointer;
  text-transform: uppercase;
  :hover {
    background: #444;
  }
`;

export default BtnPrimary;
