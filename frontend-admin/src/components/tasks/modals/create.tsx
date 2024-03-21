import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAllValid, BaseModal } from "src/components/common/modal/modal";
import { Select, MenuItem, Box, Stack, Typography } from "@mui/material";

export const CreateModal = (props: { handleClose: any }) => {
  
  const handleChange = () => {
    console.log("changed to smth")
  }

  return (
    <BaseModal title={"Create Tasks"}>
      <Box>
        <Stack direction={"row"}>
          <Typography>Route 1</Typography>
          <Select
            value={10}
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Stack>
      </Box>
    </BaseModal>
  );
};
