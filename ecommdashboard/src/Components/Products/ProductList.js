import {useState,useEffect} from 'react';
import {Table, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
//import './Customstyle.css';
const ProductList = () =>{
    const [data,setData] = useState([]);
    const [status,setStatus] = useState("");

    useEffect(() => {
        fetchData();
        return () => {
        }

    },[status]);
    async function fetchData() {
        let result = await fetch('http://127.0.0.1:8000/api/list',{
            "method":"GET"
        });
        let repsone = await result.json();
        setData(repsone);
       
    }

    async function deleteProduct(id){
        let response = await fetch('http://127.0.0.1:8000/api/delete/'+id,{
            "method":"DELETE"
        }).then((response)=>response.json());
        alert(response.result);
        console.log(response,'response');
        fetchData();
    }
    async function changeStatus(getstatus,id){
       
        setStatus(getstatus);

        let data = {getstatus,id}
        document.getElementById("changeStatus_"+id).innerHTML = getstatus === "1" ? 'Deactive' : 'Active' ;
        let result = await fetch('http://127.0.0.1:8000/api/changeStatus',{
            "method":"POST",
            "body": JSON.stringify(data),
            headers:{
                'Content-Type':'application/json',
                'Accept':'application/json',
            }
        });
        let response = await result.json();
        if(response.status){
            document.getElementById("changeStatus_"+id).innerHTML = response.status === "1" ? 'Active' : 'Deactive' ;
           
            setStatus(response.status);
            alert(response.result);
        }
       
        console.log(status,'status');
    }
   
     return(
        <>
           <h5>Product List</h5>
           <div className="col-sm-8 offset-sm-2">
             <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Action</th>
                    <th>Status</th>
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
                            <td>
                                <Button onClick={()=>deleteProduct(item.id)} size="sm" variant="danger" >Delete</Button> <span></span>
                                <Link className="editProduct" to={"/updateProduct/"+item.id}><span>Edit</span></Link>
                            </td>
                            <td><Button id={"changeStatus_"+item.id} key={item.id} onClick={()=>changeStatus(item.status,item.id)} size="sm" variant="primary" >{item.status === '1' ? 'Active': 'Deactive'}</Button></td>
                        </tr>

                    ))}
                    
                </tbody>
            </Table>
            </div>
        </>

    )

}
export default ProductList;