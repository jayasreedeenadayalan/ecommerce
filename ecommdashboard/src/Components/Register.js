
import {Container, Form, Row,Col } from 'react-bootstrap';
import {Button } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";


const Register = ()=>{
  useEffect(() => {

    if(localStorage.getItem('user-info')){
        navigate('/addProduct');
      }
},[]);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
     async function signUp(e){
      e.preventDefault();
      let input = {name,email,password};
      console.log(input);
        try{
          let response =  await fetch('http://127.0.0.1:8000/api/register',{
                method:"POST",
                body:JSON.stringify(input),
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json',
                }
            });
            response = await response.json().then(data => console.log(data));
      
            
            localStorage.setItem('userInfo',JSON.stringify(response));
            navigate('/addProduct');
          } catch(error){
            console.log("error during sign up:",error)

          }

    }

    return(
        <div>
        <h5>Register Page</h5>
        <Container  className="justify-content-center" >
         
         <Form className="offset-sm-4" >
          <Row className='mb-3 align-center'>
            <Col sm={6} >
                <Form.Group >
                    <Form.Control size="sm" id="name" value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter Name" />
                </Form.Group>
            </Col>
          </Row>
          <Row className='mb-3'>
          <Col sm={6}>
            <Form.Group>
               
                <Form.Control size="sm" id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email" />
            </Form.Group>
         </Col>
        </Row>
         <Row className='mb-3'>
         <Col sm={6}>
            <Form.Group>
               
                <Form.Control size="sm" id="password" autoComplete="on" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter Password" />
            </Form.Group>
         </Col>
         </Row>
         <Row  className="d-grid">
          <Col sm={6}>
           <Button type="submit" onClick={signUp} size='sm'  variant="success">Sign up</Button>
          </Col>
         </Row>
         </Form>
        </Container>
        </div>
    )
}
export default Register;