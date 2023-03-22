import { Input, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const PasswordTextField = (props: {
  updatePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  handleClickShowPassword: () => void;
  showPassword: boolean;
}) => {
  return (
    <Input
      placeholder="Password"
      type={props.showPassword ? "text" : "password"}
      onChange={props.updatePassword}
      value={props.password}
      sx={{
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "17px",
        width: "75%",
      }}
      required={true}
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={props.handleClickShowPassword}>
            {props.showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default PasswordTextField;