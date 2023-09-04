import React from "react";
import { GridActionsCellItem, GridRowId } from "@mui/x-data-grid";
import { CreateModal, EditModal } from "./modals";
import { getClients } from "src/api/clients";
import { useEditClientStore, EditClientState } from "./client.store";
import { useQuery } from "@tanstack/react-query";
import { clientColumns } from "./columns";
import { useModalState } from "src/components/common/use-modal-state";
import { ModalControl } from "src/components/common/modal/control";

import { BasePage } from "src/components/common/base-page";
import { ActionBar } from "src/components/common/page-actionbar";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/system";

const ClientsPage = () => {
  const { isLoading, isError, data, error } = useQuery(["clients"], () =>
    getClients()
  );
  const {
    state: createModal,
    handleOpen: handleOpenCreateModal,
    handleClose: handleCloseCreateModal,
  } = useModalState();
  const {
    state: editModal,
    handleOpen: handleOpenEditModal,
    handleClose: handleCloseEditModal,
  } = useModalState();

  const setId = useEditClientStore((state: EditClientState) => state.setId);

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
            label: "Create client",
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
          rows={data ? data!.data.clients : []}
          columns={[...clientColumns, ...actionColumns]}
          loading={isLoading}
        />
      </Box>
    </BasePage>
  );
};

export default ClientsPage;
