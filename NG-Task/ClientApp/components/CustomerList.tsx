import { NavLink, Link } from 'react-router-dom';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CustomerSummary } from "../store/Customer";


interface CustomerListPros
{
    customers: CustomerSummary[]; 
}

export class CustomerList extends React.Component<CustomerListPros, {}>{

    render() {
        return <div>
            Customers: {this.props.customers.length}
            <ul>
                {this.props.customers.map(c =>
                    <li key={c.id}>
                        <Link to={`/${c.id}`}>{c.name}</Link>
                    </li>
                )}
            </ul>
        </div>;
    };
}