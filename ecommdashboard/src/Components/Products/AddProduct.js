import { Row, Col, Container, Form, Button } from "react-bootstrap";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";


const AddProduct = ()=>{
    const navigate =  useNavigate();
    const[productname,setProduct] = useState("");
    const[price,setPrice] = useState("");
    const[description,setDescription] = useState("");
    const[productUrl, setProductUrl] = useState("")
    async function addProduct(){

        const formData = new FormData();
        formData.append('productUrl',productUrl);
        formData.append('productname',productname);
        formData.append('price',price);
        formData.append('description',description);
        console.log(formData,'productUrl')
        try{
            let response  =  await fetch('http://127.0.0.1:8000/api/createProduct',{
                "method" :"POST",
                "body":formData
                
            });
            await response.json().then((data)=>{
                alert("product saved suuccessfully");
                navigate('/');
            });

            }catch(err){
                console.log("During Product creation:".err)
            }
        
        

    }
    return (
        <div>
        <h5>Add Product</h5>
        <Container>
            <Row className="mb-3">
                <Col className="col-sm-6 offset-sm-3">
                <Form.Control size="sm"  onChange={(e)=>setProduct(e.target.value)}type="text" placeholder="Product Name" />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col className="col-sm-6 offset-sm-3">
                <Form.Control size="sm"  type="text" onChange={(e)=>setPrice(e.target.value)} placeholder="Product Price" />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col className="col-sm-6 offset-sm-3">
                <Form.Control as="textarea"  size="sm" rows={3} onChange={(e)=>setDescription(e.target.value)} placeholder="Product Description" />
                </Col>
            </Row>
            <Row className="mb-3">
            <Col className="col-sm-6 offset-sm-3">
                <Form.Control type="file" onChange={(e)=>setProductUrl(e.target.files[0])}size="sm" />
            </Col>
            </Row>
            <Button onClick={addProduct} type="submit" variant="success">Add Product</Button>
          
        </Container>
        </div>
    )
}
export default AddProduct;