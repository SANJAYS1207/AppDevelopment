import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import Home from "../home/Home";
import About from "../about/About";
import Pricing from "../pricing/Pricing";
import Blog from "../blog/Blog";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import AdminPage from "../../adminpage/AdminPage";
import SignInForm from "../signin/SignInForm";
import UserPage from "../../userpage/UserPage";
import PropertyForm from "../../userpage/properties/PropertyForm";
import Properties from "../../userpage/properties/Properties";
import ForSale from "../../userpage/properties/ForSale";
import ForRent from "../../userpage/properties/ForRent";
import ProtectedRoute from "./ProtectedRoute";

const Pages = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status on component mount
    setIsAdminLoggedIn(localStorage.getItem('isAdminLoggedIn') === 'true');
    setIsUserLoggedIn(localStorage.getItem('isUserLoggedIn') === 'true');
  }, []);

  const renderWithHeaderFooter = (Component) => (
    <>
      <Header />
      <Component />
      <Footer />
    </>
  );

  return (
    <Router>
      <Switch>
        <Route exact path='/' render={() => renderWithHeaderFooter(Home)} />
        <Route exact path='/about' render={() => renderWithHeaderFooter(About)} />
        <Route exact path='/services' render={() => renderWithHeaderFooter(Services)} />
        <Route exact path='/blog' render={() => renderWithHeaderFooter(Blog)} />
        <Route exact path='/pricing' render={() => renderWithHeaderFooter(Pricing)} />
        <Route exact path='/contact' render={() => renderWithHeaderFooter(Contact)} />
        <Route 
          exact 
          path='/login' 
          render={() => (
            <SignInForm 
              onAdminLogin={() => setIsAdminLoggedIn(true)} 
              onUserLogin={() => setIsUserLoggedIn(true)} 
            />
          )} 
        />
        <ProtectedRoute 
          exact 
          path='/admin' 
          component={AdminPage} 
          isLoggedIn={isAdminLoggedIn} 
        />
        <ProtectedRoute 
          exact 
          path='/property' 
          component={() => <UserPage><Properties /></UserPage>} 
          isLoggedIn={isUserLoggedIn}
        />
        <ProtectedRoute 
          exact 
          path='/forsale' 
          component={() => <UserPage><ForSale /></UserPage>} 
          isLoggedIn={isUserLoggedIn} 
        />
        <ProtectedRoute 
          exact 
          path='/forrent' 
          component={() => <UserPage><ForRent /></UserPage>} 
          isLoggedIn={isUserLoggedIn} 
        />
        <ProtectedRoute 
          exact 
          path='/sellyourown' 
          component={() => <UserPage><PropertyForm /></UserPage>} 
          isLoggedIn={isUserLoggedIn} 
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default Pages;
