import React,{useEffect,useState,useLayoutEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useImmer } from 'use-immer';


function Immer() {
    const [person,updatePerson] = useImmer({
        name: "Michel",
        age: 33
    });

    return (
        <div>
            Immer123123
        </div>
    )
}

export default Immer;