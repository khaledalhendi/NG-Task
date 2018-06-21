import * as React from 'react';
import * as CreateAccount from '../store/Customer'; 
import { ApplicationState } from "../store";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { CreateCustomerAccount } from "../store/Customer";
import { findDOMNode } from 'react-dom';
import { Form, FormGroup, ControlLabel, InputGroup, FormControl, Col, DropdownButton, MenuItem, PageHeader, Alert } from 'react-bootstrap';
import configureStore from '../configureStore';

type CreateAccountProp =
    CreateAccount.AccountFormState         // ... state we've requested from the Redux store
    & {
        AccountTypeSelected: (string) => void,
        AddAccount: (CreateCustomerAccount) => void,
        ShouldReset: boolean,
    };

interface CreateAccountFormState
{
    selectedAccountType?: string,
    selectedClassCode?: string,
    selectedCurrencyISO?: string,
    balanceInput?: string, 

    formMessage?: string, 
    formMessageStyle?: string, 

    isAccountTypeInvalid?: boolean, 
    isClassCodeInvalid?: boolean, 
    isBalanceInvalid?: boolean, 
}

export class CreateAccountForm extends React.Component<CreateAccountProp, CreateAccountFormState>{

    constructor(props: CreateAccountProp) {
        super(props);

    }

    componentWillMount() {
        this.AppendState(
            {
                balanceInput: null,
                selectedAccountType: null,
                selectedClassCode: null,
                selectedCurrencyISO: null
            });
    }

    componentWillReceiveProps(nextProps: CreateAccountProp) {
        if (nextProps.ShouldReset && nextProps.ShouldReset != this.props.ShouldReset) {
            this.resetForm();
        }
    }

    render() {
        return <div>
            <PageHeader>
                <small>Create Account</small>
            </PageHeader>
            {this.state.formMessage ? this.showFormAlert(this.state.formMessageStyle, this.state.formMessage) : null}

            <Form className="panel" onSubmit={e => e.preventDefault()}>
                <FormGroup className="panel" validationState={this.state.isAccountTypeInvalid ? "error" : null}>
                    <ControlLabel>AccountType</ControlLabel>
                    <select className="form-control" value={this.state.selectedAccountType != null ? this.state.selectedAccountType : ''}
                        onChange={this.OnAccountTypeChangeHandler}>
                        {this.state.selectedAccountType == null ? <option value=''></option> : ''}
                        {this.renderOptions(this.props.accountTypes)}
                    </select>
                </FormGroup>
                <FormGroup validationState={this.state.isClassCodeInvalid ? "error" : null}>
                    <ControlLabel>Class Code</ControlLabel>
                    <select className="form-control" value={this.state.selectedClassCode != null ? this.state.selectedClassCode : ""}
                        onChange={this.OnClassCodeChangeHandler}>
                        {this.state.selectedClassCode == null ? <option value=''></option> : ''}
                        {this.renderOptions(this.props.classCodes)}
                    </select>
                </FormGroup>
                <FormGroup validationState={this.state.isBalanceInvalid ? "error" : null}>
                    <ControlLabel>Balance</ControlLabel>
                    <InputGroup>
                        <InputGroup.Addon>$</InputGroup.Addon>
                        <input className="form-control" type="text" value={this.state.balanceInput ? this.state.balanceInput : ""}
                            placeholder="balance" pattern="[1-9]\\d*(\\\.\\d{0,3})?"
                            onInput={this.BalanceChangeHandler}
                            onKeyPress={this.OnBalanceSubmitHandler}
                        />
                        <InputGroup.Addon>
                            <select className=""
                                value={this.state.selectedCurrencyISO ? this.state.selectedCurrencyISO : "Select"}
                                onChange={this.OnCurrencyChangeHandler}>
                                {this.state.selectedCurrencyISO == null ? <option value=''></option> : ''}
                                {this.renderOptions(this.props.currencies)}
                            </select>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <div>
                    <button className="btn btn-success center-block" onClick={this.CreateClickHandler}>Create</button>
                </div>
            </Form>
        </div>;
    };

    renderOptions(options: string[]) {
        return (options.map(o =>
            <option key={o} value={o}>{o}</option>
        ));
    }

    showFormAlert(style: string, message: string) {
        return <Alert bsStyle={style} onDismiss={this.handleDismissMessage}>
            <p>
                {message}
            </p>
        </Alert>;
    }

    private resetForm() {
        this.setState({
            selectedAccountType: null,
            selectedClassCode: null,
            selectedCurrencyISO: null,
            balanceInput: null,
            formMessage: null,
            isAccountTypeValid: null,
            isbalanceValid: null,
            isClassCodeValid: null,
            isCurrencyISOValid: null,
        } as CreateAccountFormState);
    }

    //helper function
    private AppendState(newState: CreateAccountFormState) {
        this.setState((p) =>  { return { ...p, ...newState }});
    }

    handleDismissMessage = () => 
    {
        this.AppendState({formMessage:null});
    }

    OnBalanceSubmitHandler = (target) => {
        let enterKeyCode = 13; //magic 
        if (target.charCode == enterKeyCode) {
            target.preventDefault();
        }
    }

    OnAccountTypeChangeHandler = (event: React.FormEvent<HTMLSelectElement>) => {
        let accountType: string = "" + event.currentTarget.value;

        //populate classCodes
        this.props.AccountTypeSelected(accountType); 

        this.AppendState({
            selectedAccountType: accountType, isAccountTypeInvalid: null, 
            selectedClassCode: null, isClassCodeInvalid: null
        });
    }

    OnClassCodeChangeHandler = (event: React.FormEvent<HTMLSelectElement>) => {

        let classCode = event.currentTarget.value;
        this.AppendState({ selectedClassCode: classCode, isClassCodeInvalid: null });
    }

    OnCurrencyChangeHandler = (event: React.FormEvent<HTMLSelectElement>) => {

        let currencyISO = event.currentTarget.value;

        this.AppendState({ selectedCurrencyISO: currencyISO, isBalanceInvalid: null });
    }

    BalanceChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault(); 
        let input: HTMLInputElement = event.currentTarget;

        const balanceInput = (input.validity.valid) ? input.value : (this.state.balanceInput);

        this.AppendState({ balanceInput, isBalanceInvalid: null  });

        return false; 
    }

    CreateClickHandler = (event: React.FormEvent<HTMLButtonElement>) => {
        let anyError = false; 

        if (!this.state.selectedAccountType) {
            this.AppendState({ isAccountTypeInvalid: true }); 
            anyError = true;  
        }

        if (!this.state.selectedClassCode) {
            this.AppendState({ isClassCodeInvalid: true });
            anyError = true;
        }

        if (!this.state.selectedCurrencyISO || !(this.state.balanceInput)) {
            this.AppendState({ isBalanceInvalid: true});
            anyError = true;
        }

        if (anyError === true) {
            this.AppendState({
                formMessage: "Please be sure to set enter all required form data.", 
                formMessageStyle: "danger"
            });
            return; 
        }
        
        let account: CreateCustomerAccount =
            {
                accountType: this.state.selectedAccountType,
                classCode: this.state.selectedClassCode,
                currencyISO: this.state.selectedCurrencyISO,
                balance: +this.state.balanceInput,
                customerId: null //form doesn't know customer id. 
            };

        this.props.AddAccount(account);
        this.resetForm();

        this.AppendState({
            formMessage: "Account was created!",
            formMessageStyle: "success"
        });
        
    }
}