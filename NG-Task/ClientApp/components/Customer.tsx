import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as CustomerState from '../store/Customer';
import { bindActionCreators } from 'redux';
import { CustomerList } from "./CustomerList";
import { CustomerDetail } from "./CustomerDetail";


// At runtime, Redux will merge together...
type CustomerProps =
    CustomerState.CustomerState        // ... state we've requested from the Redux store
    & typeof CustomerState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ customerId: string }>; // ... plus incoming routing parameters


class Customer extends React.Component<CustomerProps, {}> {

    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.requestCustomers(); 

        let customerId = parseInt(this.props.match.params.customerId);

        if (customerId){
            this.props.requestCustomerDetails(customerId);
        }
    }

    componentWillReceiveProps(nextProps: CustomerProps) {
        // This method runs when incoming props (e.g., route params) change
        let customerId = parseInt(nextProps.match.params.customerId);

        if (customerId) {
            this.props.requestCustomerDetails(customerId);
        }
    }

    accountOnDeleteHandler = (accountId: number) => 
    {
        let customerId = parseInt(this.props.match.params.customerId);
        if (confirm(`Do you really want to delete customer's ${customerId} account: ${accountId}?`)) {
            this.props.deleteAccount(customerId, accountId);
        }  
    }


    render() {
        return <div >
            <div className=".col-3">
                <CustomerList customers={this.props.customers}/>
            </div>
            <div className=".col-9">
                <CustomerDetail customerDetail={this.props.customerDetail} onDelete={this.accountOnDeleteHandler} />
            </div>
            </div>
    }
}

const mapStateToProps = (state: ApplicationState): CustomerProps => {
    return {
        customers: state.customer.customers,
        customerDetail: state.customer.customerDetail
    } as any
};

const mapDispatchToProps = (dispatch: any): any => {
    return bindActionCreators({
        requestCustomers: CustomerState.actionCreators.requestCustomers,
        requestCustomerDetails: CustomerState.actionCreators.requestCustomerDetails,
        deleteAccount: CustomerState.actionCreators.deleteAccount
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Customer) as any;