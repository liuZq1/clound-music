import { axiosInstace } from './config';

//获取banner
const getBannerRequest = () => {
    return axiosInstace.get('/banner');
};
//获取推荐歌单
const getRecommendListRequest = () => {
    return  axiosInstace.get('/personalized')
};

export {
    getBannerRequest,
    getRecommendListRequest
};