import React from 'react';
import Slider from '../../components/Slider';
import RecommendList from '../../components/RecommendList';

function Recommend() {
    //mock数据
    const bannerList = ["https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1924582.jpg?max_age=2592000","https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1932004.jpg?max_age=2592000"].map(item => {
        return {imgUrl:item}
    });

    const recommendList = [1,2,3,4,5,6,7,8,9,10].map((item,index) => {
        return {
            id:index,
            picUrl:'https://qpic.y.qq.com/music_cover/iac4gWQcWqkC36AxKFfGmOe5P1DjJ95qoTyBoKHaXEqd9D4icTfxzplA/300?n=1',
            playCount: 17171122,
            name: "朴树、许巍、李健、郑钧、老狼、赵雷"
        }
    })
    return (
        <div>
            <Slider bannerList={bannerList}/>
            <RecommendList recommendList={recommendList}/>
        </div>
    )
}

export default React.memo(Recommend)