import React from "react";
import { Switch, Route } from "react-router-dom";
import DefaultLayout from "./layouts/default";
import ErrorLayout from "./layouts/error";
import DashboardPage from "./pages/dashboard";
import LoginPage from "./pages/login";
import Image404 from "./assets/404.svg";
import SignLayout from "./layouts/sign";
import CrawlingPage from "./pages/crawling";

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
          유저관리
        </DefaultLayout>
      </Route>
      <Route path="/spaces">
        <DefaultLayout>
          장소 관리
        </DefaultLayout>
      </Route>
      <Route path="/banners">
        <DefaultLayout>
          <CrawlingPage />
        </DefaultLayout>
      </Route>
      <Route path="/*">
        <ErrorLayout 
          imagePath={Image404} 
          errorType="404"
        />
      </Route>
    </Switch>
  </div>
  );
}

export default App;
