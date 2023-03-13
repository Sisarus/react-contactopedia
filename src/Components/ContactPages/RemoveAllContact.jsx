import React from "react";

const RemoveAllContact = (props) => {
  return(
    <div>
      <button className='btn btn-danger form-control' onClick={()=>{props.handleRemoveAllContacts()}}>Remove All Contact</button>
    </div>
  );
};

export default RemoveAllContact;