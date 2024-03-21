import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVolunteer } from "src/api/volunteers";
import * as dayjs from "dayjs";
import { useStateSetupHandler } from "src/components/common/modal/use-state-setup-handler";
import { isValidEmail, isValidPhone } from "src/components/common/modal/validators";
import { isAllValid, BaseModal } from "src/components/common/modal/modal";
import { ModalActionBar } from "src/components/common/modal/actionbar";
import { ModalDateInput } from "src/components/common/modal/inputs/date";
import { ModalPhoneInput } from "src/components/common/modal/inputs/phone";
import { ModalTextInput } from "src/components/common/modal/inputs/text";
import { ModalMultiselectInput } from "src/components/common/modal/inputs/multiselect";
import { Neighbourhood } from "src/components/common/types";

export const CreateModal = (props: { handleClose: any }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createVolunteer, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("volunteers");
    },
  });

  const [valid, setValid] = React.useState(false);

  const { state: name, handler: handleNameChange } = useStateSetupHandler("");
  const { state: email, handler: handleEmailChange } = useStateSetupHandler("");
  const { state: password, handler: handlePasswordChange } =
    useStateSetupHandler("");

  const [preferredNeighbourhoods, setPreferredNeighbourhoods] = React.useState<string[]>([]);

  const [phone, setPhone] = React.useState("");
  const handlePhoneChange = (value: any) => {
    setPhone(value);
  };

  const [date, setDate] = React.useState<dayjs.Dayjs | null>(null);

  const handleCreate = () => {
    mutation.mutate({
      name: name,
      password: password,
      email: email,
      phoneNumber: phone,
      date: dayjs(date).toDate(),
      preferredNeighbourhoods: preferredNeighbourhoods
    });
    props.handleClose();
  };

  const handleCancel = () => {
    props.handleClose();
  };

  useEffect(() => {
    const valid = isAllValid([
      name,
      isValidEmail(email),
      password,
      isValidPhone(phone),
      dayjs(date).isValid(),
    ]);
    setValid(valid);
  }, [name, email, password, phone, date]);

  return (
    <BaseModal title={"Create volunteer"}>
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

      <ModalTextInput
        {...{
          label: "Password",
          stateValue: password,
          stateSetter: handlePasswordChange,
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

      <ModalDateInput
        {...{
          label: "Date",
          stateValue: date,
          stateSetter: setDate,
        }}
      />

      <ModalActionBar
        primaryActionProps={{
          handlePrimary: handleCreate,
          labelPrimary: "Create",
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
