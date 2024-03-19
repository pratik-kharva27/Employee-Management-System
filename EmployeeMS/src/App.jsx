import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import Login from './Components/Login'
import Login from './Components/Login'

import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Category from './Components/Category'
import Profile from './Components/Profile'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
import Start from './Components/Start'
import EmployeeLogin from './Components/EmployeeLogin'
import EmployeeDetail from './Components/EmployeeDetail'
import PrivateRoute from './Components/PrivateRoute'
import AddAdmin from './Components/AddAdmin'
import Manager from './Components/Manager'
import AddManager from './Components/AddManager'
import ManagerLogin from './Components/ManagerLogin'
import EditManager from './Components/EditManager'
import AddLeave from './Components/LeaveForm'
import ManagerDashboard from './Components/ManagerDashboard'
import ManagerHome from './Components/ManagerHome'
import AddManagerDashboard from './Components/AddManagerDashboard'
import EditManagerDashboard from './Components/EditManagerDashboard'
import AddEmployeeManager from './Components/AddEmployeeManager'
import EmployeeManagerList from './Components/EmployeeManagerList'
import EditEmployeeManagerDashboard from './Components/EditEmployeeManagerDashboard'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start />}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/employee_login' element={<EmployeeLogin />}></Route>
      <Route path='/manager_login' element={<ManagerLogin />}></Route>
      <Route path='/addleave' element={<AddLeave />}></Route>
      <Route path='/employee_detail/:id' element={<EmployeeDetail />}></Route>
      <Route path='/manager-dashboard' element={
         <PrivateRoute >
           <ManagerDashboard />
         </PrivateRoute>
      }>
        <Route path='' element={<ManagerHome />}></Route>
        <Route path='/manager-dashboard/add_manager_dashboard' element={<AddManagerDashboard />}></Route>
        <Route path='/manager-dashboard/edit_manager_dashboard/:id' element={<EditManagerDashboard />}></Route>
        <Route path='/manager-dashboard/add_employee_manager' element={<AddEmployeeManager />}></Route>
        <Route path='/manager-dashboard/list_employee_manager' element={<EmployeeManagerList />}></Route>
        <Route path='/manager-dashboard/edit_employee_manager/:id' element={<EditEmployeeManagerDashboard />}></Route>

      </Route>
      <Route path='/dashboard' element={
        <PrivateRoute >
          <Dashboard />
        </PrivateRoute>
      }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/category' element={<Category />}></Route>
        <Route path='/dashboard/profile' element={<Profile />}></Route>
        <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
        <Route path='/dashboard/add_admin' element={<AddAdmin />}></Route>
        <Route path='/dashboard/add_admin/:id' element={<AddAdmin />}></Route>
        <Route path='/dashboard/manager' element={<Manager />}></Route>
        <Route path='/dashboard/edit_manager/:id' element={<EditManager />}></Route>
        <Route path='/dashboard/add_manager' element={<AddManager />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App