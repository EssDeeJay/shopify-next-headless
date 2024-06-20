import { useMoney } from "@shopify/hydrogen-react";
import { MoneyV2 } from "@shopify/hydrogen-react/storefront-api-types";

export default function formatMoney({amount, currencyCode} : MoneyV2 ){
  const money = useMoney({amount: amount, currencyCode: currencyCode})
  return <span>{`${money.currencySymbol} ${money.amount}`}</span>
}