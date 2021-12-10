import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from './pages/Main';

function Router(props) {
  return (
    <BrowserRouter>
      <Routes>
				<Route path='/' element={<Main />} exact />

				{/* <Route path="*" component={NoMatch} /> */}
			</Routes>
		</BrowserRouter>
  );
}

export default Router;
