import * as React from 'react';
import { NavMenu } from './NavMenu';
import { CustomerList }  from './CustomerList';
import { CustomerListProp, CustomerCellProp } from '../store';

export class Layout extends React.Component<{}, {}> {

    public GetCustomers(): CustomerListProp
    {
        return {
            customers: [
                {
                    name: "Ahmad",
                    id: 0
                },
                {
                    name: "Sherif",
                    id: 1
                },
                {
                    name: "Sherif",
                    id: 2
                }
            ]
        }; 
    }; 


    public render() {

        let list : CustomerCellProp[] = this.GetCustomers().customers; 


        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'>
                    <CustomerList customers={list} />
                </div>
                <div className='col-sm-9'>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}
