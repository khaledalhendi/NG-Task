import * as React from 'react';


interface CreateAccountState
{
    value?: any;  
}

export class CreateAccountForm extends React.Component<{}, CreateAccountState>{

    componentWillMount()
    {
        this.setState({ value: "Hello" }); 
    }

    handleChange(selected :any)
    {
        this.setState({ value: selected }); 
    }

    render() {
        return <form>
            <div>
                Create Account
            </div>
            <label>
                AccountType
            </label>
            <select value={this.state.value ? this.state.value : "None" } onChange={this.handleChange}>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option value="coconut">Coconut</option>
                <option value="mango">Mango</option>
            </select>
            <label>
                Class Code
            </label>
            <select value={this.state.value ? this.state.value : "None"} onChange={this.handleChange}>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option value="coconut">Coconut</option>
                <option value="mango">Mango</option>
            </select>
            <label>
                Balance
            </label>
            <input type="text" value="Submit" />
            <label>
                Currency
            </label>
            <select value={this.state.value ? this.state.value : "None"} onChange={this.handleChange}>
                <option value="grapefruit">Grapefruit</option>
                <option value="lime">Lime</option>
                <option value="coconut">Coconut</option>
                <option value="mango">Mango</option>
            </select>
            <div> 
                <input type="submit" value="Submit" />
            </div>
        </form>;
    };
}