import React,{useEffect,useState} from 'react';

function getSize() {
    return {
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        outerHeight: window.outerHeight,
        outerWidth: window.outerWidth
    };
}

function useDocumentTitle(title) {
    useEffect(
        () => {
            document.title = title;
            return () => (document.title = "前端精读");
        },[title]
    )
}

function useWindowSize() {
    const [windowSize,setWindowSize] = useState(getSize());
    function handleResize() {
        setWindowSize(getSize())
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return windowSize
}

function Test() {
    useDocumentTitle('个人中心');
    const windowSize = useWindowSize();

    return (
        <div>{windowSize.innerWidth}</div>
    )
}

export default Test;