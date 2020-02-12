import { CHANGE_RANK_LIST,CHANGE_LOADING } from './constants';
import { getRankListRequest } from '../../../api/request';
import { fromJS } from "immutable";

const changeRankList = (data) => ({
    type: CHANGE_RANK_LIST,
    data:fromJS(data)
});

const changeEnterLoading = (data) => ({
    type: CHANGE_LOADING,
    data:fromJS(data)
});

//获取排行榜列表
const getRankList = () => {
  return function (dispatch) {
      getRankListRequest().then(res => {
          const list = res && res.list;
          dispatch(changeRankList(list));
          dispatch(changeEnterLoading(false));
      }).catch(() => {
          console.log('获取排行榜失败')
      })
  }  
};


export {
    changeRankList,
    changeEnterLoading,
    getRankList
}