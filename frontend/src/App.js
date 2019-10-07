import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter} from 'react-router-dom';
import {Route,Switch} from 'react-router-dom';
import BuyerSignInPage from '../src/Containers/BuyerSignInPage/BuyerSignInPage';
import OwnerSignInPage from '../src/Containers/OwnersSignInPage/OwnersSignInPage';
import BuyerForm from '../src/Containers/BuyerForm/BuyerForm';
import OwnerForm from '../src/Containers/OwnerForm/OwnerForm';
import Layout from '../src/Components/Layout/Layout';
import IndexPage from '../src/Components/IndexPage/IndexPage';
import BuyerLayout from '../src/Components/BuyerLayout/BuyerLayout';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
        <Route path="/buyer/SignIn" exact component={BuyerSignInPage}></Route>
        <Route path="/owner/SignIn" exact component={OwnerSignInPage}></Route>
        <Route path="/buyer/SignUp" exact component={BuyerForm}></Route>
        <Route path="/owner/SignUp" exact component={OwnerForm}></Route>
        <Route path="/" exact component={IndexPage}></Route>
        <Route path="/owner" component={Layout}></Route>
        <Route path="/buyer" component={BuyerLayout}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
