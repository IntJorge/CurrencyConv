import React from 'react';
import {
    Page,
    Navbar,
    NavLeft,
    NavTitle,
    NavRight,
    Link,
    Toolbar,
    Block,
    BlockTitle,
    ListItem,
    Row,
    Col,
    Button,
    Input,
    List,
    ListInput,
    Icon,
    BlockHeader,
} from 'framework7-react';

import ApiHelper from '../../utils/api';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sourceVal: 1,
      destVal: 1,
      fromCurr: 'USD',
      toCurr: 'USD',
    }
  }

  onInputChanged = (event) => {
    // console.log("EVENT", event.target.name, event.target.value);
    this.setState({ [event.target.name]: event.target.value }, () => {
      ApiHelper.convertCurrencies({ value: this.state.sourceVal, fromCurr: this.state.fromCurr, toCurr: this.state.toCurr, onSuccess: this.onConversionSuccess });
    });
    
    
    
  }

  onConversionSuccess = (response) => {
    if (!response) return;

    this.setState({
      destVal: response
    });
  }

  // componentDidMount() {
  //   ApiHelper.convertCurrencies({ value: 1, fromCurr: 'USD', toCurr: 'EUR', onSuccess: this.onConversionSuccess });
  // }

  render() {
    return (
      <Page>
        <Navbar>
          <NavTitle>Currency Converter</NavTitle>
          <NavRight>
            <Link iconIos="f7:menu" iconMd="material:menu" panelOpen="right"></Link>
          </NavRight>
        </Navbar>
        <Block strong>
          <p>Select currencies and enter value</p>
        </Block>
        <BlockHeader>Source Currency</BlockHeader>
        <Block inner>
          <Input
            onChange={this.onInputChanged}
            name="sourceVal"
            label="Value"
            type="number"
            placeholder="Enter value"
            value={this.state.sourceVal}
          >
          </Input>
          <Input
            onChange={this.onInputChanged}
            name="fromCurr"
            label="Gender"
            type="select"
            defaultValue="USD"
            value={this.state.fromCurr}
            placeholder="Please choose..."
          >
            {/* <Icon icon="demo-list-icon" slot="media"/> */}
            <option value="USD">(USD) United States Dollar</option>
            {/* <option value="EUR">(EUR) Euro</option> */}
          </Input>
        </Block>
        
        <BlockHeader>Destination Currency</BlockHeader>
        <Block>
          <Input
            onChange={this.onInputChanged}
            name="destVal"
            label="Value"
            type="number"
            placeholder="Enter value"
            value={this.state.destVal}
          >
          </Input>
          <Input
            onChange={this.onInputChanged}
            name="toCurr"
            label="Gender"
            type="select"
            defaultValue="USD"
            value={this.state.toCurr}
            placeholder="Please choose..."
          >
            {/* <Icon icon="demo-list-icon" slot="media"/> */}
            <option value="USD">(USD) United States Dollar</option>
            <option value="EUR">(EUR) Euro</option>
            <option value="AED">(AED) UAE Dirham</option>
            <option value="PHP">(PHP) Philippine Peso</option>
          </Input>
        </Block>
      </Page>
    );
  }
}

export default HomePage;
