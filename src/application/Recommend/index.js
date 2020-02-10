import React,{useRef,useEffect} from 'react';
import { connect } from 'react-redux';
import {actionTypes} from './store';
import Slider from '../../components/Slider';
import RecommendList from '../../components/RecommendList';
import { Content } from './style';
import Scroll from '../../baseUI/Scroll';
import { forceCheck } from 'react-lazyload';
import Loading from '../../baseUI/Loading';

/*
*了视口内的图片显示真实资源，视口外则显示占位图片，需要forceCheck
* */

function Recommend(props) {
    const scrollRef = useRef ();

    const { bannerList,recommendList,enterLoading } = props;
    const { getBannerDataDispatch,getRecommendListDataDispatch } = props;

    /*
    * 性能优化,避免重复发请求,如果页面有数据，则不发请求
    * */
    useEffect(() => {
        if(!bannerList.size){
            getBannerDataDispatch();
        }
        if(!recommendList.size){
            getRecommendListDataDispatch()
        }
        //eslint-disable-next-line
    },[]);

    //将一个Immutable数据转换为JS类型的数据
    const bannerListJS = bannerList ? bannerList.toJS() : [];
    const recommendListJS = recommendList ? recommendList.toJS() : [];

    return (
        <Content>
            <Scroll ref={scrollRef} onScroll={forceCheck}>
                <div>
                    <Slider bannerList={bannerListJS}/>
                    <RecommendList recommendList={recommendListJS}/>
                </div>
            </Scroll>
            {enterLoading ? <Loading></Loading> : null}
        </Content>
    )
}

//映射 Redux 全局的 state 到组件的 props 上
//getIn: 获取嵌套数组中的数据
const mapStateToPorops = (state) => {
    // 不要在这里将数据 toJS
    // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
     return {
         bannerList: state.getIn (['recommend', 'bannerList']),
         recommendList: state.getIn (['recommend', 'recommendList']),
         enterLoading: state.getIn(['recommend', 'enterLoading'])
     }
};

//映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
    return {
        getBannerDataDispatch() {
            dispatch(actionTypes.getBannerList())
        },
        getRecommendListDataDispatch() {
            dispatch(actionTypes.getRecommendList())
        }
    }
};


const component = React.memo(Recommend);
export default connect (mapStateToPorops,mapDispatchToProps) (component)