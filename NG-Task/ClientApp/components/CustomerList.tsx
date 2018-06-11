import { NavLink, Link } from 'react-router-dom';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CustomerSummary } from "../store/Customer";
import Search from 'react-search-box';


interface CustomerListPros
{
    customers: CustomerSummary[]; 
}

export class CustomerList extends React.Component<CustomerListPros, {}>{
    handleChange(value) {
        console.log(value);
    }
    renderNgSearchBar() {
        return (<div className="app">
            <div className="app__content">
                <div className="content__search content__search--with-full_name">
                
                    <div className="search__component">
                        <Search
                            data={this.props.customers}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Search By Customer RIM/Name"
                            class="search-class"
                            searchKey="name"
                        />
                    
                    </div>
                </div>
            </div>
        </div>);
    }

    render() {
       
        return <div>
            {this.renderNgSearchBar()}
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