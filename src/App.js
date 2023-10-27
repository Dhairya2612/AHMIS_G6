import { BrowserRouter, Switch, Route } from "react-router-dom";
import HospitalWebsite from "./Component/homepagewithlogin/HospitalWebsite";
import Registeruser from "./Component/Registerpage/registeruser";
import FooterLv from "./Component/Footer/FooterLv";
import ForgotPass from "./Component/ForgotPassword/ForgotPass";
import Comheader from "./Component/CommonHeader/Comheader";
import Dashboard from "./Component/Dashboard/Dashboard";
import CreateUser from "./Component/Createusr";
import Home from "./Component/homepagewithlogin/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HospitalWebsite} />
          <Route exact path="/dashboard">
            <Dashboard/>
            
          </Route>
        </Switch>

<Switch>
<Route exact path="/addinguser" component={CreateUser} />     

</Switch>

        <Switch>
          <Route exact path="/registeruser">
            <Comheader />
            <Registeruser />
          </Route>
        </Switch>

        <Switch>

          <Route exact path="/resetpassword">
          <Comheader />
          <ForgotPass />
        </Route>
        </Switch>
        <Switch>
          
          <Route exact path="/home">
            <Home/>
          
          </Route>
        </Switch>
        

        <FooterLv />
      </BrowserRouter>
    </div>
  );
}

export default App;
