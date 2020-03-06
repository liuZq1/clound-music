import styled,{keyframes} from 'styled-components';
import style from '../../../assets/global-style';

const rotate = keyframes`
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
`;


const MiniPlayerContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: ${style["highlight-background-color"]};
  z-index: 1000;
  display: flex;
  align-items: center;
  &.mini-enter {
    transform: translate3d(0, 100%, 0);
  }
  &.mini-enter-active {
    transform: translate3d(0, 0, 0);
    transition: all 0.4s;
  }
  &.mini-exit-active {
    transform: translate3d(0, 100%, 0);
    transition: all .4s
  }
  .icon{
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .imgWrapper {
      width: 100%;
      height: 100%;
      img{
         border-radius: 50%;
         &.play{
           animation: ${rotate} 10s infinite;
         }
         &.pause{
           animation-play-state: paused;
         }
      }
    }
  }
  .text{
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .name{
      margin-bottom: 2px;
      font-size: ${style["font-size-m"]};
      color: ${style["font-color-desc"]};
      ${style.noWrap()}
    }
    .desc {
      font-size: ${style ["font-size-s"]};
      color: ${style ["font-color-desc-v2"]};
      ${style.noWrap ()}
    }
  }
  .control{
     flex: 0 0 30px;
     padding: 0 10px;
     .iconfont, .icon-playlist {
      font-size: 30px;
      color: ${style["theme-color"]};
    }
  }
`;


export {
    MiniPlayerContainer
}