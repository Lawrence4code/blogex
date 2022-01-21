import React from 'react';

import { Header } from './../components'

const Layout = ({ children }) => {
    return <>
        <Header />
        {children}
    </>;
};

export default Layout;
