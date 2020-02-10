import React,{
    forwardRef,
    useState,
    useRef,
    useEffect,
    useImperativeHandle,
    useMemo
} from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import styled from 'styled-components';
import Loading from '../LoadingV2';
import { debounce } from '../../api/utils';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PullUpLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  margin: auto;
  height: 60px;
  z-index: 100;
`;

const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
  height: 30px;
  z-index: 100;
`;


//forwardRef 引用传递（Ref forwading）是一种通过组件向子组件自动传递 引用ref 的技术。
const Scroll = forwardRef((props,ref) => {

    //better-scroll实例
    const [bScroll,setBScroll] = useState();

    //current 指向初始化 bs 实例需要的 DOM 元素
    const scrollContainerRef = useRef();

    //外面接受 props，解构赋值拿到这些参数:
    const { direction, click, refresh,  bounceTop, bounceBottom } = props;

    const { pullUp, pullDown, onScroll,pullUpLoading,pullDownLoading } = props;

    //防抖顶部底部刷新逻辑
    const pullUpDebounce = useMemo(() => {
        return debounce(pullUp,500)
    },[pullUp]);

    const pullDownDebounce = useMemo(() => {
        return debounce(pullDown,500)
    },[pullDown]);

    //创建better-scroll实例
    useEffect(() => {
        const scroll = new BScroll(scrollContainerRef.current,{
            scrollX: direction === "horizontal",
            scrollY: direction === "vertical",
            probeType: 3,
            click: click,
            bounce:{
                top: bounceTop,
                bottom: bounceBottom
            }
        });
        setBScroll(scroll);
        //清除
        return () => {
            setBScroll(null);
        }
        //eslint-disable-next-line
    },[]);

    //每次渲染都要更新实例，防止无法滑动
    useEffect (() => {
        if (refresh && bScroll){
            bScroll.refresh ();
        }
    });


    //给实例绑定scroll事件
    useEffect(() => {
        if (!bScroll || !onScroll) return;
        bScroll.on('scroll' , (scroll) => {
            onScroll(scroll)
        });
        return () => {
            bScroll.off('scroll');
        };
    },[onScroll,bScroll]);

    //进行下滑动判断，调用上拉刷新函数
    useEffect(() => {
        if(!bScroll || !pullUp) return;
        bScroll.on('scrollEnd',() => {
            //判断是否滑动到底部
            if(bScroll.y <= bScroll.maxScrollY+ 100){
                pullUpDebounce()
            }
        });

        return () => {
            bScroll.off('scrollEnd');
        };
    },[pullUpDebounce,pullUp,bScroll]);

    //进行上拉的判断，调用下拉刷新的函数
    useEffect (() => {
        if (!bScroll || !pullDown) return;
        bScroll.on ('touchEnd', (pos) => {
            // 判断用户的下拉动作
            if (pos.y > 50) {
                pullDownDebounce ();
            }
        });
        return () => {
            bScroll.off ('touchEnd');
        }
    }, [pullDownDebounce,pullDown, bScroll]);

    // 一般和 forwardRef 一起使用，ref 已经在 forWardRef 中默认传入
    useImperativeHandle(ref,() => ({
        //向外界暴露refresh方法
        refresh(){
            if(bScroll){
                bScroll.refresh();
                bScroll.scrollTo(0,0);
            }
        },
        // 给外界暴露 getBScroll 方法，提供 bs 实例
        getBScroll() {
            if(bScroll){
                return bScroll;
            }
        }
    }));


    const PullUpLoadingStyle = pullUpLoading  ? {display: ""} : { display:"none" };
    const PullDownLoadingStyle = pullDownLoading  ? {display: ""} : { display:"none" };

    return (
        <ScrollContainer
            ref={ scrollContainerRef }
        >
            {props.children}
            {/* 滑到底部加载动画 */}
            <PullUpLoading style={PullUpLoadingStyle}><Loading/></PullUpLoading>
            {/* 滑到顶部加载动画 */}
            <PullDownLoading style={PullDownLoadingStyle}><Loading/></PullDownLoading>
        </ScrollContainer>
    )

});

Scroll.propTypes = {
    direction: PropTypes.oneOf (['vertical', 'horizontal']),// 滚动的方向
    click: PropTypes.bool,// 是否支持点击
    refresh: PropTypes.bool,// 是否刷新
    onScroll: PropTypes.func,// 滑动触发的回调函数
    pullUp: PropTypes.func,// 上拉加载逻辑
    pullDown: PropTypes.func,// 下拉加载逻辑
    pullUpLoading: PropTypes.bool,// 是否显示上拉 loading 动画
    pullDownLoading: PropTypes.bool,// 是否显示下拉 loading 动画
    bounceTop: PropTypes.bool,// 是否支持向上吸顶
    bounceBottom: PropTypes.bool// 是否支持向下吸底
};

Scroll.defaultProps = {
    direction: "vertical",
    click: true,
    refresh: true,
    onScroll:null,
    pullUpLoading: false,
    pullDownLoading: false,
    pullUp: null,
    pullDown: null,
    bounceTop: true,
    bounceBottom: true
};


export default Scroll;
