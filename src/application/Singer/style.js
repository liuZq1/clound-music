import styled from 'styled-components';
import style from '../../assets/global-style';

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;
  overflow: hidden;
  background: #f2f3f4;
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active {
    transition: transform .3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform .3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 75%;
  background: url(${props => props.bgUrl});
  background-size: cover;
  transform-origin: top;
  z-index: 50;
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.3);
  }
`;

const CollectButton = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 120px;
  height: 40px;
  box-sizing: border-box;
  margin-top: -55px;
  z-index: 50;
  background: ${style["theme-color"]};
  color: ${style["font-color-light"]};
  text-align: center;
  line-height: 40px;
  font-size: 0;
  border-radius: 20px;
  .iconfont {
    display: inline-block;
    margin-right: 10px;
    font-size: 12px;
    vertical-align: 1px;
  }
  .text {
    display: inline-block;
    font-size:14px;
    letter-spacing: 5px;
  }
`;

const BgLayer = styled.div`

`;

const SongListWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 50;
  background: red;
  > div{
    position: absolute;
    left: 0;
    width: 100%;
    overflow: visible;
  }
`;

export {
    Container,
    ImgWrapper,
    CollectButton,
    BgLayer,
    SongListWrapper
}