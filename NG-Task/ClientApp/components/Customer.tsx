import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as CustomerState from '../store/Customer';
import { bindActionCreators } from 'redux';
import { CustomerList } from "./CustomerList";
import { CustomerDetail } from "./CustomerDetail";
import { CreateAccountForm } from "./CreateAccountForm";

// At runtime, Redux will merge together...
type CustomerProps =
    CustomerState.CustomerState        // ... state we've requested from the Redux store
    & typeof CustomerState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ customerId: string, pageIndex?: string}>; // ... plus incoming routing parameters

class Customer extends React.Component<CustomerProps, {}> {

    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.requestCustomers(); 

        let customerId = parseInt(this.props.match.params.customerId);
        let pageIndex = parseInt(this.props.match.params.pageIndex);

        if (!pageIndex) {
            pageIndex = 1; 
        }

        if (customerId) {
            this.handleCustomerId(customerId, pageIndex);
        }
    }

    componentWillReceiveProps(nextProps: CustomerProps) {
        // This method runs when incoming props (e.g., route params) change
        let customerId = parseInt(nextProps.match.params.customerId);

        if (customerId) {
            //only request customer if id has not be handled
            if (customerId != this.props.selectedCustomer && customerId != nextProps.selectedCustomer) {
                this.handleCustomerId(customerId);
            }
        } else  {
            this.props.clearCustomerDetails(); 
        }
    }


    ///Handles customerId changes to request a new customer 
    private handleCustomerId(customerId: number, pageIndex: number = 1) {
        if (!this.props.customerDetail || this.props.customerDetail.id != customerId) {
            this.props.requestCustomerDetails(customerId, pageIndex);
            this.props.requestAccountTypes();
            this.props.requestCurrencies();
        }
    }

    render() {
        return <div className="container">

            {this.props.isLoading ? this.renderIsLoading() : ""}

            <div className="col-md-3 col-lg-3">
                <CustomerList customers={this.props.customers} selectedId={this.props.selectedCustomer} />
            </div>
            <div className="col-md-9 col-lg-9">   
                {this.props.customerDetail ? this.renderCustomerDetails() : "Select a customer please."}  
            </div>
        </div>
    }

    renderCustomerDetails()
    {
        return <div>
            <div>
                <CustomerDetail customerDetail={this.props.customerDetail} onDelete={this.accountOnDeleteHandler} />
            </div>
            <div>
                <CreateAccountForm {...this.props.accountForm} {...this.formActions} />
            </div>
        </div>;
    }

    renderIsLoading() {
        return "Loading..."; 
    }

    accountOnDeleteHandler = (accountId: number) => {
        let customerId = parseInt(this.props.match.params.customerId);
        if (confirm(`Do you really want to delete customer's ${customerId} account: ${accountId}?`)) {
            this.props.deleteAccount(customerId, accountId);
        }
    }


    formActions =
    {
        AccountTypeSelected: (accountType: string) => {
            this.props.requestClassCodes(accountType);
        },

        AddAccount: (account: CustomerState.CreateCustomerAccount) => 
        {
            this.props.addAccount({ ...account, customerId: this.props.customerDetail.id });
        },
    }
   
}

const mapStateToProps = (state: ApplicationState): CustomerProps => {
    return {
        customers: state.customer.customers,
        customerDetail: state.customer.customerDetail,
        isLoading: state.customer.isLoading,
        accountForm: state.customer.accountForm,
        selectedCustomer: state.customer.selectedCustomer,
        isLoadingCustomerDetailc: state.customer.isLoadingCustomerDetail,

    } as any
};

const mapDispatchToProps = (dispatch: any): any => {
    return bindActionCreators({
        requestCustomers: CustomerState.actionCreators.requestCustomers,
        requestCustomerDetails: CustomerState.actionCreators.requestCustomerDetails,
        clearCustomerDetails: CustomerState.actionCreators.clearCustomerDetails,
        deleteAccount: CustomerState.actionCreators.deleteAccount,
        addAccount: CustomerState.actionCreators.addAccount,
        requestAccountTypes: CustomerState.actionCreators.requestAccountTypes,
        requestClassCodes: CustomerState.actionCreators.requestClassCodes,
        requestCurrencies: CustomerState.actionCreators.requestCurrencies,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Customer) as any;