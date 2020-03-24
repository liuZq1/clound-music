import axios from 'axios';

// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
// 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
export const baseUrl = 'http://localhost:3000';

const axiosInstace = axios.create({
    baseURL:baseUrl
});

// response 拦截器,数据返回后进行一些处理
axiosInstace.interceptors.response.use (
    res => res.data,
    err => {
        console.log(err,'网络错误')
    }
);

// 歌手种类
const categoryTypes = [
    {
    name: "华语男",
    key: "1001"
},
    {
        name: "华语女",
        key: "1002"
    },
    {
        name: "华语组合",
        key: "1003"
    },
    {
        name: "欧美男",
        key: "2001"
    },
    {
        name: "欧美女",
        key: "2002"
    },
    {
        name: "欧美组合",
        key: "2003"
    },
    {
        name: "日本男",
        key: "6001"
    },
    {
        name: "日本女",
        key: "6002"
    },
    {
        name: "日本组合",
        key: "6003"
    },
    {
        name: "韩国男",
        key: "7001"
    },
    {
        name: "韩国女",
        key: "7002"
    },
    {
        name: "韩国组合",
        key: "7003"
    },
    {
        name: "其他男歌手",
        key: "4001"
    },
    {
        name: "其他女歌手",
        key: "4002"
    },
    {
        name: "其他组合",
        key: "4003"
    },
];

// 歌手首字母
const alphaTypes = [
    {
    key: "A",
    name: "A"
},
    {
        key: "B",
        name: "B"
    },
    {
        key: "C",
        name: "C"
    },
    {
        key: "D",
        name: "D"
    },
    {
        key: "E",
        name: "E"
    },
    {
        key: "F",
        name: "F"
    },
    {
        key: "G",
        name: "G"
    },
    {
        key: "H",
        name: "H"
    },
    {
        key: "I",
        name: "I"
    },
    {
        key: "J",
        name: "J"
    },
    {
        key: "K",
        name: "K"
    },
    {
        key: "L",
        name: "L"
    },
    {
        key: "M",
        name: "M"
    },
    {
        key: "N",
        name: "N"
    },
    {
        key: "O",
        name: "O"
    },
    {
        key: "P",
        name: "P"
    },
    {
        key: "Q",
        name: "Q"
    },
    {
        key: "R",
        name: "R"
    },
    {
        key: "S",
        name: "S"
    },
    {
        key: "T",
        name: "T"
    },
    {
        key: "U",
        name: "U"
    },
    {
        key: "V",
        name: "V"
    },
    {
        key: "W",
        name: "W"
    },
    {
        key: "X",
        name: "X"
    },
    {
        key: "Y",
        name: "Y"
    },
    {
        key: "Z",
        name: "Z"
    }
];

//顶部的高度
const HEADER_HEIGHT = 45;

//播放模式
const playMode = {
    sequence: 0, //顺序模式
    loop: 1, //单曲循环
    random: 2 //随机播放
};

export {
    axiosInstace,
    categoryTypes,
    alphaTypes,
    HEADER_HEIGHT,
    playMode
}