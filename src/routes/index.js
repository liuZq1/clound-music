import React from 'react';
import { Redirect } from 'react-router';
import Home from '../application/Home';
import Rank from '../application/Rank';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Test from '../Test';

//Redirect重定向
//exact默认为false，如果为true时，需要和路由相同时才能匹配，
export default  [
    {
        path:'/test',
        component:Test
    },
    {
        path: '/' ,
        component: Home,
        routes: [
            {
                path: '/' ,
                exact: true ,
                render: () => (
                    <Redirect to="/recommend"/>
                )
            },
            {
                path: '/recommend' ,
                component: Recommend ,
            },
            {
                path: '/singers' ,
                component: Singers ,
            },
            {
                path: '/rank' ,
                component: Rank ,
            }
        ]
    }
];