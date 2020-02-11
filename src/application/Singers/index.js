import React, {useContext, useEffect} from 'react';
import { connect  } from "react-redux";
import Horizontal from '../../baseUI/Horizontal-item';
import { categoryTypes,alphaTypes } from '../../api/config';
import { NavContainer ,ListContainer,List,ListItem } from './style';
import Scroll from '../../baseUI/Scroll';
import { actionTypes } from './store';
import Loading from '../../baseUI/Loading';
import LazyLoad, {forceCheck} from 'react-lazyload';
//用react hook模拟reducer
import { CategoryDataContext,CHANGE_ALPHA,CHANGE_CATEGORY } from './data';


//渲染函数,返回歌手列表
const renderSingerList = (singerList) => {
    const list = singerList ? singerList.toJS() : [];

    return (
        <List>
            {
                list.map((item,index) => {
                    return (
                        <ListItem key={item.accountId+"" +index}>
                            <div className={"img_wrapper"}>
                                {/*img 标签外部包裹一层 LazyLoad*/}
                                <LazyLoad placeholder={<img src={require('./singer.png')} width="100%" height="100%" alt="music"/>}>
                                    <img src={item.picUrl ?`${item.picUrl}?param=300*300`:require('./singer.png')} alt="music" width={"100%"} height={"100%"}/>
                                </LazyLoad>
                            </div>
                            <span className="name">{item.name}</span>
                        </ListItem>
                    )
                })
            }
        </List>
    )
};



function Singers( props ) {
    const {data,dispatch} = useContext(CategoryDataContext);
    const { category, alpha } = data.toJS ();

    const { getHotSingerDispatch,pullUpLoading,pullDownLoading,
        pullUpRefreshDispatch,pullDownRefreshDispatch,updateDispatch } = props;
    const { pageCount,enterLoading,singerList } = props;

    useEffect(()=>{
        if(!singerList.size > 0){
            getHotSingerDispatch()
        }
        // eslint-disable-next-line
    },[]);

    //点击分类
    let handleCategory = (val) => {
        dispatch({type:CHANGE_CATEGORY,data:val});
        updateDispatch(val,alpha)
    };
    //点击字母
    let handleAlpha = (val) => {
        dispatch({type:CHANGE_ALPHA,data:val});
        updateDispatch(category,val)
    };

    let handlePullUp = () => {
        pullUpRefreshDispatch(category, alpha, category === '', pageCount);
    };

    let handlePullDown = () => {
        pullDownRefreshDispatch(category, alpha, category === '', pageCount);
    };

    return (
        <NavContainer>
            <Horizontal
                list={categoryTypes}
                title={"分类 (默认热门):"}
                handleClick={ (val) => handleCategory(val) }
                oldVal={category}
            />
            <Horizontal
                list={alphaTypes}
                title={"首字母:"}
                handleClick={ (val) => handleAlpha(val) }
                oldVal={alpha}
            />
            <ListContainer>
                {enterLoading ? <Loading/> : null}
                <Scroll
                    onScroll={forceCheck}
                    pullDownLoading={pullDownLoading}
                    pullUpLoading={pullUpLoading}
                    pullUp={handlePullUp}
                    pullDown={handlePullDown}
                >
                    { renderSingerList(singerList) }
                </Scroll>
            </ListContainer>
        </NavContainer>
    )
}

//映射 Redux 全局的 state 到组件的 props 上
//getIn: 获取嵌套数组中的数据
const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount'])
});

//映射dispatch到props上去
const mapDispatchToProps = (dispatch) => ({
    getHotSingerDispatch () {
        dispatch(actionTypes.getHotSingerList())
    },
    updateDispatch (category,alpha) {
        //由于改变了分类,pageCount清零
        dispatch(actionTypes.changePageCount(0));
        dispatch(actionTypes.changeEnterLoading(true));//loading
        dispatch(actionTypes.getSingerList(category,alpha));
    },
    //滑动到最底部刷新
    pullUpRefreshDispatch( category, alpha, hot, count ) {
        dispatch(actionTypes.changePullUpLoading(true));
        dispatch(actionTypes.changePageCount(count +1 ));
        if(hot) {
            dispatch(actionTypes.refreshMoreHotSingerList())
        }else {
            dispatch(actionTypes.refreshMoreSingerList(category, alpha))
        }
    },
    //顶部刷新
    pullDownRefreshDispatch(category,alpha) {
        dispatch(actionTypes.changePullDownLoading(true));
        dispatch(actionTypes.changePageCount(0)); //重新获取数据
        if(category === '' && alpha === ''){
            dispatch(actionTypes.getHotSingerList());
        }else {
            dispatch(actionTypes.getSingerList(category, alpha));
        }

    }
});

const component = React.memo(Singers);
export default connect(mapStateToProps,mapDispatchToProps)(component);