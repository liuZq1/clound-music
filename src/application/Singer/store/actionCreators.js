import * as actionTypes from './constants';
import { fromJS } from "immutable";
import { getSingerInfoRequest } from './../../../api/request';

const changeArtist = data => ({
   type: actionTypes.CHANGE_ARTIST,
   data: fromJS(data)
});

const changeSongs = data => ({
    type: actionTypes.CHANGE_SONGS_OF_ARTIST,
    data: fromJS(data)
});
const changeEnterLoading = data => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
});

const getSingerInfo = (id) => (dispatch) => {
    getSingerInfoRequest(id).then(res => {
        dispatch (changeArtist (res.artist));
        dispatch (changeSongs (res.hotSongs));
        dispatch (changeEnterLoading (false));
    }).catch( () => {
        console.log('获取歌手歌单失败');
    });
};

export {
    changeArtist,
    changeSongs,
    changeEnterLoading,
    getSingerInfo
}