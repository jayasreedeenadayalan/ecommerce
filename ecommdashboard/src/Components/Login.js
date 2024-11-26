import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Login = ()=>{
    const navigate =  useNavigate();
    useEffect(() => {

        if(localStorage.getItem('user-info')){
            navigate('/addProduct');

        }


    },[]);
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    

    async function login(){
        let data = {email,password};
        console.log(data,'inputdata');
        try{
            let response = await fetch('http://127.0.0.1:8000/api/login',{
                'method':"POST",
                "body":JSON.stringify(data),
                "headers":{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            })
            await response.json().then((data) => {
               if(Object.getOwnPropertyNames(data).includes("error")){
              
                 localStorage.clear();
                 navigate("/register");
                
               }else{
                 localStorage.setItem("user-info",JSON.stringify(data));
                 navigate("/addProduct");
               }
            
          }
        );
          
        }
        catch(err){
            console.log("Error durin login:",err)
        }
       
    }
    return(
        <div >
        <h5>Login Page</h5>
        <Container>
            <Row className="mb-3">
                <Col className="col-sm-6 offset-sm-3">
                <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)} type="text" size="sm" placeholder="email"/>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col className="col-sm-6 offset-sm-3">
                    <Form.Control value={password} type="Password" size="sm" onChange={(e)=>setPassword(e.target.value)}placeholder="Password"/>
                </Col>
            </Row>
            <Button type="button" variant="success" onClick={login}>Login</Button> 

        </Container>
     
       
        </div>
    )
}
export default Login;