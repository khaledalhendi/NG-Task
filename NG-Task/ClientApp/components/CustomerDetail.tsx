import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import * as CustomerState  from '../store/Customer';
import { bindActionCreators } from 'redux';

// At runtime, Redux will merge together...
interface CustomerDetailProp 
{
    customerDetail: CustomerState.CustomerDetail; 
}

export class CustomerDetail extends React.Component<CustomerDetailProp, {}>{

    render() {
        return (< div >
            {this.props.customerDetail ? this.renderTable() : "Select a customer..."}
        </ div >);
    }

    private renderTable() {
        return (
            < div >
                < div >
                    Name: {this.props.customerDetail.name}
                </ div >
                < div >
                    Id: {this.props.customerDetail.id}
                </ div >
                < div >
                    < table className='table' >
                        < thead >
                            < tr >
                                < th > Id </ th >
                                < th > Balance </ th >
                            </ tr >
                        </ thead >
                        < tbody >
                            {
                                this.props.customerDetail.accounts.map(a =>
                                    < tr key={a.id}>
                                        < td >{a.id}</ td >
                                        < td >{a.balance}</ td >
                                    </ tr >
                                )}
                        </ tbody >
                    </ table >
                </ div >
            </ div >);
    }
}