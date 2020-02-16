//计算数量
const getCount = (count) => {
    if (count < 0) return;
    if (count < 10000) {
        return count;
    } else if (Math.floor (count / 10000) < 10000) {
        return Math.floor (count/1000)/10 + "万";
    } else  {
        return Math.floor (count / 10000000)/ 10 + "亿";
    }
};

//防抖函数
const debounce = (func,delay) => {
    return function (...args) {
        let timer;
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply (this, args);
            clearTimeout (timer);
        },delay)
    }
};

// 处理数据，找出第一个没有歌名的排行榜的索引
const filterIndex = rankList => {
    for (let i = 0; i < rankList.length - 1; i++) {
        if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
            return i + 1;
        }
    }
};

const filterIdx = () => {

};

const getName = (list) => {
    let str = "";
    list.map ((item, index) => {
        str += index === 0 ? item.name : "/" + item.name;
        return item;
    });
    return str;
};

//判断一个对象是否为空
const isEmptyObject = (obj) => {
    return !obj || Object.keys (obj).length === 0;
};

export {
    getCount,
    debounce,
    filterIndex,
    filterIdx,
    getName,
    isEmptyObject
}