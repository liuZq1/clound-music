import styled from 'styled-components';
import style from '../../assets/global-style';


const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  transform-origin: right bottom;
  background: #fff;
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

const TopDesc = styled.div`
  position: relative;
  width: 100%;
  height: 275px;
  padding: 5px 20px 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 20px;
  
  .background{
    position: absolute;
    background: url(${props=>props.background}) no-repeat;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    background-position: 0 0;
    z-index: -1;
    filter: blur(20px);
    .filter{
      position: absolute;
      z-index: 10;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.2);
    }
  }
  .img_wrapper{
    position: relative;
    width: 120px;
    height: 120px;
    .decorate{
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
     }
    .play_count{
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${style["font-size-s"]};
      line-height: 15px;
      color: ${style["font-color-light"]};
      .play{
        vertical-align: top;
      }
    }
    img{
      height: 100%;
      width: 100%;
    }
  }
  .desc_wrapper{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    padding: 0 10px;
    .title{
      max-height: 70px;
      color: ${style["font-color-light"]};
      font-weight: 700;
      line-height: 1.5;
      font-size: ${style["font-size-l"]};
    }
    .person{
      display: flex;
      .avatar{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 5px;
        overflow: hidden;
        img{
          height: 100%;
          width: 100%;
        }
        }
      .name {
        line-height: 20px;
        font-size: ${style["font-size-m"]};
        color: ${style["font-color-desc-v2"]};
       }
      }
    }
  }
`;

const Menu = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 30px 20px 30px;
  box-sizing: border-box;
  margin-top: -100px;
  >div{
    display: flex;
    flex-direction: column;
    line-height: 20px;
    text-align: center;
    font-size: ${style["font-size-s"]};
    color: ${style["font-color-light"]};
    font-weight: 500;
    .iconfont {
      font-size: 20px;
    }
  }
`;



export {
    Container,
    TopDesc,
    Menu,
}