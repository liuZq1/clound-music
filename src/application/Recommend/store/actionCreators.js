import * as actionTypes from './constants';
import { fromJS } from 'immutable';// 将 JS 对象转换成 immutable 对象
import {
    getBannerRequest,
    getRecommendListRequest
} from '../../../api/request';

const changeBannerList = ( data ) => ({
    type: actionTypes.CHANGE_BANNER,
    data: fromJS(data)
});

const changeRecommendList = ( data ) => ({
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS(data)
});

const changeEnterLoading = (data) => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data: fromJS(data)
});

//获取轮播，派发action
const getBannerList = () => (dispatch) => {
    getBannerRequest().then( data => {
        dispatch( changeBannerList(data.banners)  )
    }).catch( () => {
        console.log('获取轮播数据失败');
    })
};

//获取推荐歌单，派发action
//在获取推荐歌单吼,将loading状态改为false
const getRecommendList = () => (dispatch) => {
    getRecommendListRequest().then( data => {
        dispatch( changeRecommendList(data.result));
        dispatch( changeEnterLoading(false) )
    }).catch( () => {
        console.log('推荐歌单数据传输错误');
    })
};



export {
    changeBannerList,
    changeRecommendList,
    changeEnterLoading,
    getBannerList,
    getRecommendList
}