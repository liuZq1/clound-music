import * as actionTypes from './constants';
import { getAlbumDetailRequest } from "../../../api/request";
import { fromJS } from "immutable";

const changeCurrentAlbum = ( data ) => ({
   type: actionTypes.CHANGE_CURRENT_ALBUM,
   data: fromJS(data)
});

const changeEnterLoading = data => ({
   type: actionTypes.CHANGE_ENTER_LOADING,
   data
});

const getAlbumList = id => (dispatch) => {
    getAlbumDetailRequest(id).then(res => {
        let data = res.playlist;
        console.log(res);
        dispatch(changeCurrentAlbum(data));
        dispatch(changeEnterLoading(false));
    }).catch(() => {
        console.log ("获取 album 数据失败！")
    });
};


export {
    changeCurrentAlbum,
    changeEnterLoading,
    getAlbumList
}