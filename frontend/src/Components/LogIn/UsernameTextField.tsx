import { Input } from "@mui/material";

const UsernameTextField = (props: {
  updateUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  username: string;
}) => {
  return (
    <Input
      placeholder="Username or Email"
      type="text"
      sx={{
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "17px",
        width: "75%",
      }}
      onChange={props.updateUsername}
      value={props.username}
      required={true}
    />
  );
};

export default UsernameTextField;