import {
    getSingerListRequest,
    getHotSingerListRequest
} from '../../../api/request';
import * as actionTypes from './constants';
import { fromJS } from "immutable";

//修改歌手列表
const changeSingerList = (data) => ({
    type:actionTypes.CHANGE_SINGER_LIST,
    data:fromJS(data)
});
//修改页数
const changePageCount = (data) => ({
    type:actionTypes.CHANGE_PAGE_COUNT,
    data:fromJS(data)
});
//进场loading
const changeEnterLoading = (data) => ({
    type:actionTypes.CHANGE_ENTER_LOADING,
    data:fromJS(data)
});
//滑动到最底部loading
const changePullUpLoading = (data) => ({
    type:actionTypes.CHANGE_PULLUP_LOADING,
    data:fromJS(data)
});
//滑动到最顶部部loading
const changePullDownLoading = (data) => ({
    type:actionTypes.CHANGE_PULLDOWN_LOADING,
    data:fromJS(data)
});

//第一次加载热门歌手
const getHotSingerList = () => {
  return (dispatch) => {
    getHotSingerListRequest(0).then( res => {
        const data = res.artists;
        dispatch(changeSingerList(data));
        dispatch(changePullDownLoading(false));
        dispatch(changeEnterLoading(false));
    }).catch( () => {
        console.log('热门歌手数据获取失败')
    });
  }
};

//加载更多热门歌手
const refreshMoreHotSingerList = () => (dispatch,getState) => {
    const pageCount = getState().getIn(['singers','pageCount']);
    const singerList = getState().getIn(['singers','singerList']).toJS();

    getHotSingerListRequest(pageCount).then(res => {
        const data = [...singerList,res.artists];
        dispatch(changeSingerList(data));
        dispatch(changePullUpLoading(false));
    }).catch( () => {
        console.log('热门歌手数据获取失败')
    });
};

//第一次加载对应类别的歌手
const getSingerList = (category, alpha) => (dispatch,getState) => {
    getSingerListRequest(category,alpha,0).then(res => {
        const data = res.artists;
        dispatch(changeSingerList(data));
        dispatch(changeEnterLoading(false));
        dispatch(changePullDownLoading(false));
    }).catch(() => {
        console.log('歌手数据获取失败')
    })
};

//加载更多歌手
const refreshMoreSingerList = (category, alpha) => (dispatch,getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount']);
    const singerList = getState().getIn(['singers', 'singerList']).toJS();
    getSingerListRequest(category,alpha,pageCount).then(res => {
        const data = [...singerList, ...res.artists];
        dispatch(changeSingerList(data));
        dispatch(changePullUpLoading(false));
    }).catch(() => {
        console.log('歌手数据获取失败')
    })
};

export {
    changeSingerList,
    changeEnterLoading,
    changePageCount,
    changePullDownLoading,
    changePullUpLoading,
    getHotSingerList,
    refreshMoreHotSingerList,
    getSingerList,
    refreshMoreSingerList
}