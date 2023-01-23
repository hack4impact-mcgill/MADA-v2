import React from 'react'
import Input from "@material-ui/core/Input";

const Username = () => {
  const [values, setValues] = React.useState({
  username: "",
  });

  const handleUsernameChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  return (
    <div
      style={{
        marginLeft: "30%",
      }}
    >
      <Input placeholder="Username or Email"
        type="text"
        style={{width: "250px"}}
        onChange={handleUsernameChange("username")}
        value={values.username}
      />
    </div>
  );
};

export default Username;