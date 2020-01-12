import styled from 'styled-components';
import style from '../../assets/global-style';

const ListWrapper = styled.div`
    max-width:100%;
    .title{
        font-weight:700;
        padding-left:6px;
        font-size:14px;
        line-height:60px;
    }
   
`;

const List = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:space-around;
`;

const ListItem = styled.div`
    position:relative;
    width:32%;
       
    .img_wrapper{
        position: relative;
        height:0;
        padding-bottom:100%;

        .decorate{
            position:absolute;
            top:0;
            width:100%;
            height:35px;
            border-radius:3px;
            background: linear-gradient(rgba(110,110,110,0.4),rgba(255,255,255,0));
        }
        
        .play_count{
            position:absolute;
            top:2px;
            right:2px;
            line-height:15px;
            font-size:${style['font-size-s']};
            color:${style['font-color-light']}
            .play{
                vertical-align:top;
            }
        }
        
        img{
            position:absolute;
            height:100%;
            width:100%;
            border-radius:3px;
        }
    }
    
    .desc{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow:hidden;
        text-overflow:ellipsis;
        margin-top:2px;
        padding:0 2px;
        height:50px;
        font-size:${style['font-size-s']};
        color: ${style ["font-color-desc"]};
        line-height:1.4;
        text-align:left;
    }
`;

export {
    ListWrapper,
    List,
    ListItem
}