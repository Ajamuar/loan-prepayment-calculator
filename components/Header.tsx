import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";

interface IHeader {
  onOpen: () => void;
}

const Header = ({ onOpen }: IHeader) => {
  return (
    <Box display={"flex"} justifyContent="flex-end" p="4">
      <Button onClick={onOpen}>
        <HamburgerIcon />
      </Button>
    </Box>
  );
};

export default Header;
