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

//获取排行榜
const getRankListRequest = () => {
    return axiosInstace.get(`/toplist/detail`)
};

//获取专辑
const getAlbumDetailRequest = (id) => {
    return axiosInstace.get(`/playlist/detail?id=${id}`)
};


export {
    getBannerRequest,
    getRecommendListRequest,
    getHotSingerListRequest,
    getSingerListRequest,
    getRankListRequest,
    getAlbumDetailRequest
};