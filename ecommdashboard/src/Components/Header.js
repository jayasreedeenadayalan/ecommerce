import {Navbar,Nav,Container, NavDropdown} from 'react-bootstrap';
import {Link,useNavigate} from 'react-router-dom';
import '../Customstyle.css';

const Header = () =>{
   const navigate =  useNavigate();
   let user = JSON.parse(localStorage.getItem('user-info'))

    function logout(){
        localStorage.clear();
        navigate('/register');

    }
    
    return (
        <div>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Ecomm</Navbar.Brand>
            <Nav className="me-auto nav-align">
                {!localStorage.getItem('user-info') ? 
                <>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </>
                :
                <>
                    <Link to="/addProduct">Add Products</Link>
                   
                    <Link to="/searchProduct">Search Products</Link>
                    <Link to="/">List</Link>
                    
                </>
                } 
                
              
            </Nav>
            {
              localStorage.getItem('user-info')?
                <Nav>
                <NavDropdown title={user && user.name}>
                    <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                : null
            }
        </Container>

        </Navbar>
        </div>
    )
}
export default Header;