import AddressCard from "@/components/AddressCard";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import { useCustomMutation, useOne, useTranslate } from "@refinedev/core";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CirclePlus,
  Landmark,
  Loader2,
  MessageCircleQuestion,
  QrCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CheckoutItem from "@/components/checkout/CheckoutItem";
import { useMemo } from "react";
import ShippingRuleSelect from "@/components/checkout/ShippingRuleSelect";
import CouponCodeInput from "@/components/checkout/CouponCodeInput";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const t = useTranslate();
  const navigate = useNavigate();
  const { cart, serverCart, cartTotal, cartCount, resetCart } = useCart();

  const { data: address, isLoading: addressLoading } = useOne({
    resource: "address",
    dataProviderName: "storeProvider",
    id: serverCart?.message.doc.shipping_address_name,
    queryOptions: {
      enabled: !!serverCart?.message.doc.shipping_address_name,
    },
  });

  const { mutate, isLoading: placingOrder } = useCustomMutation({
    mutationOptions: {
      onSettled: () => {
        resetCart();
        navigate("/account/orders");
      },
    },
  });

  const checkoutSummary = useMemo(() => {
    if (serverCart && serverCart?.message.doc.shipping_rule) {
      const totalShipping =
        serverCart.message.doc.taxes.find(
          ({ description }: any) =>
            description === serverCart.message.doc.shipping_rule
        )?.tax_amount ?? 0;
      const totalTax =
        serverCart.message.doc.total_taxes_and_charges - totalShipping;
      const total = typeof cartTotal === "string" ? 0 : cartTotal;
      return {
        totalTax,
        totalShipping,
        totalDiscount:
          total +
          totalTax +
          totalShipping -
          serverCart?.message.doc.grand_total +
          serverCart?.message.doc.discount_amount,
      };
    }
    return {
      totalTax: 0,
      totalShipping: 0,
      totalDiscount: 0,
    };
  }, [serverCart]);

  return (
    <div className="py-7 px-4 flex flex-col gap-x-0 gap-y-8 md:flex-row md:gap-x-8">
      <div className="w-full md:w-1/2">
        <div className="w-full lg:max-w-[450px] mx-auto">
          <div className="flex flex-col bg-secondary p-6 rounded-lg">
            <p className=" text-xs">{t("Grand total")}</p>
            <h2 className="text-2xl font-semibold text-primary">
              THB {serverCart?.message.doc.grand_total}
            </h2>
          </div>
          <div className="mt-6">
            <h2 className="font-semibold text-darkgray">
              {t("Order summary")}
            </h2>
            <div className="mt-6 flex flex-col gap-y-4">
              <ul className="my-3 flex flex-col gap-y-3">
                {Object.entries(cart).map(([itemCode, quantity]) => {
                  if (!quantity) {
                    return null;
                  }
                  return <CheckoutItem key={itemCode} itemCode={itemCode} />;
                })}
              </ul>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col">
              <div className="w-full flex justify-between">
                <p className="text-sm text-muted-foreground">{t("Subtotal")}</p>
                <strong className="text-darkgray">THB {cartTotal}</strong>
              </div>
              {checkoutSummary.totalShipping > 0 && (
                <div className="w-full flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    {t("Shipping Cost")}
                  </p>
                  <strong className="text-muted-foreground">
                    THB {checkoutSummary.totalShipping}
                  </strong>
                </div>
              )}
              <div className="w-full flex justify-between">
                <p className="text-sm text-muted-foreground">{t("Tax")}</p>
                <strong className="text-muted-foreground">
                  THB {checkoutSummary.totalTax}
                </strong>
              </div>
              {checkoutSummary.totalDiscount > 0 && (
                <div className="w-full flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    {t("Discount")}
                  </p>
                  <strong className="text-muted-foreground">
                    THB{" "}
                    {parseFloat(`${checkoutSummary.totalDiscount}`).toFixed(2)}
                  </strong>
                </div>
              )}
              {serverCart?.message.doc.coupon_code && (
                <div className="w-full flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    {t("Coupon Code")}
                  </p>
                  <strong className="text-muted-foreground">
                    {serverCart?.message.doc.coupon_code}
                  </strong>
                </div>
              )}
              <CouponCodeInput />
            </div>
            <Separator className="my-4" />
            <div className="w-full flex justify-between">
              <p className="text-sm text-muted-foreground">
                {t("Grand total")}
              </p>
              <strong className="text-darkgray">
                THB {serverCart?.message.doc.grand_total}
              </strong>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="w-full lg:max-w-[450px] mx-auto">
          <h2 className="font-semibold text-darkgray">
            {t("Shipping Information")}
          </h2>
          <div className="mt-6 flex flex-col gap-y-4">
            <Label>{t("Address")}</Label>
            {addressLoading && <div>Loading...</div>}
            {address && <AddressCard {...address?.message} />}
            {!address && (
              <Button
                variant="outline"
                size="lg"
                className="w-full px-6 justify-start text-lg text-gray-500"
                onClick={() => navigate("/account/addresses/new")}
              >
                <CirclePlus className="mr-2" /> {t("Add Address")}
              </Button>
            )}
            <ShippingRuleSelect
              initialShippingRule={serverCart?.message.shipping_rules.find(
                ({ name }: { name: string }) =>
                  name === serverCart?.message.doc.shipping_rule
              )}
            />
            <div>
              <Label htmlFor="pm">Payment Method</Label>
              <RadioGroup
                defaultValue="card"
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="card"
                    id="card"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="card"
                    className="flex items-center justify-start rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <QrCode className="mr-2 h-4 w-4" />
                    {t("QR PromptPay")}
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="paypal"
                    id="paypal"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="paypal"
                    className="flex items-center justify-start rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Landmark className="mr-2 h-4 w-4" />
                    {t("Pay via bank")}
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Button
                size="lg"
                className="w-full"
                disabled={placingOrder || cartCount === 0}
                onClick={() =>
                  mutate({
                    dataProviderName: "storeProvider",
                    method: "post",
                    url: "place_order",
                    values: {},
                    successNotification: {
                      message: t("Order placed successfully"),
                      type: "success",
                    },
                  })
                }
              >
                {placingOrder && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("Continue to Payment")}
              </Button>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("By continuing, you agree to our")}{" "}
                <b>{t("Privacy Policy")}</b> {t("and")}{" "}
                <b>{t("Terms of Service")}</b>.
              </p>
            </div>
            <div className="w-full flex justify-center h-10 items-center">
              <Button variant="link" className="font-bold">
                <MessageCircleQuestion size={20} className="mr-1" />{" "}
                {t("Ask for help")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
