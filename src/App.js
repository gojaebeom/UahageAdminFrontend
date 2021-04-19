import React from "react";
import { Switch, Route } from "react-router-dom";



// layouts 🎨
import DefaultLayout from "./layouts/DefaultLayout";
import ErrorLayout from "./layouts/ErrorLayout";
import SignLayout from "./layouts/SignLayout";

// pages ✨
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import PlacePage from "./pages/PlacePage";
import UserPage from "./pages/UserPage";

// assets 🎁
import Image404 from "./assets/404.svg";

function App( ) {
  return (
  <div className="App">
    <Switch>
      <Route exact path="/login">
        <SignLayout>
          <LoginPage />
        </SignLayout>
      </Route>
      <Route exact path="/">
        <DefaultLayout>
          <DashboardPage />
        </DefaultLayout>
      </Route>
      <Route path="/users">
        <DefaultLayout>
          <UserPage />
        </DefaultLayout>
      </Route>
      <Route path="/places">
        <DefaultLayout>
          <PlacePage />
        </DefaultLayout>
      </Route>
      <Route path="/messages">
        <DefaultLayout>
          
        </DefaultLayout>
      </Route>
      <Route path="/403">
        <ErrorLayout 
          imagePath={Image404} 
          errorMessage="You don't have permission"
          errorType="403"
        />
      </Route>
      <Route path="/*">
        <ErrorLayout 
          imagePath={Image404} 
          errorMessage="Not Found"
          errorType="404"
        />
      </Route>
    </Switch>
  </div>
  );
}

export default App;
