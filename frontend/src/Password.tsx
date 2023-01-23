import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";

const Password = () => {
    const [values, setValues] = React.useState({
      password: "",
      showPassword: false,
    });
    
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event: any) => {
      event.preventDefault();
    };
    
    const handlePasswordChange = (prop: any) => (event: any) => {
      setValues({ ...values, [prop]: event.target.value });
    };
    
    return (
      <div
        style={{
          marginLeft: "30%",
          marginTop: "1%",
        }}
      >
        <Input placeholder='Password'
          type={values.showPassword ? "text" : "password"}
          onChange={handlePasswordChange("password")}
          style={{width: "250px"}}
          value={values.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
    );
  };
    
  export default Password;