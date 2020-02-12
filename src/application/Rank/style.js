import styled from'styled-components';
import style from '../../assets/global-style';

// Props 中的 globalRank 和 tracks.length 均代表是否为全球榜
const Container = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
  .offical,.global{
    margin: 10px 5px;
    padding-top: 15px;
    font-weight: 700;
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc"]};
  }
`;

const List = styled.ul`
  margin-top: 10px;
  padding: 0 5px;
  display: ${props => props.globalRank ? "flex": "" };
  flex-wrap: wrap;
  justify-content: space-between;
  background: ${style["background-color"]};
  //&::after{
  //  content: '';
  //  display:block;
  //  width: 32vw;
  //}
`;

const ListItem = styled.li`
  display: ${props => props.tracks.length ? 'flex':''};
  padding: 3px 0;
  border-bottom: 1px solid ${style['border-color']};
  .img_wrapper{
    position: relative;
    width:  ${props => props.tracks.length ? "27vw": "32vw"};
    height: ${props => props.tracks.length ? "27vw": "32vw"};
    border-radius: 3px;
    img{
      height: 100%;
      width: 100%;
      border-radius: 3px;
    }
    .decorate{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
       background: linear-gradient(hsla(0,0%,100%,0),hsla(0,0%,43%,.4));
    }
    .update_frequecy{
      position: absolute;
      left: 7px;
      bottom: 7px;
      font-size: ${style["font-size-ss"]};
      color: ${style["font-color-light"]}
    }
  }
`;

const SongList = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;
  > li {
    font-size: ${style["font-size-s"]};
    color: gray;
  }
`;

export {
    Container,
    List,
    ListItem,
    SongList
}