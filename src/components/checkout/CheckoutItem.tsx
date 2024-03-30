import { useCart } from "@/hooks/useCart";
import { useOne } from "@refinedev/core";
import React from "react";

type CheckoutItemProps = {
  itemCode: string;
};

const CheckoutItem = ({ itemCode }: CheckoutItemProps) => {
  const { cart } = useCart();
  const { data, isLoading } = useOne({
    resource: "products",
    id: itemCode,
  });

  if (isLoading) {
    return <li>Loading...</li>;
  }

  const item = data?.message.product_info;
  return (
    <div key={itemCode} className="flex items-center gap-x-4">
      <div className="w-12 h-12 bg-gray-300 rounded-md flex items-center justify-center">
        <img
          src={`https://tmp.zaviago.com${item.thumbnail}`}
          alt="มินิบราวนี่ 18 ชิ้น | Mini-brownie 18 ps."
          className="object-cover object-center"
        />
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{item.web_item_name}</p>
        <strong className="text-darkgray">
          {cart[itemCode]}{" "}
          {`${item.uom}${(cart[itemCode] ?? 0) > 1 ? "s" : ""}`}
        </strong>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">
          {item.price?.formatted_price}
        </p>
      </div>
    </div>
  );
};

export default CheckoutItem;
