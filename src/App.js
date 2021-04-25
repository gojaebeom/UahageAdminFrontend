import React, { useEffect } from "react";
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
import ManagerListPage from "./pages/ManagerListPage";

// assets 🎁
import Image404 from "./assets/404.svg";
import SignupPage from "./pages/SignupPage";

//utils 
import { getTokensPayload } from "./utils/jwt";

// redux lib 🎈
import { useSelector, useDispatch } from "react-redux";
import AlertBox from "./components/AlertBox";

function App( ) {
    // 로그인 상태 가져오기
    const isLoggedIn = useSelector( state => state.isLoggedInReducer );

    const despatch = useDispatch();
	useEffect(()=> {
		const result = getTokensPayload();
		if (!result) return despatch({type:"IS_LOGGED_IN", payload:false});
		const { roles } = result;
		if( roles === "SUPER" || roles === "MANAGER" || roles === "GENERAL"){
			despatch({type:"IS_LOGGED_IN", payload:true});
		}
	}, [despatch, isLoggedIn]);

	return (
	<div className="App">
        <AlertBox />

		<Switch>
			<Route exact path="/signin">
				{
					!isLoggedIn ? 
					<SignLayout
					title="우아하게 CMS"
					>	
					<SigninPage />
					</SignLayout> : 
					<Redirect to="/"/>
				}
			</Route>
			<Route exact path="/signup">
				{
					!isLoggedIn ? 
					<SignLayout
						title="매니저 등록"
					>
						<SignupPage />
					</SignLayout> : 
					<Redirect to="/"/>
				}
			</Route>
			<Route exact path="/">
				{
					isLoggedIn ? 
					<DefaultLayout title="대쉬보드">
						<DashboardPage />
					</DefaultLayout> : 
					<Redirect to="/signin"/>
				}
			</Route>
			<Route path="/users">
				{
					isLoggedIn ? 
					<DefaultLayout title="회원 관리">
						<UserPage />
					</DefaultLayout>: 
					<Redirect to="/signin" />
				}
			</Route>
			<Route path="/places">
				{
					isLoggedIn ? 
					<DefaultLayout title="장소 관리">
						<PlacePage />
					</DefaultLayout>: 
					<Redirect to="/signin" />
				}
			</Route>
			<Route path="/managers">
				{
					isLoggedIn ? 
					<DefaultLayout title="매니저 관리">
						<ManagerListPage />
					</DefaultLayout>: 
					<Redirect to="/signin" />
				}
			</Route>
			<Route path="/feedbacks">
				{
					isLoggedIn ? 
					<DefaultLayout title="피드백">
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
