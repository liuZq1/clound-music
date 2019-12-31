import styled from 'styled-components';
import style from '../../assets/global-style';

const Top = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between; 
    background:${style["theme-color"]};
    padding:5px 10px;
    & > span {
        line-height:40px;
        font-size:20px;
        color:#f1f1f1;
        &.iconfont{
            font-size:25px;
        }
    }
`;

const Tab = styled.div`
    display:flex;
    flex-dictionary:row;
    height:44px;
    justify-content:space-around;
    background:${style["theme-color"]};
    a{
        flex:1;
        padding:2px 0;
        color: #e4e4e4;
        font-size:14px;
        &.selected{
            span{
                padding: 3px 0;
                font-weight: 700;
                color: #f1f1f1;
                border-bottom: 2px solid #f1f1f1;
            }
          
        }
     }
`;

const TabItem = styled.div`
    display:flex;
    flex-dictionary:row;
    justify-content:center;
    align-items:center;
    height:100%;
`;


export {Top,Tab,TabItem}