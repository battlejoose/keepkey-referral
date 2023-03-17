import { Box, Button, Flex, Image, Link } from "@chakra-ui/react";
import { AiFillRocket } from "react-icons/ai";

const CTASection = () => (
  <Box textAlign="center">
    <Link
      _hover={undefined}
      href="https://keepkey.com"
    >
      <Button leftIcon={<AiFillRocket />} size="sm">
        KeepKey.com
      </Button>
    </Link>
    <div>
      <h2>affliates: 0</h2>
      <h2>orders: 0</h2>
      <h2>payouts: 0</h2>
    </div>
  </Box>
);

export default CTASection;
