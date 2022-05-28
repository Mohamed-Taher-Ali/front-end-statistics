import React from 'react';
import MyRoutes from './MyRoutes';
import { MyStore } from 'src/store/Provider';


export default function Root() {
    return (
        <MyStore>
            <MyRoutes />
        </MyStore>
    );
}
