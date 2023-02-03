//import PersonAdd from './components/PersonAdd';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserAdd from './components/userAdd.component';
import UserList from './components/userList.component';
function App() {
  return (
    <div className="App">
      <UserAdd/>
      <UserList/>
    </div>
  )
}
export default App;