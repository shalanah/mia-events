import { useEffect } from "react";
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
  position: fixed;
  overflow: auto;
  animation: 0.1s ${fadeIn};
  display: flex;
`;
const Modal = styled.div`
  position: relative;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #ccc;
  height: auto;
  margin: auto;
  text-align: center;
  /* width: 100% */
  width: clamp(500px, 50%, 700px);
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

const Close = styled.span`
  cursor: pointer;
  border: 2px solid #000;
  &::before,
  &::after {
    content: "";
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    position: absolute;
    width: 60%;
    height: 2px;
    background: #000;
  }
  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const DownloadModal = ({ onClose, children, ...props }) => {
  useKeyPress("Escape", onClose);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return ReactDOM.createPortal(
    <>
      <Bg {...props}>
        <Modal
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Close
            style={{
              position: "absolute",
              borderRadius: "100%",
              height: 26,
              width: 26,
              top: 8,
              right: 8,
            }}
            onClick={onClose}
          />
          {children}
        </Modal>
      </Bg>
    </>,
    document.body
  );
};

export default DownloadModal;
