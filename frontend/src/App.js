import { Aside } from "./containers/aside/aside";
import { Content } from "./containers/content/content";
import { Nav } from "./containers/nav/nav";
import { Switch, Route } from "react-router-dom";

function App( ) {
  return (
  <div className="App">
    <main className="bg-gray-100 dark:bg-gray-800 rounded-2xl relative h-screen overflow-hidden relative">
        <div className="flex items-start justify-between">
          <Aside />
          <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
            <Nav />
            <div className="overflow-auto h-screen pb-24 pt-2 pr-2 pl-2 md:pt-0 md:pr-0 md:pl-0">
              <Switch>
                <Route exact path="/">
                  <Content />
                </Route>
                <Route path="/users">
                  유저 관리
                </Route>
                <Route path="/spaces">
                  유아 관련 장소 관리
                </Route>
                <Route path="/banners">
                  배너 관리
                </Route>
              </Switch>
            </div>
            
          </div>
        </div>
    </main>
  </div>
  );
}

export default App;
