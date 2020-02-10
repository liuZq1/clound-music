import { axiosInstace } from './config';

//获取banner
const getBannerRequest = () => {
    return axiosInstace.get('/banner');
};
//获取推荐歌单
const getRecommendListRequest = () => {
    return axiosInstace.get('/personalized')
};

//热门歌手
const getHotSingerListRequest = (count) => {
    return axiosInstace.get(`/top/artists?offset=${count}`)
};

//歌手分类列表
const getSingerListRequest = (category,alpha,count) => {
    return axiosInstace.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`)
};


export {
    getBannerRequest,
    getRecommendListRequest,
    getHotSingerListRequest,
    getSingerListRequest
};