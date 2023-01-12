import React from "react";

const DropDownMenu = ({ defaultValue,options }) => {
  return (
    <>
      <select name="drop-menu" id="drop-menu">
        <option value={"none"}>{defaultValue}</option>
        {options.map((cur)=>{
        <option value={cur.id}>{cur.value}</option>

        })}
        
      </select>
    </>
  );
};

export default DropDownMenu;
