import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import * as CustomerState from '../store/Customer';
import { bindActionCreators } from 'redux';
import { CreateAccountForm } from "./CreateAccountForm";
import configureStore from '../configureStore';


// At runtime, Redux will merge together...
interface CustomerDetailProp {
    customerDetail: CustomerState.CustomerDetail;
    onDelete: (accountId: number) => void;
}

export class CustomerDetail extends React.Component<CustomerDetailProp, {}>{

    render() {
        return (<div>
            {this.props.customerDetail ? this.renderTable() : "Select a customer..."}
        </div>);
    }

    private renderTable() {
        return (
            <div className="panel">
                <div className="panel">
                    <div>
                        Name: {this.props.customerDetail.name}
                    </div>
                    <div>
                        Total Balance: {this.props.customerDetail.totalBalance}
                    </div>
                    <div>
                        OpenDate: {this.props.customerDetail.openDate}
                    </div>
                </div>
                <div>
                    <table className='table panel'>
                        <thead>
                            <tr>
                                <th> Id </ th>
                                <th> AccountType </th>
                                <th> ClassCode </th>
                                <th> Balance </th>
                                <th> Currency </th>
                                <th id="deleteButton"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.customerDetail.accounts.map(a =>
                                    <tr key={a.id}>
                                        <td>{a.id}</td>
                                        <td>{a.accountType}</td>
                                        <td>{a.classCode}</td>
                                        <td>{a.balance}</td>
                                        <td>{a.currencyISO}</td>
                                        <td> <button className="btn btn-danger" onClick={(e) => this.props.onDelete(a.id)}> Delete</button> </ td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                    {this.renderAccountPagination()}
                </div>
                
            </div>);
    }

    renderAccountPagination() {

        if (this.props.customerDetail.accountLength <= this.props.customerDetail.pageSize) {
            return; 
        }

        let pageIndex = this.props.customerDetail.pageIndex; 
        let prevButton = null; 
        let nextButton = null; 

        if (pageIndex > 1) {
            prevButton = <li>
                <Link to={`/${this.props.customerDetail.id}/${pageIndex - 1}`} aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </Link>
            </li>; 
        }

        let length = this.props.customerDetail.accountLength; 
        let pageSize = this.props.customerDetail.pageSize;
        let lastPage = Math.ceil(length / pageSize); 

        if (pageIndex < lastPage) {
            nextButton = <li>
                <Link to={`/${this.props.customerDetail.id}/${this.props.customerDetail.pageIndex + 1}`} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </Link>
            </li>;
        }

        let html = <div className="row">
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {prevButton}
                    <li><a>{this.props.customerDetail.pageIndex}</a></li>
                    {nextButton}
                </ul>
            </nav>
        </div>; 

    return html; 
    }
}