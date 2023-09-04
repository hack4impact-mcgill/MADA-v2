import React, { useEffect } from "react";
import { EditClientState, useEditClientStore } from "../client.store";
import { getClient, editClient } from "src/api/clients";
import { BaseModal } from "src/components/common/modal/modal";
import { useStateSetupHandler } from "src/components/common/use-state-setup-handler";
import { ModalActionBar } from "src/components/common/modal/actionbar";
import { ModalSelectInput } from "src/components/common/modal/inputs/select";
import { ModalPhoneInput } from "src/components/common/modal/inputs/phone";
import { ModalBooleanInput } from "src/components/common/modal/inputs/boolean";
import { ModalTextInput } from "src/components/common/modal/inputs/text";

import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { MealType, getMealTypeFromString } from "src/components/common/types";

export const EditModal = () => {
  const id = useEditClientStore((state: EditClientState) => state.id);
  const setId = useEditClientStore((state: EditClientState) => state.setId);

  const { data } = useQuery({
    queryKey: ["clients", id],
    queryFn: () => getClient(id),
  });

  const {
    state: name,
    setState: setName,
    handler: handleNameChange,
  } = useStateSetupHandler("");
  const {
    state: address,
    setState: setAddress,
    handler: handleAddressChange,
  } = useStateSetupHandler("");
  const {
    state: email,
    setState: setEmail,
    handler: handleEmailChange,
  } = useStateSetupHandler("");
  const {
    state: sts,
    setState: setSTS,
    handler: handleSTSChange,
  } = useStateSetupHandler(false);
  const {
    state: map,
    setState: setMAP,
    handler: handleMAPChange,
  } = useStateSetupHandler(false);
  const [mealType, setMealType] = React.useState(MealType.VEGETARIAN);

  const [phone, setPhone] = React.useState("");
  const handlePhoneChange = (value: any) => {
    setPhone(value);
  };

  useEffect(() => {
    if (data?.data.client) {
      setName(data!.data.client.name);
      setPhone(data!.data.client.phoneNumber);
      setAddress(data!.data.client.address);
      setEmail(data!.data.client.email);
      setMealType(getMealTypeFromString(data!.data.client.mealType));
      setSTS(data!.data.client.sts);
      setMAP(data!.data.client.map);
    }
  }, [data]);

  const queryClient = new QueryClient();

  const mutation = useMutation(editClient, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("clients");
    },
  });

  const handleSave = async () => {
    await mutation.mutate({
      id: id,
      data: {
        name: name,
        email: email,
        phoneNumber: phone,
        address: address,
        mealType: mealType,
        sts: sts,
        map: map,
      },
    });
    setId(-1);
  };

  const handleCancel = () => {
    setId(-1);
  };

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
            { value: MealType.VEGETARIAN, label: "Vegetarian" },
            { value: MealType.NOFISH, label: "No Fish" },
            { value: MealType.NOMEAT, label: "No Meat" },
          ],
          key: "value",
          stateValue: mealType,
          stateSetter: (event: any) => {
            const mealType: MealType = event.target.value;
            setMealType(mealType);
          },
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
          handlePrimary: handleSave,
          labelPrimary: "Save",
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
