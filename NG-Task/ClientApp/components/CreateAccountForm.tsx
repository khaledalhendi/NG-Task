﻿import * as React from 'react';
import * as CreateAccount from '../store/Customer'; 
import { ApplicationState } from "../store";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { CreateCustomerAccount } from "../store/Customer";

type CreateAccountProp =
    CreateAccount.AccountFormState         // ... state we've requested from the Redux store
    & {
        AccountTypeSelected: (string) => void,
        AddAccount: (CreateCustomerAccount) => void,
    };

interface CreateAccountFormState
{
    selectedAccountType?: string,
    selectedClassCode?: string,
    selectedCurrencyISO?: string,
    balanceInput?: string, 
}

export class CreateAccountForm extends React.Component<CreateAccountProp, CreateAccountFormState>{

    constructor(props: CreateAccountProp)
    {
        super(props); 

       
    }

    componentWillMount()
    {
        this.AppendState(
            {
                balanceInput: null,
                selectedAccountType: null,
                selectedClassCode: null,
                selectedCurrencyISO: null
            });
    }

    render() {
        return <form onSubmit={e => e.preventDefault()}>
            <div>
                Create Account
            </div>
            <label>
                AccountType
            </label>
            <select value={this.state.selectedAccountType != null ? this.state.selectedAccountType : ''} onChange={this.OnAccountTypeChangeHandler}>
                {this.state.selectedAccountType == null ? <option value=''></option> : '' }
                {this.renderOptions(this.props.accountTypes)}
            </select>
            <label>
                Class Code
            </label>
            <select value={this.state.selectedClassCode != null ? this.state.selectedClassCode : ""} onChange={this.OnClassCodeChangeHandler}>
                {this.state.selectedClassCode == null ? <option value=''></option> : ''}
                {this.renderOptions(this.props.classCodes)}
            </select>
            <label>
                Balance
            </label>
            <input type="text" onSubmit={e => { e.defaultPrevented; e.stopPropagation; }} placeholder="balance" pattern="\\d*\.\\d{0,3}" onInput={this.BalanceChangeHandler} />
            <label>
                Currency
            </label>
            <select value={this.state.selectedCurrencyISO ? this.state.selectedCurrencyISO : "Select"} onChange={this.OnCurrencyChangeHandler}>
                {this.state.selectedCurrencyISO == null ? <option value=''></option> : ''}
                {this.renderOptions(this.props.currencies)}
            </select>
            <div>
                <input type="submit" value="Create" onClick={this.CreateClickHandler} />
            </div>
        </form>;
    };

    renderOptions(options: string[])
    {
        return (options.map(o =>
            <option key={o} value={o}>{o}</option>
        ));
    }

    //helper function
    private AppendState(newState: CreateAccountFormState)
    {
        this.setState({ ...this.state, ...newState });
    }

    OnAccountTypeChangeHandler = (event: React.FormEvent<HTMLSelectElement>) => {

        let accountType = event.currentTarget.value; 

        //populars classCodes
        this.props.AccountTypeSelected(accountType); 

        this.AppendState({ selectedAccountType: accountType, selectedClassCode: null });
    }

    OnClassCodeChangeHandler = (event: React.FormEvent<HTMLSelectElement>) => {

        let classCode = event.currentTarget.value;
        this.AppendState({ selectedClassCode: classCode });

        //this.props.ClassCodeSelected(classCode); 
    }

    OnCurrencyChangeHandler = (event: React.FormEvent<HTMLSelectElement>) => {

        let currencyISO = event.currentTarget.value;
        this.AppendState({ selectedCurrencyISO: currencyISO });

        //this.props.CurrencySelected(currencyISO); 
    }

    BalanceChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        const balanceInput = (event.currentTarget.validity.valid) ? event.currentTarget.value : (this.state.balanceInput + "");

        //this.props.BalanceUpdated(+balanceInput); 
        this.AppendState({ balanceInput });

        return false; 
    }

    CreateClickHandler = (event: React.FormEvent<HTMLButtonElement>) => {

        //validate input here bro 

        let account: CreateCustomerAccount = 
            {
                accountType: this.state.selectedAccountType, 
                classCode: this.state.selectedClassCode, 
                currencyISO: this.state.selectedCurrencyISO, 
                balance: +this.state.balanceInput,
                customerId: null
        }; 

       
        this.props.AddAccount(account);

    }


}

//const mapStateToProps = (state: ApplicationState): CreateAccountProp => {
//    return {
//        accountTypes: state.accountForm.accountTypes,
//        classCodes:  state.accountForm.classCodes,
//        currencies:  state.accountForm.currencies,

//        selectedAccountType: state.accountForm.selectedAccountType,
//        selectedclassCode:  state.accountForm.selectedclassCode,
//        selectedcurrency: state.accountForm.selectedcurrency,
//    } as any
//};

//const mapDispatchToProps = (dispatch: any): any => {
//    return bindActionCreators({
//        requestAccountTypes: CreateAccount.actionCreators.requestAccountTypes,
//        requestClassCodes: CreateAccount.actionCreators.requestClassCodes,
//        requestCurrencies: CreateAccount.actionCreators.requestCurrencies,
//        selectAccountTyoe: CreateAccount.actionCreators.selectAccountTyoe
//    }, dispatch);
//};

//export default connect(
//    mapStateToProps,
//    mapDispatchToProps
//)(CreateAccountForm) as any;