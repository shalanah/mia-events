import styled from "styled-components";
import BtnPrimary from "./BtnPrimary";

const BtnAdd = styled(BtnPrimary)`
  padding: 0.85rem 1.5rem 0.85rem 3.25rem;
  display: inline-block;
  position: relative;
  span {
    position: absolute;
    left: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    background: #fff;
    border-radius: 100%;
    height: 1.4em;
    width: 1.4em;
    display: inline-block;
    :before,
    :after {
      line-height: 0;
      content: "";
      width: 54%;
      height: 2px;
      position: absolute;
      background: #000;
      left: 23%;
      top: calc(50% - 1px);
    }
    :after {
      transform: rotate(90deg);
    }
  }
`;

export default BtnAdd;
