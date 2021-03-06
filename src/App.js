import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// layouts ๐จ
import DefaultLayout from "./layouts/DefaultLayout";
import ErrorLayout from "./layouts/ErrorLayout";
import SignLayout from "./layouts/SignLayout";

// pages โจ
import DashboardPage from "./pages/DashboardPage";
import SigninPage from "./pages/SigninPage";
import PlaceListPage from "./pages/PlaceListPage";
import UserListPage from "./pages/UserListPage";
import ManagerListPage from "./pages/ManagerListPage";

// assets ๐
import Image404 from "./assets/404.svg";
import SignupPage from "./pages/SignupPage";

//utils 
import { tokenValidation } from "./utils/jwt";

// redux lib ๐
import { useSelector, useDispatch } from "react-redux";
import ManagerDetailModal from "./containers/ManagerDetailModal";
import UserDetailModal from "./containers/UserDetailModal";

function App( ) {
	const despatch = useDispatch();
    // ๋ก๊ทธ์ธ ์ํ ๊ฐ์ ธ์ค๊ธฐ
    const isLoggedIn = useSelector( state => state.isLoggedInReducer );
	// ๋งค๋์  ๋ชจ๋ฌ ์ํ ๊ฐ์ ธ์ค๊ธฐ
    const modalState = useSelector( state => state.modalReducer );

	// ํ ํฐ์ ์ํ๊ฐ ๋ณ๊ฒฝ๋  ๋ ๋ง๋ค ์คํ
	useEffect(()=> {
		tokenValidation() ? 
		despatch({type:"IS_LOGGED_IN", payload: true}) :
		despatch({type:"IS_LOGGED_IN", payload: false});
	}, [despatch, isLoggedIn]);
	
	return (
	<div className="App">
		{
			// ๋งค๋์  ๋ชจ๋ฌ ์ฐฝ ์ํ์ ๋ฐ๋ผ ๋ณด์ด๊ธฐ
			( modalState.open && modalState.target === "MANAGER" ) 
			&& <ManagerDetailModal />
		}
		{
			// ์ ์  ๋ชจ๋ฌ ์ฐฝ ์ํ์ ๋ฐ๋ผ ๋ณด์ด๊ธฐ
			( modalState.open && modalState.target === "USER" ) 
			&& <UserDetailModal />
		}
		<Switch>
			<Route exact path="/signin">
				{
					!isLoggedIn ? 
					<SignLayout
						title="์ฐ์ํ๊ฒ CMS"
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
						title="๋งค๋์  ๋ฑ๋ก"
					>
						<SignupPage />
					</SignLayout> : 
					<Redirect to="/"/>
				}
			</Route>
			<Route exact path="/">
				{
					isLoggedIn ? 
					<DefaultLayout title="๋์ฌ๋ณด๋">
						<DashboardPage />
					</DefaultLayout> : 
					<Redirect to="/signin"/>
				}
			</Route>
			<Route path="/users">
				{
					isLoggedIn ? 
					<DefaultLayout title="ํ์ ๊ด๋ฆฌ">
						<UserListPage />
					</DefaultLayout>: 
					<Redirect to="/signin" />
				}
			</Route>
			<Route path="/places">
				{
					isLoggedIn ? 
					<DefaultLayout title="์ฅ์ ๊ด๋ฆฌ">
						<PlaceListPage />
					</DefaultLayout>: 
					<Redirect to="/signin" />
				}
			</Route>
			<Route path="/managers">
				{
					isLoggedIn ? 
					<DefaultLayout title="๋งค๋์  ๊ด๋ฆฌ">
						<ManagerListPage />
					</DefaultLayout>: 
					<Redirect to="/signin" />
				}
			</Route>
			<Route path="/feedbacks">
				{
					isLoggedIn ? 
					<DefaultLayout title="ํผ๋๋ฐฑ">
						ํผ๋๋ฐฑ
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
