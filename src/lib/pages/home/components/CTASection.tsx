import { Center, Box, Button, Flex, Image, Link } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillRocket, AiFillTrophy } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const URL = "https://ccbot.pro";

const CTASection = () => {
  const navigate = useNavigate();
  const handleToSignup = () => navigate("/signup/none");
  const [affliates, setAffiliates] = useState("");
  const [orders, setOrders] = useState("");
  const [payments, setPayments] = useState("...");

  // onStart
  const onStart = async function () {
    try {
      // eslint-disable-next-line no-console
      const health = await axios.get(`${URL}/api/v1/health`);
      // eslint-disable-next-line no-console
      console.log("health: ", health.data);
      if (health.data && health.data.stats.affiliates) {
        setAffiliates(health.data.stats.affiliates);
        setOrders(health.data.stats.orders);
        setPayments(health.data.stats.payments);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  useEffect(() => {
    onStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // once on startup

  return (
    <Center>
      <Box textAlign="center" marginY={4}>
        <Link _hover={undefined} href="https://keepkey.com">
          <Button leftIcon={<AiFillRocket />} size="sm">
            KeepKey.com
          </Button>
        </Link>
        <div>
          <h2>affliates: {affliates}</h2>
          <h2>orders: {orders}</h2>
          <h2>payments: {payments}</h2>
        </div>
        <Button leftIcon={<AiFillTrophy />} size="sm" onClick={handleToSignup}>
          Sign up for the affiliate program
        </Button>
      </Box>
    </Center>
  );
};

export default CTASection;
