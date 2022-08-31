import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

import CurrencyInput from "./CurrencyInput";

interface IDataDrawer {
  isOpen: boolean;
  onClose: () => void;
  principal: number;
  rates: number;
  tenure: number;
  setPrincipal: (value: number) => void;
  setRates: (value: number) => void;
  setTenure: (value: number) => void;
}

const DataDrawer = ({
  isOpen,
  onClose,
  principal,
  rates,
  tenure,
  setPrincipal,
  setRates,
  setTenure,
}: IDataDrawer) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add Relevant Information</DrawerHeader>

        <DrawerBody>
          <Box mb={4}>
            <Heading as="h2" size="sm" mb={2}>
              Principal Amount:
            </Heading>
            <CurrencyInput
              value={principal}
              onChange={(value) => setPrincipal(value)}
            />
          </Box>

          <Box mb={4}>
            <Heading as="h2" size="sm" mb={2}>
              Rate of Interest:
            </Heading>
            <NumberInput
              precision={2}
              max={100}
              min={0}
              format={(val) => val + ` %`}
              value={rates}
              onChange={(valueAsString, valueAsNumber) => {
                if (
                  !valueAsString ||
                  valueAsString === "NaN" ||
                  valueAsNumber === NaN
                ) {
                  setRates(0);
                } else {
                  setRates(valueAsNumber);
                }
              }}
            >
              <NumberInputField />
            </NumberInput>
          </Box>

          <Box mb={4}>
            <Heading as="h2" size="sm" mb={2}>
              Tenure:
            </Heading>
            <NumberInput
              precision={0}
              min={1}
              format={(val) => val + ` ${val === "1" ? "month" : "months"}`}
              value={tenure}
              onChange={(valueAsString, valueAsNumber) => {
                if (
                  !valueAsString ||
                  valueAsString === "NaN" ||
                  valueAsNumber === NaN
                ) {
                  setTenure(1);
                } else {
                  setTenure(valueAsNumber);
                }
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DataDrawer;
