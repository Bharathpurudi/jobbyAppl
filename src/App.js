import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Jobs from './components/Jobs'
import SpecificJobDetail from './components/SpecificJobDetail'
import UserProfile from './components/UserProfile'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={SpecificJobDetail} />
      <ProtectedRoute exact path="/user-profile" component={UserProfile} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
