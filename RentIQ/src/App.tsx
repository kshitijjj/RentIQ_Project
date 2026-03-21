import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './Components/Home Components/Home'
import Auth from './Components/Auth Component/auth'
import Profile from './Components/Profile Component/profile'
import PropertyInput from './Components/Property Component/propertyInput'
import PropertyCard from './Components/Home Components/Property Components/PropertyCard'
import Properties from './Components/Home Components/Property Components/Properties'
import Tenant from './Components/Tenant Component/tenant'
import TenantHome from './Components/Tenant Component/tenantHome'
import PropertyDetail from './Components/Detailed Property Component/propertyDetail'
import RentHistory from './Components/Detailed Property Component/RentHistory'
import { createContext, } from 'react'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/auth/signup' element={<Auth />}/>
        <Route path='/auth/login' element={<Auth />}/>
        <Route path='/auth/user/profile' element={<Profile />}/>
        <Route path="/add/property" element={<PropertyInput/>}/>
        <Route path="/property" element={<Properties/>}/>
        <Route path='/invite' element={<Tenant />}/>
        <Route path='/tenant' element={<TenantHome />}/>
        <Route path='/property/:propertyId/detail' element={<PropertyDetail />}/>
        <Route path='/tenant/tenantid' element={<RentHistory />}/>

      </Routes>
    </Router>
    </>
  )
}

export default App
