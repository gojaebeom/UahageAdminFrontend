import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// layouts 🎨
import DefaultLayout from "./layouts/DefaultLayout";
import ErrorLayout from "./layouts/ErrorLayout";
import SignLayout from "./layouts/SignLayout";

// pages ✨
import DashboardPage from "./pages/DashboardPage";
import SigninPage from "./pages/SigninPage";
import PlacePage from "./pages/PlacePage";
import UserPage from "./pages/UserPage";

// assets 🎁
import Image404 from "./assets/404.svg";
import SignupPage from "./pages/SignupPage";

//utils 
import { getTokensPayload } from "./utils/jwt";

function App( ) {
	
	const [ isLoggedin, setIsLoggedin ] = useState( false );
	useEffect(()=> {
		const result = getTokensPayload();
		if (!result) return setIsLoggedin(false);
		const { roles } = result;
		console.log(roles);
		if( roles === "SUPER" || roles === "MANAGER" || roles === "GENERAL"){
			setIsLoggedin(true);
		}
	}, [isLoggedin]);

	return (
	<div className="App">
		<Switch>
			<Route exact path="/signin">
				{
					!isLoggedin ? 
					<SignLayout
						title="로그인"
					>	
					<SigninPage 
						isLoggedin={isLoggedin}
						setIsLoggedin={ ( result ) => setIsLoggedin(result) }
					/>
					</SignLayout> : 
					<Redirect to="/"/>
				}
			</Route>
			<Route exact path="/signup">
				{
					!isLoggedin ? 
					<SignLayout
						title="회원가입"
					>
						<SignupPage />
					</SignLayout> : 
					<Redirect to="/"/>
				}
			</Route>
			<Route exact path="/">
				{
					isLoggedin ? 
					<DefaultLayout>
						<DashboardPage />
					</DefaultLayout> : 
					<Redirect to="/signin"/>
				}
			</Route>
			<Route path="/users">
				{
					isLoggedin ? 
					<DefaultLayout>
						<UserPage />
					</DefaultLayout>: 
					<Redirect to="/signin" />
				}
			</Route>
			<Route path="/places">
				{
					isLoggedin ? 
					<DefaultLayout>
						<PlacePage />
					</DefaultLayout>: 
					<Redirect to="/signin" />
				}
			</Route>
			<Route path="/managers">
				{
					isLoggedin ? 
					<DefaultLayout>
						매니저 관리
					</DefaultLayout>: 
					<Redirect to="/signin" />
				}
			</Route>
			<Route path="/feedbacks">
				{
					isLoggedin ? 
					<DefaultLayout>
						피드백
					</DefaultLayout>: 
					<Redirect to="/signin" />
				}
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
