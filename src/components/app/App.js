import { lazy, Suspense } from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";

const MainPage = lazy(() => import('../pages/MainPage'));
const Page404 = lazy(() => import('../pages/404'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SinglePage = lazy(() => import('../pages/SinglePage'));
const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={'Loagind...'}>
                    <Routes>
                        <Route  path='/' element={<MainPage></MainPage>}/>              
                        <Route  path='/comics' element={<ComicsPage></ComicsPage>}/>
                        <Route  path='/comics/:id' element={<SinglePage Component={SingleComicLayout} dataType='comic'></SinglePage>}/>
                        <Route  path='/characters/:id' element={<SinglePage Component={SingleCharacterLayout} dataType='character'></SinglePage>}/>
                        <Route  path='*' element={<Page404></Page404>}/>     
                    </Routes>
                    </Suspense>
                </main>
        </div>
        </Router>
    )
}

console.log(true + false)


export default App;