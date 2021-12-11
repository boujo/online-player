import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from './pages/Main';
import Second from './pages/Second';

function Router(props) {
  return (
    <BrowserRouter>
      <Routes>
				<Route path='/' element={<Main />} exact />
				<Route path='/second' element={<Second />} exact />

				{/* <Route path="*" component={NoMatch} /> */}
			</Routes>
		</BrowserRouter>
  );
}

export default Router;
