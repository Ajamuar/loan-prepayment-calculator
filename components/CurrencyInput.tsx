import { NumberInput, NumberInputField } from "@chakra-ui/react";

interface ICurrencyInput {
  value: number;
  onChange: (value: number) => void;
}

const CurrencyInput = ({ value, onChange }: ICurrencyInput) => {
  const format = (value: number | string) => {
    if (!value || value === NaN || value === "NaN") return "₹ 0";

    let valueAsNumber: number;
    if (typeof value === "number") {
      valueAsNumber = value;
    } else {
      valueAsNumber = parseInt(value);
      if (valueAsNumber === NaN) {
        valueAsNumber = 0;
      }
    }
    let indianLocale = Intl.NumberFormat("en-IN");

    return "₹ " + indianLocale.format(valueAsNumber).toString();
  };

  return (
    <NumberInput
      minW={"160px"}
      value={value}
      onChange={(valueAsString, valueAsNumber) => {
        if (
          !valueAsString ||
          valueAsString === "NaN" ||
          valueAsNumber === NaN
        ) {
          onChange(0);
        } else {
          onChange(valueAsNumber);
        }
      }}
      format={(value) => format(value)}
      onFocus={(event) => event.target.select()}
    >
      <NumberInputField />
    </NumberInput>
  );
};

export default CurrencyInput;
