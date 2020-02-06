import React,{useMemo,useState} from 'react';

export default function WithMemo () {
    const [count,setCount] = useState(0);
    const [val,setVal] = useState('');
    //不使用useMemo
    function outMemoExpensive () {
        console.log('outMemo');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;

    }

    //使用useMemo
    const memoExpensive = useMemo(() => {
        console.log('memo');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    },[count])

    return (
        <div>
            <h4>{count}-{val}-{outMemoExpensive()}-{memoExpensive}</h4>
            <div>
                <button onClick={() => setCount(count + 1)}>+1</button>
                <input value={val} onChange={event => setVal(event.target.value)}/>
            </div>
        </div>
    )
};