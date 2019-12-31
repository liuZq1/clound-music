import React,{useEffect,useState,useLayoutEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { renderRoutes } from "react-router-config";

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
        console.log('useEffect')
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useLayoutEffect(() =>{
        console.log('layout')
    },[]);


    return windowSize
}

function Test(props) {
    const { route } = props;
    useDocumentTitle('个人中心');
    const windowSize = useWindowSize();

    return (
        <div>
            {windowSize.innerWidth}
            <NavLink to="/test/immer">immer</NavLink>
            { renderRoutes (route.routes) }
        </div>
    )
}

export default Test;