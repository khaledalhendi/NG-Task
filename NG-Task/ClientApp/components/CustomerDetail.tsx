﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import * as CustomerState from '../store/Customer';
import { bindActionCreators } from 'redux';
import { CreateAccountForm } from "./CreateAccountForm";

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
                    <table className='table'>
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
                </div>
            </div>);
    }
}