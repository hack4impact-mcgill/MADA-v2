import React, { useState } from "react";
import { isAllValid, BaseModal } from "src/components/common/modal/modal";
import { useStateSetupHandler } from "src/components/common/use-state-setup-handler";
import { isValidEmail, isValidPhone } from "src/components/common/validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "src/api/clients";
import { ModalActionBar } from "src/components/common/modal/actionbar";
import { ModalSelectInput } from "src/components/common/modal/inputs/select";
import { ModalPhoneInput } from "src/components/common/modal/inputs/phone";
import { ModalBooleanInput } from "src/components/common/modal/inputs/boolean";
import { ModalTextInput } from "src/components/common/modal/inputs/text";
import { MealType } from "src/components/common/types";

export const CreateModal = (props: { handleClose: any }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(createClient, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("clients");
    },
  });

  const { state: name, handler: handleNameChange } = useStateSetupHandler("");
  const { state: address, handler: handleAddressChange } =
    useStateSetupHandler("");
  const { state: email, handler: handleEmailChange } = useStateSetupHandler("");
  const { state: sts, handler: handleSTSChange } = useStateSetupHandler(false);
  const { state: map, handler: handleMAPChange } = useStateSetupHandler(false);
  const [mealType, setMealType] = React.useState(MealType.VEGETARIAN);

  const [phone, setPhone] = React.useState("");
  const handlePhoneChange = (value: any) => {
    setPhone(value);
  };

  const handleCreate = async () => {
    mutation.mutate({
      name: name,
      address: address,
      email: email,
      phoneNumber: phone,
      sts: sts,
      map: map,
      mealType: mealType,
    });
    props.handleClose();
  };

  const handleCancel = () => {
    props.handleClose();
  };

  const valid = isAllValid([name, isValidEmail(email), isValidPhone(phone)]);

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

      <ModalPhoneInput
        {...{
          label: "Phone Number",
          stateValue: phone,
          stateSetter: handlePhoneChange,
        }}
      />

      <ModalTextInput
        {...{
          label: "Address",
          stateValue: address,
          stateSetter: handleAddressChange,
        }}
      />

      <ModalSelectInput
        {...{
          label: "Meal Type",
          options: [
            { value: MealType.REGULAR, label: "Regular" },
            { value: MealType.VEGETARIAN, label: "Vegetarian" },
            { value: MealType.NOFISH, label: "No Fish" },
            { value: MealType.NOMEAT, label: "No Meat" },
          ],
          stateValue: mealType,
          stateSetter: (event: any) => setMealType(event.target.value),
        }}
      />

      <ModalBooleanInput
        {...{
          label: "STS",
          stateValue: sts,
          stateSetter: handleSTSChange,
        }}
      />

      <ModalBooleanInput
        {...{
          label: "MAP",
          stateValue: map,
          stateSetter: handleMAPChange,
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
