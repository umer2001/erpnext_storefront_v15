import AddressForm from "@/components/forms/AddressForm";
import {
  IResourceComponentsProps,
  useCustomMutation,
  useNavigation,
  useNotification,
  useSelect,
  useTranslate,
  useUpdate,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import React from "react";

export const AddressEdit: React.FC<IResourceComponentsProps> = () => {
  const {
    refineCore: { queryResult, id },
  } = useForm({});
  const t = useTranslate();

  const { mutate, isLoading } = useUpdate();

  if (queryResult?.isLoading) {
    return <div>Loading...</div>;
  }

  const address = queryResult.data.message;

  return (
    <div className="w-full lg:w-[450px] mx-auto">
      <h1 className="font-semibold text-darkgray">{t("Update Addresses")}</h1>
      <div className="mt-6">
        <h1 className="font-semibold text-gray-500 mb-2">{address.name}</h1>
        <AddressForm
          initialValues={address}
          isSubmitting={isLoading}
          onSubmit={(values) =>
            mutate({
              id: id as string,
              resource: "address",
              dataProviderName: "storeProvider",
              values,
            })
          }
        />
      </div>
    </div>
  );
};
