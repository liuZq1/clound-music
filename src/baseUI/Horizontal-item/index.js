import React , {
    useRef,useEffect,memo,
} from 'react';
import styled from 'styled-components';
import Scroll from '../Scroll';
import PropTypes from 'prop-types';
import style from '../../assets/global-style';

const List = styled.div`
  display:flex;
  align-items: center;
  height:30px;
  overflow: hidden;
  > span:first-of-type{
    display: block;
    flex:0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${style["font-size-m"]};
    vertical-align: middle;
  }
`;

const ListItems = styled.span`
  flex:0 0 auto;
  font-size: ${style["font-size-m"]};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${style["theme-color"]};
    border: 1px solid ${style["theme-color"]};
    opacity: 0.8;
  }
`;

function Horizontal(props) {
    const { list,oldVal,title } = props;
    const { handleClick } = props;

    //声明ref
    const Category = useRef(null);

    //初始化内容宽度逻辑
    useEffect(() => {
        const categoryDom = Category.current;
        const tagElements = categoryDom.querySelectorAll('span');
        let totalWidth = 0;
        Array.from(tagElements).forEach(ele => {
            totalWidth += ele.offsetWidth
        });
        categoryDom.style.width = totalWidth + 'px';
    },[]);


    return (
        <Scroll direction={"horizontal"}>
            <div ref={Category}>
                <List>
                    <span>{title}</span>
                    {
                        list.map((item) => {
                            return (
                                <ListItems
                                    key={item.key}
                                    className={oldVal === item.key ? 'selected' :''}
                                    onClick={() => handleClick(item.key)}
                                >
                                    {item.name}
                                </ListItems>
                            )
                        })
                    }
                </List>
            </div>
        </Scroll>
    )
}

Horizontal.defaultProps = {
  list:[],
  oldVal:'',
  title:'',
  handleClick:null
};

Horizontal.prototype = {
    list:PropTypes.array,      //接受的列表数据
    oldVal:PropTypes.string,   //当前Item的值
    title:PropTypes.string,    //列表左边的标题
    handleClick:PropTypes.func //点击不同Item的执行函数
};


export default memo(Horizontal);