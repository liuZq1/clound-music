import * as actionType from './constants';
import { fromJS } from 'immutable';// 这里用到 fromJS 把 JS 数据结构转化成 immutable 数据结构

/*
    fromJS:将一个js数据转换为Immutable类型的数据
*/

const defaultState = fromJS({
    bannerList: [],
    recommendList: [],
    enterLoading: true
});

export default ( state = defaultState , action ) => {

    switch( action.type ){
        case actionType.CHANGE_BANNER : {
            return state.set('bannerList',action.data);
        }
        case actionType.CHANGE_RECOMMEND_LIST : {
            return state.set('recommendList',action.data);
        }
        case actionType.CHANGE_ENTER_LOADING : {
            return state.set('enterLoading',action.data);
        }
        default :
            return state;
    }
    
};