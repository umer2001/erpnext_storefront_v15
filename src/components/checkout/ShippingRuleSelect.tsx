import { useCart } from "@/hooks/useCart";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import {
  useCustomMutation,
  useInvalidate,
  useTranslate,
} from "@refinedev/core";
import { useState } from "react";

type ShippingRuleSelectProps = {
  initialShippingRule?: any;
};

const ShippingRuleSelect = ({
  initialShippingRule,
}: ShippingRuleSelectProps) => {
  const t = useTranslate();
  const [shippingRule, setshippingRule] = useState(initialShippingRule);
  const { serverCart } = useCart();

  const invalidate = useInvalidate();
  const { mutate } = useCustomMutation({
    mutationOptions: {
      onSettled: () => {
        invalidate({
          dataProviderName: "storeProvider",
          resource: "cart",
          invalidates: ["list"],
        });
      },
    },
  });

  if (!serverCart) {
    return null;
  }

  return (
    <div>
      <Label>{t("Shipping Rule")}</Label>
      <Select
        value={shippingRule?.name}
        onValueChange={(shippingRule) => {
          mutate({
            dataProviderName: "storeProvider",
            url: "apply_shipping_rule",
            method: "post",
            values: {
              shipping_rule: shippingRule,
            },
          });
          setshippingRule(
            serverCart.message.shipping_rules.find(
              (rule: any) => rule.name === shippingRule
            )
          );
        }}
      >
        <SelectTrigger className="w-full">
          <div className="flex flex-col justify-center w-full cursor-default select-none items-start rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            {shippingRule?.name || "Select Shipping Rule"}
          </div>
        </SelectTrigger>
        <SelectContent>
          {serverCart?.message.shipping_rules?.map(
            ({ name, shipping_amount }: any) => (
              <SelectItem key={name} value={name}>
                {name}
                <p className="text-xs [&_p]:leading-relaxed">
                  THB {shipping_amount}
                </p>
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
      <p className="pl-1 text-xs text-muted-foreground">
        <b>TBH {shippingRule?.shipping_amount}</b>
      </p>
    </div>
  );
};

export default ShippingRuleSelect;
