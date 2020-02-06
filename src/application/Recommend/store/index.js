/*
    actionCreators.js: 放不同 action 的地方
    constants.js: 常量集合，存放不同 action 的 type 值
    index.js: 用来导出 reducer，action
    reducer.js: 存放 initialState 和 reducer 函数  
*/

import reducer from './reducer';
import * as actionCreators from './actionCreators';

export {
    reducer,
    actionCreators
}