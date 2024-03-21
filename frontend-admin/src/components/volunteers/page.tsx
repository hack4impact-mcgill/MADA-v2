import React from "react";

import { useQuery } from "@tanstack/react-query";
import { GridRowId, GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import { volunteerColumns } from "./columns";
import { useModalState } from "src/components/common/modal/use-modal-state";

import { CreateModal, EditModal } from "./modals";
import { ModalControl } from "src/components/common/modal/control";
import { getVolunteers } from "src/api/volunteers";
import {
  EditVolunteerState,
  useEditVolunteerStore,
} from "src/components/volunteers/volunteer.store";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { BasePage } from "src/components/common/layout/base-page";
import { ActionBar } from "src/components/common/layout/page-actionbar";

const VolunteersPage = () => {
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery(["volunteers"], () =>
    getVolunteers()
  );
  const {
    state: createModal,
    handleOpen: handleOpenCreateModal,
    handleClose: handleCloseCreateModal,
  } = useModalState();
  const {
    state: notifModal,
    handleOpen: handleOpenNotifModal,
    handleClose: handleCloseNotifModal,
  } = useModalState();
  const {
    state: editModal,
    handleOpen: handleOpenEditModal,
    handleClose: handleCloseEditModal,
  } = useModalState();

  const setId = useEditVolunteerStore(
    (state: EditVolunteerState) => state.setId
  );

  const handleViewTasks = React.useCallback(
    (id: GridRowId) => () => {
      navigate("/tasks?volunteerId.%3D=" + id);
    },
    []
  );

  const handleEdit = React.useCallback(
    (id: GridRowId) => () => {
      setId(id);
      handleOpenEditModal();
    },
    []
  );

  const actionColumns = [
    {
      field: "actions",
      type: "actions",
      getActions: (params: any) => [
        <GridActionsCellItem
          label="View tasks"
          onClick={handleViewTasks(params.id)}
          showInMenu
        />,
        <GridActionsCellItem
          label="Edit"
          onClick={handleEdit(params.id)}
          showInMenu
        />,
      ],
    },
  ];

  // Header
  const Header = () => {
    return (
      <ActionBar
        actions={[
          {
            handler: handleOpenCreateModal,
            label: "Create volunteer",
          },
        ]}
      />
    );
  };

  // Modals
  const CreateModalControl = () => {
    return (
      <ModalControl
        {...{
          status: createModal,
          handleClose: handleCloseCreateModal,
          children: <CreateModal handleClose={handleCloseCreateModal} />,
        }}
      />
    );
  };

  const EditModalControl = () => {
    return (
      <ModalControl
        {...{
          status: editModal,
          handleClose: handleCloseEditModal,
          children: <EditModal handleClose={handleCloseEditModal} />,
        }}
      />
    );
  };
  return (
    <BasePage header={<Header />}>
      <CreateModalControl />
      <EditModalControl />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "85%",
        }}
      >
        <DataGrid
          rows={data ? data!.data.volunteers : []}
          columns={[...volunteerColumns, ...actionColumns]}
          loading={isLoading}
        />
      </Box>
    </BasePage>
  );
};

export default VolunteersPage;
