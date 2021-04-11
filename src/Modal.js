import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import useKeyPress from "./hooks/useKeypress";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const comeUp = keyframes`
  0% {
    transform: translateY(15px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const Bg = styled.div`
  background: rgba(25, 25, 25, 0.75);
  height: 100%;
  left: 0px;
  width: 100%;
  top: 0px;
  position: absolute;
  overflow: auto;
  animation: 0.1s ${fadeIn};
  display: flex;
  color: #555;
`;
const Modal = styled.div`
  position: relative;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #ccc;
  height: auto;
  overflow: hidden;
  margin: auto;
  text-align: center;
  width: auto;
  animation: 0.125s ${comeUp};
  @media screen and (max-width: 600px) {
    width: calc(100% - 20px);
    width: 100%;
    border-radius: 0px;
    margin: auto 0 0 0;
    overflow: auto;
  }
  @media screen and (max-height: 515px) {
    width: 100%;
    border-radius: 0px;
    margin: auto 0 0 0;
    overflow: auto;
  }
`;

const Pad1 = styled.div`
  transition: 0.2s ease-in-out transform, 0.1s opacity ease-in;
  padding: 30px;
  @media screen and (max-width: 900px) {
    padding: 30px 15px;
  }
`;
const Close = styled.span`
  background: #eee;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  &::before,
  &::after {
    content: "";
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    position: absolute;
    width: 60%;
    height: 2px;
    background: #aaa;
  }
  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const DownloadModal = ({ onClose, children, ...props }) => {
  useKeyPress("Escape", onClose);
  return ReactDOM.createPortal(
    <>
      <Bg {...props}>
        <Modal
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Close onClick={onClose} />
          {children}
        </Modal>
      </Bg>
    </>,
    document.body
  );
};

export default DownloadModal;
