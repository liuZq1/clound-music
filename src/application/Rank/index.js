import React,{useEffect} from 'react';
import { connect } from "react-redux";
import { actionTypes } from './store';
import { filterIndex,filterIdx } from '../../api/utils';
import {
    Container,
    List,
    ListItem,
    SongList
} from "./style";
import Scroll from '../../baseUI/Scroll';


const enterDetail = (name) => {
    const idx = filterIdx(name);
    if(idx === null) {
        alert("暂无相关数据");
        return;
    }
};


const renderSong = (list) => {
    return list.length ? (
        <SongList>
            {
                list.map((item,index) => {
                    return <li key={index}>{index+1}. {item.first} - {item.second}</li>
                })
            }
        </SongList>
    ) : null
};

//这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
const renderRankList = (list,global) => {
    return (
        <List globalRank={global}>
            {
                list.map((item,index) => {
                    return (
                        <ListItem
                            key={item.coverImgUrl}
                            tracks={item.tracks}
                            onClick={() => enterDetail(item.name)}
                        >
                            <div className={"img_wrapper"}>
                                <img src={item.coverImgUrl} alt=""/>
                                {/*阴影*/}
                                <div className="decorate"></div>
                                <span className="update_frequecy">{item.updateFrequency}</span>
                            </div>
                            {renderSong(item.tracks)}
                        </ListItem>
                    )
                })
            }
        </List>
    )
};

function Rank( props ) {
    const { rankList:list,loading } = props;
    const { getRankListDataDispatch } = props;
    //获取数据

    let rankList = list ? list.toJS() : [];
    useEffect(() => {
        if(!rankList.length){
            getRankListDataDispatch();
        }
        //eslint-disable-next-line
    },[]);
    /*排行榜单分为两个部分，一部分是官方榜，另一部分是全球榜。

官方榜单数据有 tracks 数组，存放部分歌曲信息，而全球榜没有。

但是后端数据并没有将这两者分开，因此我们需要做一下数据的处理。*/
    let globalStartIndex = filterIndex (rankList);
    //官方名单
    let officialList = rankList.slice(0,globalStartIndex);
    //全球名单
    let globalList = rankList.slice(globalStartIndex);

    const displayStyle = loading ? {"display":"none"}:  {"display": ""};


    return (
        <Container>
            <Scroll>
                <div>
                    <h1 style={displayStyle} className={"offical"}>官方榜</h1>
                    {renderRankList(officialList)}
                    <h1 style={displayStyle} className={"global"}>全球榜</h1>
                    {renderRankList(globalList,true)}
                </div>
            </Scroll>
        </Container>
    )
}

//映射 Redux 全局的 state 到组件的 props 上
//getIn: 获取嵌套数组中的数据
const mapStateToProps = (state) => ({
    rankList: state.getIn(['rank', 'rankList']),
    loading: state.getIn(['rank', 'loading']),
});
// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
    return {
        getRankListDataDispatch() {
            dispatch(actionTypes.getRankList());
        }
    }
};

const component = React.memo(Rank);
export default connect(mapStateToProps,mapDispatchToProps)(component);