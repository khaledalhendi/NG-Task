import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Customer from './components/Customer';

export const routes = <Layout>
    <Route exact path='/:customerId?/:pageIndex?' component={ Customer } />
</Layout>;
