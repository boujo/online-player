import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './pages/Main';
import Tracks from './pages/Tracks';
import Albums from './pages/Albums';
import Album from './pages/Album';
import Artists from './pages/Artists';

function Router(props) {
  return (
    <BrowserRouter>
      <Routes>
				<Route path='/' element={<Main />} exact />
				<Route path='/tracks' element={<Tracks />} exact />
				<Route path='/albums' element={<Albums />} exact />
				<Route path='/albums/:key/:name' element={<Album />} exact />
				<Route path='/artists' element={<Artists />} exact />

				{/* <Route path="*" component={NoMatch} /> */}
			</Routes>
		</BrowserRouter>
  );
}

export default Router;
