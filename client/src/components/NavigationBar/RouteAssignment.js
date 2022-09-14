import { PageLayout } from "../pages/PageLayout";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import {Header} from "./components/NavigationBar/NavBar"
import Newreturn from "../pages/returns/new"
import K12 from "../pages/returns/k12";
import Search from "../pages/returns/search"
import NoTag from "../pages/returns/notag"

import OpAssignment from "../pages/warehouse/opassignment.jsx"
import Etched from "../pages/warehouse/etched"
import AssetLabel from "../pages/assets/assetLabel"
import Assetlocation from "../pages/assets/assetlocation"
import SearchAssetLoc from "../pages/assets/searchAssetLoc.jsx"
import MiscAssign from "../pages/warehouse/miscAssignment"
import ASAPOutbound from "../pages/asap/asapoutboundlabel"
import ConsumePeriph from "../pages/warehouse/consumePeripherals"
import Hello  from "../pages/Hello"
import TestPage from "../pages/testPage"
function AppRouter() {
return (
    <Router>
        {/* <Header /> */}
        <Routes>
            <Route exact path='/' element={<PageLayout />}/>
            <Route exact path='/components/pages/testPage' element={<TestPage />}/>
            <Route path='/components/pages/Hello' element={<Hello />}/>
        {/* Assets */}
            <Route path='/components/pages/assets/assetLabel' element={<AssetLabel />}/>
            <Route path='/components/pages/assets/assetlocation' element={<Assetlocation />}/>
            <Route path='/components/pages/assets/searchAssetLoc' element={<SearchAssetLoc />}/>
        {/* Returns */}
            <Route path='/components/pages/returns/new' element={<Newreturn />}/>
            <Route path='/components/pages/returns/notag' element={<NoTag />}/>
            <Route path='/components/pages/returns/k12' element={<K12 />}/>
            <Route path='/components/pages/returns/search' element={<Search />}/>
        {/* Warehouse */}
            <Route path='/components/pages/warehouse/opassignment' element={<OpAssignment />}/>
            <Route path='/components/pages/warehouse/etched' element={<Etched />}/>
            <Route path='/components/pages/warehouse/miscAssignment' element={<MiscAssign />}/>
            <Route path='/components/pages/asap/asapoutboundlabel' element={<ASAPOutbound />}/>
            <Route path='/components/pages/warehouse/consumePeripherals' element={<ConsumePeriph />}/>
        </Routes>
    </Router>   
    )
}

export default AppRouter