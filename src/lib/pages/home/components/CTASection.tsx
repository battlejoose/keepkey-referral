import { Box, Button, Flex, Image, Link } from "@chakra-ui/react";
import { AiFillRocket, AiFillTrophy } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();
  const handleToSignup = () => navigate("/signup/none");
  return (
    <Box textAlign="center">
      <Link _hover={undefined} href="https://keepkey.com">
        <Button leftIcon={<AiFillRocket />} size="sm">
          KeepKey.com
        </Button>
      </Link>
      <div>
        <h2>affliates: 0</h2>
        <h2>orders: 0</h2>
        <h2>payouts: 0</h2>
      </div>
      <Button leftIcon={<AiFillTrophy />} size="sm" onClick={handleToSignup}>
        Sign up for the affiliate program
      </Button>
    </Box>
  );
};

export default CTASection;
