﻿import * as React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import * as CustomerState from '../store/Customer';
import { bindActionCreators } from 'redux';
import { CreateAccountForm } from "./CreateAccountForm";
import configureStore from '../configureStore';
import { CustomerAccount } from '../store/Customer';
import { PageHeader, Table, Pagination } from 'react-bootstrap';


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

        let tableData: CustomerAccount[] = []; 
        let accounts = this.props.customerDetail.accounts; 

        for (var i = 0; i < this.props.customerDetail.pageSize; i++) {
            if (i < accounts.length) {
                tableData.push(accounts[i]); 
            }
            else {
                tableData.push({ accountType: " ", balance: null, classCode: "", currencyISO: "", id: -i }); 
            }
        }


        return (
            <div className="panel" id="toti">
                <PageHeader style={{marginTop: "5px"}}>
                    Customer Details
                </PageHeader>
                <div className="panel">
                    <div>
                        <strong>Name: </strong>{this.props.customerDetail.name}
                    </div>
                    <div>
                        <strong>Total Balance: </strong>{this.props.customerDetail.totalBalance}
                    </div>
                    <div>
                        <strong>OpenDate: </strong>{this.props.customerDetail.openDate}
                    </div>
                    <div>
                        <strong>Accounts: </strong>{this.props.customerDetail.accountLength}
                    </div>

                </div>
                <div className="panel">
                    <Table>
                        <thead style={{ backgroundColor: "black", borderColor: "black", borderRadius: "10", color:"#ccc"}}>
                            <tr className="header">
                                <th> Id </ th>
                                <th> AccountType </th>
                                <th> ClassCode </th>
                                <th> Balance </th>
                                <th> Currency </th>
                                <th id="deleteButton"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map(a =>
                                <tr key={a.id} style={{ lineHeight: "50px", height: "50px"}}> 
                                    <td>{a.balance ? a.id : null}</td>
                                        <td>{a.accountType}</td>
                                        <td>{a.classCode}</td>
                                        <td>{a.balance}</td>
                                        <td>{a.currencyISO}</td>
                                    <td>
                                        {a.balance ? <button className="btn btn-danger" onClick={(e) => this.props.onDelete(a.id)}> Delete </button> : ""}
                                        </ td>
                                    </tr>
                                )}
                        </tbody>
                    </Table>
                </div>
                {this.renderAccountPagination()}
                
            </div>);
    }

    renderAccountPagination() {
        let pageIndex = this.props.customerDetail.pageIndex;
        let lastPage = Math.ceil(this.props.customerDetail.accountLength / this.props.customerDetail.pageSize);

        let pagationItems = [];

        //previos
        pagationItems.push(<li>
            <Link to={`/${this.props.customerDetail.id}/${pageIndex - 1}`} disabled={pageIndex <= 1}><span className="glyphicon glyphicon-menu-left" /></Link>
        </li>
        );

        //pages 
        for (let i = 1; i <= lastPage; i++) {
            pagationItems.push(
                <li className={i === pageIndex ? "active" : ""}>
                    <Link to={`/${this.props.customerDetail.id}/${i}`} disabled={i === pageIndex}>{i}</Link>
                </li>
            );
        }

        //next 
        pagationItems.push(<li>
            <Link to={`/${this.props.customerDetail.id}/${pageIndex + 1}`} disabled={pageIndex >= lastPage}><span className="glyphicon glyphicon-menu-right" /></Link>
        </li>
        );

        //pagation element
        const paginationBasic = (
            <div className="text-center">
                <Pagination bsSize="medium" style={{ backgroundColor:"green", marginTop: "0px", marginBottom: "10px" }}>
                    {pagationItems}
                </Pagination>
            </div>
        );

        return paginationBasic; 
    }
}