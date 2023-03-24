import {
    Typography,
    FormControlLabel,
    Switch
  } from "@mui/material";
  
  const RememberMeSwitch = (props: {
    updateRememberMeSwitch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isRememberMeChecked: boolean;
  }) => {
    return (
      <FormControlLabel
        label={
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "13px",
            }}
          >
            Remember account
          </Typography>
        }
        labelPlacement="start"
        control={
          <Switch
            checked={props.isRememberMeChecked}
            onChange={props.updateRememberMeSwitch}
            name="rememberMe"
          />
        }
      />
    );
  };
  
  export default RememberMeSwitch;