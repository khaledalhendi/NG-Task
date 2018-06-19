﻿import { NavLink, Link, Redirect, RouteComponentProps, Router } from 'react-router-dom';
import * as React from 'react';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CustomerSummary } from "../store/Customer";
import Search from 'react-search-box';

interface CustomerListPros
{
    customers: CustomerSummary[]; 
    selectedId?: number; 
}

interface CustomerListState {
    filtered: CustomerSummary[];
}
export class CustomerList extends React.Component<CustomerListPros, CustomerListState>{
    handleChange(value) {
        //console.log(typeof value)
        //console.log(value);
    }

    componentWillMount() {
        this.setState({ filtered: this.props.customers });
        this.filteredCustomers("A");
    }
    filteredCustomers(filterInput: string) {
        //let filtered: CustomerSummary[] = [{ name: filterInput, id: 0, branch: "b1" }, { name: "2", id: 1, branch:"b2" }];
        let filtered: CustomerSummary[] = this.props.customers;
        //do filter logic 
        this.setState({ filtered }); //this means filterd global = local 
    }
    renderNgSearchBar() {
        var inBox = this.handleChange
        //console.log(inBox)
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
            <div className="list-group">
                Results: {this.state.filtered.length} 
                {this.state.filtered.map(c =>
                    <Link key={c.id} className={"btn list-group-item" + (this.props.selectedId == c.id ? " disabled" : "")} to={`/${c.id}`}>
                        {c.name}
                    </Link>
                )}
            </div>
        </div>;
    };
}