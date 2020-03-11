import React,{useEffect,useRef,useState} from 'react';
import styled from 'styled-components';
import style from '../../assets/global-style';


const ProgressBarWrapper = styled.div`
  height: 30px;
  .bar-inner{
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, .3);
    .progress{
      position: absolute;
      height: 100%;
      background: ${style["theme-color"]};
    }
    .progress-btn-wrapper{
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
     .progress-btn{
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${style["border-color"]};
        border-radius: 50%;
        background: ${style["theme-color"]};
     }
    }
  }
`;

function ProgressBar(props) {
    const progressBar = useRef ();
    const progress = useRef ();
    const progressBtn = useRef ();
    const [touch, setTouch] = useState ({});

    const progressBtnWidth = 16;

    //处理进度条偏移量
    const _offset = (offSetWidth) => {
        progress.current.style.width = offSetWidth+'px';
        progressBtn.current.style.transform = `translate3d(${offSetWidth}px, 0, 0)`;
    };

    const progressTouchStart = (e) => {
        //touches: 当前屏幕上所有触摸点的列表;
        const startTouch = {};
        startTouch.initiated = true; //initiated为true表示开始滑动
        startTouch.startX = e.touches[0].pageX;// 滑动开始时横向坐标
        startTouch.left = progress.current.clientWidth; // 当前 progress 长度
        setTouch(startTouch);
    };

    const progressTouchMove = (e) => {
        if(!touch.initiated) return;
        //滑动距离
        const deltaX = e.touches[0].pageX - touch.startX;
        const barWidth = progressBar.current.clientWidth - progressBtnWidth;
        const offSetWidth = Math.min(Math.max(0,touch.left+deltaX),barWidth);
        _offset(offSetWidth);
    };

    const progressTouchEnd = () => {
        const endTouch = JSON.parse(JSON.stringify(touch));
        endTouch.initiated = false;
        setTouch(endTouch);
    };

    //点击进度条
    const progressClick = (e) => {
        const rect = progressBar.current.getBoundingClientRect ();
        const offsetWidth = e.pageX - rect.left;
        _offset (offsetWidth);
    };

    return (
        <ProgressBarWrapper>
            <div className="bar-inner" ref={progressBar} onClick={progressClick}>
                <div className="progress" ref={progress}></div>
                <div className="progress-btn-wrapper" ref={progressBtn}
                     onTouchMove={progressTouchMove}
                     onTouchStart={progressTouchStart}
                     onTouchEnd={progressTouchEnd}
                >
                    <div className="progress-btn"></div>
                </div>
            </div>
        </ProgressBarWrapper>
    )
}

export default React.memo(ProgressBar);