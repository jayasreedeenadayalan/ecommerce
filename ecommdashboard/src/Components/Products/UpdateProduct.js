import {useState,useEffect} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import {Container,Row,Col,Form,Button,Image } from 'react-bootstrap';

const UpdateProduct = ()=>{
    const navigate =  useNavigate();
    let params = useParams();
    
    console.log(params.id);
    const[data,setData] = useState([]);
    useEffect(() => {
        fetchData();
       
        return () => {   
        }

    },[]);
   
     async function fetchData() {
        alert("count")
        let result = await fetch('http://127.0.0.1:8000/api/edit/'+params.id,{
            "method":"GET"
        });
        
        let respone = await result.json();
        setData(respone);
       
    }
 
    console.log(data,'data');
    const[name,setProduct] = useState("");
    const[pprice,setPrice] = useState("");
    const[desc,setDescription] = useState("");
    const[Url, setProductUrl] = useState("")
    async function updateProduct(e){ 
        e.preventDefault();
        const formValues = new FormData();
        formValues.append('productUrl',Url);
        formValues.append('productname',name);
        formValues.append('price',pprice);
        formValues.append('description',desc);
        formValues.append('_method','PUT');
       
       
        try{
           
            let response  =  await fetch('http://127.0.0.1:8000/api/update/'+params.id,{
                "method" :"POST",
                "body":formValues
                
            });
            await response.json().then((data)=>{
                alert("respo");
                console.log(data,'dataa');
                alert("product updated suuccessfully");
                navigate('/');
            });

            }catch(err){
                console.log("During Product update:".err)
            }
     

    }

    return(
        <div>
        <h5>Update Product</h5>
        <Container>
         <Form >
            <Row className="mb-3">
                <Col className="col-sm-6 offset-sm-3">
                <Form.Control size="sm"  defaultValue={data.product_name} onChange={(e)=>setProduct(e.target.value)} type="text" placeholder="Product Name" />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col className="col-sm-6 offset-sm-3">
                <Form.Control size="sm" defaultValue={data.product_price} type="text" onChange={(e)=>setPrice(e.target.value)} placeholder="Product Price" />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col className="col-sm-6 offset-sm-3">
                <Form.Control as="textarea"   defaultValue={data.product_description} size="sm" rows={3} onChange={(e)=>setDescription(e.target.value)} placeholder="Product Description" />
                </Col>
            </Row>
            <Row className="mb-3">
            <Col className="col-sm-6 offset-sm-3">
                <Form.Control type="file" onChange={(e)=>setProductUrl(e.target.files[0])}size="sm" />
          
            </Col>
            </Row>
            <Row className="mb-3">
            <Col className="col-sm-6 offset-sm-1">
           
            <Image style={{"width":100 }} src={"http://localhost:8000/"+data.product_url} alt={data.product_name} />
            <Col/>
          
            </Col>
            
            </Row>
             
            <Button type="submit" onClick={updateProduct} variant="success">Update Product</Button>
            </Form>
        </Container>
        </div>
      
    )
}
export default UpdateProduct;
