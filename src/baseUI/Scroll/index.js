import React,{
    forwardRef,
    useState,
    useRef,
    useEffect,
    useImperativeHandle
} from 'react';
import PropTypes from 'prop-types';
import BScroll from 'better-scroll';
import styled from 'styled-components';

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;


//forwardRef 引用传递（Ref forwading）是一种通过组件向子组件自动传递 引用ref 的技术。
const Scroll = forwardRef((props,ref) => {

    //better-scroll实例
    const [bScroll,setBScroll] = useState();

    //current 指向初始化 bs 实例需要的 DOM 元素
    const scrollContainerRef = useRef();

    //外面接受 props，解构赋值拿到这些参数:
    const { direction, click, refresh,  bounceTop, bounceBottom } = props;

    const { pullUp, pullDown, onScroll } = props;

    //创建better-scroll实例
    useEffect(() => {
        const scroll = new BScroll(scrollContainerRef.current,{
            scrollX: direction === "horizental",
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

    //进行上拉判断，调用上拉刷新函数
    useEffect(() => {
        if(!bScroll || !pullUp) return;
        bScroll.on('scrollEnd',() => {
            //判断是否滑动到底部
            if(bScroll.y <= bScroll.maxScrollY+ 100){
                pullUp()
            }
        });

        return () => {
            bScroll.off('scrollEnd');
        };
    },[pullUp,bScroll]);

    //进行下拉的判断，调用下拉刷新的函数
    useEffect (() => {
        if (!bScroll || !pullDown) return;
        bScroll.on ('touchEnd', (pos) => {
            // 判断用户的下拉动作
            if (pos.y > 50) {
                pullDown ();
            }
        });
        return () => {
            bScroll.off ('touchEnd');
        }
    }, [pullDown, bScroll]);

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


    return (
        <ScrollContainer ref={ scrollContainerRef }>
            {props.children}
        </ScrollContainer>
    )

});

Scroll.propTypes = {
    direction: PropTypes.oneOf (['vertical', 'horizental']),// 滚动的方向
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
