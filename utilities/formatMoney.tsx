import { useMoney } from "@shopify/hydrogen-react";
import { CurrencyCode } from "@shopify/hydrogen-react/storefront-api-types";

interface FormatMoneyProps {
    amount?: string;
    currencyCode?: CurrencyCode;
}

export default function formatMoney({amount: amount, currencyCode: currencyCode} : FormatMoneyProps ){
  const money = useMoney({amount: amount!, currencyCode: currencyCode!});
  return <span>{`${money.currencySymbol}${money.amount}`}</span>
}