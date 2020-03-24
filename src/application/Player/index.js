import React, {useEffect, useRef, useState} from 'react';
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
import {findIndex, getSongUrl, isEmptyObject, shuffle} from '../../api/utils';
import Toast from "../../baseUI/Toast";
import {playMode} from "../../api/config";

//mock一份playList，后面直接从 redux 拿，现在只是为了调试播放效果。
function Player(props) {

    //从props中取redux数据和dispatch方法
    const {
        playing,
        currentSong:immutableCurrentSong,
        currentIndex,
        playList:immutablePlayList,
        mode,//播放模式
        sequencePlayList:immutableSequencePlayList,//顺序列表
        fullScreen
    } = props;

    const {
        togglePlayingDispatch,
        changeCurrentIndexDispatch,
        changeCurrentDispatch,
        changePlayListDispatch,//改变playList
        changeModeDispatch,//改变mode
        toggleFullScreenDispatch
    } = props;

    const playList = immutablePlayList.toJS();
    const sequencePlayList = immutableSequencePlayList.toJS();
    const currentSong = immutableCurrentSong.toJS();

    const toastRef = useRef();
    const [modeText,setModeText] = useState('');

    //单曲循环、顺序循环和随机播放
    const changeMode = () => {
        let newMode = (mode+1) % 3;
        if(newMode === 0){
            //顺序模式
            changePlayListDispatch(sequencePlayList);
            let index = findIndex(currentSong,sequencePlayList);
            changeCurrentIndexDispatch(index);
            setModeText('顺序模式')
        }else if(newMode === 1){
            //单曲循环
            changePlayListDispatch(sequencePlayList);
            setModeText('单曲循环')
        }else if(newMode === 2){
            //随机播放
            let newList = shuffle(sequencePlayList);
            let index = findIndex(currentSong, newList);
            changePlayListDispatch(newList);
            changeCurrentIndexDispatch(index);
            setModeText('随机播放')
        }
        changeModeDispatch(newMode);
        toastRef.current.show();
    };

    //目前播放时间
    const [currentTime,setCurrentTime] = useState(0);

    //歌曲总时长
    const [duration,setDuration] = useState(0);

    //记录当前的歌曲，以便于下次重渲染时比对是否是一首歌
    const [preSong,setPreSong] = useState({});

    //先mock一份currentIndex
    useEffect(() => {
        changeCurrentIndexDispatch(0);
    },[]);

    useEffect(() => {
        if(!playList.length || currentIndex === -1 || !playList[currentIndex] ||
            playList[currentIndex].id === preSong.id ){
            return
        }
        let current = playList[currentIndex];
        changeCurrentDispatch(current); //赋值歌曲信息
        setPreSong(current); //记录当前歌曲
        audioRef.current.src = getSongUrl(current.id);
        setTimeout(() => {
            audioRef.current.play();
        });
        togglePlayingDispatch(true);//播放状态
        setCurrentTime(0);//从头开始播放
        setDuration((current.dt / 1000) | 0);//时长
    },[playList,currentIndex]);

    const audioRef = useRef();

    //歌曲播放进度
    let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;


    //初始化数据
    useEffect(() => {
        if(!currentSong) return;
        changeCurrentIndexDispatch(0); //currentIndex默认为-1，临时改成0
        let current = playList[0];
        changeCurrentDispatch(current); //赋值currentSong
        audioRef.current.src = getSongUrl(current.id);
        setTimeout(() => {
            audioRef.current.play();
        });
        togglePlayingDispatch(true);//播放状态
        setCurrentTime(0);
        setDuration((current.dt / 1000) | 0);//时长
    },[]);

    //播放和暂停和audio对接
    useEffect(() => {
        playing ? audioRef.current.play() : audioRef.current.pause();
    }, [playing]);

    const clickPlaying = (e,state) => {
        e.stopPropagation();
        togglePlayingDispatch(state)
    };

    //audio标签在播放的过程中会不断地触发onTimeUpdate事件，在此需要更新currentTime变量。
    const updateTime = (e) => {
        setCurrentTime(e.target.currentTime)
    };

    //进度条被滑动或点击时用来改变percent的回调函数.
    const onProgressChange = (curPercent) => {
        const newTime = curPercent * duration;
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
        if (!playing) {
            togglePlayingDispatch(true);
        }
    };

    //一首歌循环
    const handleLoop = () => {
      audioRef.current.currentTime = 0;
      changePlayingState(true);
      audioRef.current.play();
    };

    //播放列表只有一首歌时单曲循环
    const handlePrev = () => {
        if(playList.length === 1){
            handleLoop();
            return
        }
        let index = currentIndex + 1;
        if(index < 0) index = playList.length - 1;
        if(!playing) changePlayingState(true);
        changeCurrentIndexDispatch(index)
    };

    const handleNext = () => {
        //播放列表只有一首歌时单曲循环
        if (playList.length === 1) {
            handleLoop();
            return;
        }
        let index = currentIndex + 1;
        if (index === playList.length) index = 0;
        if (!playing) togglePlayingDispatch(true);
        changeCurrentIndexDispatch(index);
    };

    const handleEnd = () => {
        if (mode === playMode.loop) {
            handleLoop();
        } else {
            handleNext();
        }
    };


    return (
        <div>
            {isEmptyObject(currentSong) ? null : <MiniPlayer
                song={currentSong}
                fullScreen={fullScreen}
                playing={playing}
                toggleFullScreen={toggleFullScreenDispatch}
                clickPlaying={clickPlaying}
                percent={percent}
            />}
            {isEmptyObject(currentSong) ? null:  <NormalPlayer
                song={currentSong}
                fullScreen={fullScreen}
                playing={playing}
                toggleFullScreen={toggleFullScreenDispatch}
                clickPlaying={clickPlaying}
                duration={duration}//总时长
                currentTime={currentTime}//播放时间
                percent={percent}//进度
                onProgressChange={onProgressChange}
                handlePrev={handlePrev} //上一首
                handleNext={handleNext} //下一首
                mode={mode}
                changeMode={changeMode}
            />}
            <audio ref={audioRef} onTimeUpdate={updateTime}></audio>
            <Toast text={modeText} ref={toastRef}  onEnded={handleEnd}></Toast>
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