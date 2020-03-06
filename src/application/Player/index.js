import React from 'react';
import {connect} from "react-redux";
import {
    changePlayingState,
    changeShowPlayList,
    changeCurrentIndex,
    changeCurrentSong,
    changePlayList,
    changePlayMode,
    changeFullScreen
} from './store/actionCreators';
import MiniPlayer from './miniPlayer'
import NormalPlayer from './normalPlayer';

const currentSong = {
    al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
    name: "木偶人",
    ar: [{name: "薛之谦"}]
};

function Player(props) {
    const {fullScreen} = props;
    const {toggleFullScreenDispatch} = props;
    return (
        <div>
            <MiniPlayer
                song={currentSong}
                fullScreen={fullScreen}
                toggleFullScreenDispatch={toggleFullScreenDispatch}
            />
            <NormalPlayer
                song={currentSong}
                fullScreen={fullScreen}
                toggleFullScreenDispatch={toggleFullScreenDispatch}
            />
        </div>
    )
}

//映射redux全局state到props上
const mapStateToProps = state => ({
    fullScreen: state.getIn (["player", "fullScreen"]),
    playing: state.getIn (["player", "playing"]),
    currentSong: state.getIn (["player", "currentSong"]),
    showPlayList: state.getIn (["player", "showPlayList"]),
    mode: state.getIn (["player", "mode"]),
    currentIndex: state.getIn (["player", "currentIndex"]),
    playList: state.getIn (["player", "playList"]),
    sequencePlayList: state.getIn (["player", "sequencePlayList"])
});

const mapDispatchToProps = dispatch => ({
    togglePlayingDispatch (data) {
        dispatch (changePlayingState (data));
    },
    toggleFullScreenDispatch (data) {
        dispatch (changeFullScreen (data));
    },
    togglePlayListDispatch (data) {
        dispatch (changeShowPlayList (data));
    },
    changeCurrentIndexDispatch (index) {
        dispatch (changeCurrentIndex (index));
    },
    changeCurrentDispatch (data) {
        dispatch (changeCurrentSong (data));
    },
    changeModeDispatch (data) {
        dispatch (changePlayMode (data));
    },
    changePlayListDispatch (data) {
        dispatch (changePlayList (data));
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Player));