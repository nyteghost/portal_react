import { PageLayout } from "./components/pages/PageLayout";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/new.css";
import {Header} from "./components/NavigationBar/NavBar"
import Newreturn from "./components/pages/returns/new"
import K12 from "./components/pages/returns/k12";
import Search from "./components/pages/returns/search"
import NoTag from "./components/pages/returns/notag"

import OpAssignment from "./components/pages/warehouse/opassignment"
import Etched from "./components/pages/warehouse/etched"
import AssetLabel from "./components/pages/warehouse/assetLabel"
import Assetlocation from "./components/pages/warehouse/assetlocation"
import SearchAssetLoc from "./components/pages/warehouse/searchAssetLoc.jsx"
import MiscAssign from "./components/pages/warehouse/miscAssignment"
import ASAPOutbound from "./components/pages/warehouse/asapoutboundlabel"
import ConsumePeriph from "./components/pages/warehouse/consumePeripherals"
import Hello  from "./components/pages/Hello"

function AppRouter() {
return (
    <Router>
        <Header />
        <Routes>
            <Route exact path='/' element={<PageLayout />}/>
            <Route path='/components/pages/Hello' element={<Hello />}/>

        {/* Returns */}
            <Route path='/components/pages/returns/new' element={<Newreturn />}/>
            <Route path='/components/pages/returns/notag' element={<NoTag />}/>
            <Route path='/components/pages/returns/k12' element={<K12 />}/>
            <Route path='/components/pages/returns/search' element={<Search />}/>
        {/* Warehouse */}
            <Route path='/components/pages/warehouse/opassignment' element={<OpAssignment />}/>
            <Route path='/components/pages/warehouse/etched' element={<Etched />}/>
            <Route path='/components/pages/warehouse/assetLabel' element={<AssetLabel />}/>
            <Route path='/components/pages/warehouse/assetlocation' element={<Assetlocation />}/>
            <Route path='/components/pages/warehouse/searchAssetLoc' element={<SearchAssetLoc />}/>
            <Route path='/components/pages/warehouse/miscAssignment' element={<MiscAssign />}/>
            <Route path='/components/pages/warehouse/asapoutboundlabel' element={<ASAPOutbound />}/>
            <Route path='/components/pages/warehouse/consumePeripherals' element={<ConsumePeriph />}/>
        </Routes>
    </Router>   
    )
}

export default AppRouter