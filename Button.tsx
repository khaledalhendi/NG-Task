import * as React from 'react';
class Button extends React.Component {
    public state = {
     index: 0
     };
     public render() {
      return <button > {this.state.index}</button>;
    }
   }
 export default Button;