// side-bar-new-msg section
import React, {useState } from "react";
import {BiComment,BiTrash } from "react-icons/bi";
 function Searchdata(){
    const[status,setstatus]=useState(true)
    return(
        <div className="input-msg-box flex" onClick={()=>{setstatus(!status);}}>
        <div className="msg-icon">
        < BiComment/>
        </div>
          <p>helo</p>
         <div style={status? {visibility: "hidden"}:{visibility: "visible"}} className="trash-box">
         <BiTrash/>
         </div>
         </div>
    )
}
export default Searchdata