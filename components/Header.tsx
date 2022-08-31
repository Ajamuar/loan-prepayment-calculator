import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";

interface IHeader {
  onOpen: () => void;
}

const Header = ({ onOpen }: IHeader) => {
  return (
    <Box w="100vw" p="4">
      <Button onClick={onOpen}>
        <HamburgerIcon />
      </Button>
    </Box>
  );
};

export default Header;
