import {useState} from 'react';
import {Row,Col,Form,Table} from 'react-bootstrap';
const SearchProduct = () =>{
    const[data,setData] = useState([]);

    async function search(key){

        if(key !== ""){

            let result = await fetch("http://127.0.0.1:8000/api/searchProduct/"+key);
            result = await result.json();
            setData(result);
            
        }

    }

    return(
        <div>
            <h5>Search Product</h5>
            <Row className="mb-3">
                <Col className="col-sm-6 offset-sm-3">
                <Form.Control size="sm" type="text" onChange={(e)=>search(e.target.value)} placeholder=" Search Product " />
                </Col>
            </Row>
            <div className="col-sm-8 offset-sm-2">
             <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.product_name}</td>
                            <td>{item.product_price}</td>
                            <td>{item.product_description}</td>
                            <td><img style={{ width:100 }} src={'http://localhost:8000/'+item.product_url} alt={item.product_name} /></td>
                            
                        </tr>

                    ))}
                    
                </tbody>
            </Table>
            </div>
        </div>
            
    );

}
export default SearchProduct;