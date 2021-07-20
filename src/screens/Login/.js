import styled, { keyframes } from "styled-components";
import waves from "./wave.png";

const animate = keyframes`
    0% {
        transform: translateX(0) translateZ(0) scaleY(1);
    }
    50% {
        transform: translateX(-25%) translateZ(0) scaleY(0.55);
    }
    100% {
        transform: translateX(-50%) translateZ(0) scaleY(1);
    }
`;

export const Container = styled.div`
  .waveWrapper {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
  }
  .waveWrapperInner {
    position: absolute;
    width: 100%;
    overflow: hidden;
    height: 100%;
    bottom: -1px;
    background-image: linear-gradient(to top, blue 20%, black 80%);
  }
  .bgTop {
    z-index: 3;
    opacity: 0.5;
  }
  .bgMiddle {
    z-index: 2;
    opacity: 0.75;
  }
  .bgBottom {
    z-index: 1;
  }
  .wave {
    position: absolute;
    left: 0;
    width: 200%;
    height: 100%;
    background-repeat: repeat no-repeat;
    background-position: 0 bottom;
    transform-origin: center bottom;
    background-image: url(${waves});
  }
  .waveTop {
    background-size: 50% 100px;
  }
  .waveAnimation .waveTop {
    animation: move-wave 3s;
    -webkit-animation: move-wave 3s;
    -webkit-animation-delay: 1s;
    animation-delay: 1s;
  }
  .waveMiddle {
    background-size: 50% 120px;
  }
  .waveAnimation .waveMiddle {
    animation: ${animate} 10s linear infinite;
  }
  .waveBottom {
    background-size: 50% 100px;
  }
  .waveAnimation .waveBottom {
    animation: ${animate} 15s linear infinite;
  }
`;
