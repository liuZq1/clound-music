import React,{createContext,useReducer} from "react";
import { fromJS } from "immutable";

/*
*
* 让组件切换时能够保存当前组件的状态。当组件切换后，当前组件即被卸载，
* 对于组件内部有关的函数引用也会消失，作用域引用消失，闭包变量不复存在。
* 所以通过该组件内部缓存是行不通的，必须采取状态存储在组件外的方式。
* singer category , alpha
* */


//context
export const CategoryDataContext = createContext({});

//相当于之前的constants
export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY';
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA';

//reducer函数
const reducer = (state,action) => {
    switch (action.type) {
        case CHANGE_CATEGORY:{
            return state.set('category',action.data);
        }
        case CHANGE_ALPHA:{
            return state.set('alpha',action.data);
        }
        default:
            return state;
    }
};

//Provider组件
export const Data = (props) => {
    const [data,dispatch] = useReducer(reducer,fromJS({
        category:'',
        alpha:''
    }));
    return (
        <CategoryDataContext.Provider value={{data,dispatch}}>
            {props.children}
        </CategoryDataContext.Provider>
    )
};