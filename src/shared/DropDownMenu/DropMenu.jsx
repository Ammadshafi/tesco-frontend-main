import React, { useState } from "react";
import './dropdown.css'
const DropMenu = ({dropValue,setDropValue }) => {
  
   const onOptionChangeHandler=(e)=>{
    setDropValue(e.target.value)
   }
  
  return (
    <>
      <select name="drop-down" id="drop-down" onChange={onOptionChangeHandler}>
        {dropValue&&dropValue.map((each,index)=>{
            return(
            <option value={each.value}>{each.label}</option>
            )
             
        })}
       
        
        
      </select>
    </>
  );
};

export default DropMenu;
