import {
  Input,
  Box,
  FormHelperText,
  FormControl,
  Stack,
} from "@mui/material";
import "../../Styles/LogIn.css";

const setHelperText = (errorText: string, helperText: string) => {
  if (errorText.length === 0) {
    return "";
  } else {
    return helperText;
  }
};

const UsernameTextField = (props: {
  errorText: string;
  helperText: string;
  placeHolder: string;
  updateUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  username: string;
}) => {
  return (
    <Stack spacing={5} sx={{ width: "100%" }}>
      <Box display="flex" align-items="center" justifyContent="center">
        <FormControl sx={{ width: "90%" }}>
          <FormHelperText error={props.errorText.length === 0}>
            {setHelperText(props.errorText, props.helperText)}
          </FormHelperText>
          <Input
            error={props.errorText.length === 0 ? false : true}
            placeholder={props.placeHolder}
            type="text"
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "17px",
            }}
            onChange={props.updateUsername}
            value={props.username}
            required={true}
          />
        </FormControl>
      </Box>
    </Stack>
  );
};

export default UsernameTextField;
