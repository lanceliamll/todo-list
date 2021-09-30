import React, { useState } from 'react'
import { updateStore } from "fluxible-js";
import { API } from '../../../helpers/env';
import { useHistory, useLocation  } from "react-router-dom";

function Verify() {
  const [code, setCode] = useState('');
  const history = useHistory();
  const location = useLocation();


  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(location);

    const codeData = { emailConfirmCode: code };

    //Verify
    fetch(`${API}/confirm-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${location?.state?.token}`
      },
      body: JSON.stringify(codeData),
    })
    .then((response) => {
      console.log("Response", response);
      return response.json()
    })
    .then((res) => {
      if(res?.user?.emailVerifiedAt) {
        console.log("Success >> Verified User", res);
        updateStore({
          user: res
        });
        history.push('/todo');
      };
    })
    .catch((err) => {
      console.error("Failed >> Error Verifying Code", err);
    });
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="code" onChange={handleCodeChange}/>
        <input type="submit" />
      </form>
    </div>
  )
};

export default Verify;
