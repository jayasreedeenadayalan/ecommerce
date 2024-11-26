import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Protected = (props) =>{
    const navigate = useNavigate();

   let CMP = props.Cmp;
   useEffect(() => {

    if(!localStorage.getItem('user-info')){
        navigate('/login');

    }


},[]);
   return (
         <div>
            <CMP />
        </div> 
     );
 
 }
 export default Protected;