import React, { useEffect } from "react";
import {
  EditVolunteerState,
  useEditVolunteerStore,
} from "src/components/volunteers/volunteer.store";
import { getVolunteer, editVolunteer } from "src/api/volunteers";
import { isAllValid, BaseModal } from "src/components/common/modal/modal";
import { useStateSetupHandler } from "src/components/common/modal/use-state-setup-handler";
import { isValidEmail, isValidPhone } from "src/components/common/modal/validators";
import { ModalActionBar } from "src/components/common/modal/actionbar";
import { ModalPhoneInput } from "src/components/common/modal/inputs/phone";
import { ModalTextInput } from "src/components/common/modal/inputs/text";
import { ModalMultiselectInput } from "src/components/common/modal/inputs/multiselect";
import { Neighbourhood } from "src/components/common/types";

import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

export const EditModal = (props: { handleClose: any }) => {
  const id = useEditVolunteerStore((state: EditVolunteerState) => state.id);
  const setId = useEditVolunteerStore(
    (state: EditVolunteerState) => state.setId
  );

  const [valid, setValid] = React.useState(false);
  const { data } = useQuery({
    queryKey: ["volunteers", id],
    queryFn: () => getVolunteer(id),
  });

  const {
    state: name,
    setState: setName,
    handler: handleNameChange,
  } = useStateSetupHandler("");
  const {
    state: email,
    setState: setEmail,
    handler: handleEmailChange,
  } = useStateSetupHandler("");

  const [phone, setPhone] = React.useState("");
  const handlePhoneChange = (value: any) => {
    setPhone(value);
  };
  const [preferredNeighbourhoods, setPreferredNeighbourhoods] = React.useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setName(data!.data.volunteer.name);
      setEmail(data!.data.volunteer.email);
      setPhone(data!.data.volunteer.phoneNumber);
      setPreferredNeighbourhoods(data!.data.volunteer.preferredNeighbourhoods || [])
    }
  }, [data]);

  useEffect(() => {
    const valid = isAllValid([name, isValidEmail(email), isValidPhone(phone)]);
    setValid(valid);
  }, [name, email, phone, preferredNeighbourhoods]);

  const queryClient = new QueryClient();

  const mutation = useMutation(editVolunteer, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("volunteers");
    },
  });

  const handleSave = async () => {
    await mutation.mutate({
      id: id,
      data: {
        name: name,
        email: email,
        phoneNumber: phone,
        preferredNeighbourhoods: preferredNeighbourhoods
      },
    });
    setId(-1);
    props.handleClose();
  };

  const handleCancel = () => {
    setId(-1);
    props.handleClose();
  };

  //   const valid = isAllValid([name, isValidEmail(email), isValidPhone(phone)]);

  return (
    <BaseModal title={"Edit " + name}>
      <ModalTextInput
        {...{
          label: "Name",
          stateValue: name,
          stateSetter: handleNameChange,
        }}
      />

      <ModalTextInput
        {...{
          label: "Email",
          stateValue: email,
          stateSetter: handleEmailChange,
        }}
      />

      <ModalPhoneInput
        {...{
          label: "Phone Number",
          stateValue: phone,
          stateSetter: handlePhoneChange,
        }}
      />

      <ModalMultiselectInput
        {...{
          label: "Neighborhood",
          stateValue: preferredNeighbourhoods,
          stateSetter: (event: any) => setPreferredNeighbourhoods(event.target.value),
          key: "value",
          options: [
            { value: Neighbourhood.COTEDENEIGES, label: "Côte De Neiges" },
            { value: Neighbourhood.COTESTLUC, label: "Côte St-Luc" },
            { value: Neighbourhood.DOWNTOWN, label: "Downtown" },
            { value: Neighbourhood.LACHINE, label: "Lachine" },
            { value: Neighbourhood.LAVAL, label: "Laval" },
            { value: Neighbourhood.MONTREAL, label: "Montreal" },
            { value: Neighbourhood.MONTREALWEST, label: "Montreal West" },
            { value: Neighbourhood.TMR, label: "Town of Mount Royal" },
            { value: Neighbourhood.VERDUN, label: "Verdun" },
            { value: Neighbourhood.VILLESTLAURENT, label: "Ville St-Laurent" },
            { value: Neighbourhood.WESTISLAND, label: "West Island" },
          ]
        }}
      />

      <ModalActionBar
        primaryActionProps={{
          handlePrimary: handleSave,
          labelPrimary: "Save",
          disabled: !valid,
        }}
        secondaryActionProps={[
          {
            handle: handleCancel,
            label: "Cancel",
          },
        ]}
      />
    </BaseModal>
  );
};
