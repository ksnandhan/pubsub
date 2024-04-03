import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Landing = () =>{

    const navigate = useNavigate(); 

    const [userName, setUserName] = useState(""); 

    const goToHome = () =>{
        navigate('/home')
    }

    return (
        <div>

        <input  type = "text" onChange = {e => setUserName(e.target.value)} />
        <button onClick = {goToHome}> JOIN </button>

        </div>
    ); 
}


export default Landing; 