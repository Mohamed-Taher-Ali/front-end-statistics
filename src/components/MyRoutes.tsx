import React, { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MyLayout from './MyLayout';


const pages = [
    {
        element: lazy(() => import('src/pages/MainPage')),
        path: '/'
    },
    {
        element: lazy(() => import('src/pages/DetailsPage')),
        path: '/details/:school/:camp/:country/:month'
    },
    {   // must be at end
        element: lazy(() => import('src/pages/NotFound')),
        path: '/404'
    },

].map(({ path, element: Element }) => ({ path, element: <Element />, }));


export default function MyRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MyLayout />}>
                    { pages.map((props, ind) => <Route key={ind} {...props} />) }
                </Route>
                <Route path="*" element={<Navigate to={'/404'} replace />} />
            </Routes>
        </BrowserRouter>
    );
}