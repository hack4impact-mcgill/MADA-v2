import { Input, InputAdornment, IconButton } from "@mui/material";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";

const PasswordTextField = (props: {
  errorText: string;
  updatePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  handleClickShowPassword: () => void;
  showPassword: boolean;
}) => {
  return (
    <Input
      placeholder="Password"
      error={props.errorText.length === 0 ? false : true}
      type={props.showPassword ? "text" : "password"}
      onChange={props.updatePassword}
      value={props.password}
      sx={{
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "17px",
        width: "90%",
      }}
      required={true}
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={props.handleClickShowPassword}>
            {props.showPassword ? <MdVisibility/> : <MdVisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default PasswordTextField;
