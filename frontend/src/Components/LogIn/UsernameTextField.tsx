import { Input } from "@mui/material";

const UsernameTextField = (props: {
  placeHolder: string;
  updateUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  username: string;
}) => {
  return (
    <Input
      placeholder={props.placeHolder}
      type="text"
      sx={{
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "17px",
        width: "90%"
      }}
      onChange={props.updateUsername}
      value={props.username}
      required={true}
    />
  );
};

export default UsernameTextField;