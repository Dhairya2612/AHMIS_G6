import { BrowserRouter, Switch, Route } from "react-router-dom";
import HospitalWebsite from "./Component/homepagewithlogin/HospitalWebsite";
import Registeruser from "./Component/Registerpage/registeruser";
import FooterLv from "./Component/Footer/FooterLv";
import ForgotPass from "./Component/ForgotPassword/ForgotPass";
import Comheader from "./Component/CommonHeader/Comheader";
import Dashboard from "./Component/Dashboard/Dashboard";
import CreateUser from "./Component/Createusr";
import Home from "./Component/homepagewithlogin/Home";
import OTPComponent from "./Component/OTPComponent";
import DashboardHeader from "./Component/Dashboard/DashboardHeader";
import UsernameCheck from "./Component/Registerpage/UsernameCheck";
import EmailVerification from "./Component/homepagewithlogin/EmailDemo/EmailVerification";
import EmailRegistration from "./Component/Registerpage/EmailRegistration";
import UserRejectForm from "./Component/Dashboard/UserRejectForm";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HospitalWebsite} />
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
          <Route exact path="/registeruserbyEm">
            <Comheader />
            <EmailRegistration/>
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
            <Home />
          </Route>
        </Switch>

        <Route exact path="/usernamecheck" component={UsernameCheck} />
        <Route exact path="/Emailcheck" component={EmailVerification} />
        {/* <Route exact path="/rejectuser" component={UserRejectForm} /> */}
        <FooterLv />
      </BrowserRouter>
    </div>
  );
}

export default App;
