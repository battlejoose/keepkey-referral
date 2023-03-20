import {
  Grid,
  Text,
  Card,
  CardBody,
  Stack,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  CardHeader,
  CardFooter,
  Heading,
  StackDivider,
  Box,
  useClipboard,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useConnectWallet } from "@web3-onboard/react";
// import SomeText from "./components/SomeText";
import axios from "axios";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import uuid from "short-uuid";
import { isError } from "util";

interface Props {}

const URL = "https://ccbot.pro";
// const URL = "http://localhost:4000";

interface BodyRegister {
  address: string;
  dogeAddress: string;
  code?: string;
  payload: string;
  signature: string;
  leader: string;
}

const Login = () => {
  const { referralAddress } = useParams();
  const [{ wallet }, connect] = useConnectWallet();
  const [address, setAddress] = React.useState("");
  const [affliateId, setAffliateId] = React.useState("");
  const [affliateLink, setAffliateLink] = React.useState("");
  const [isSignedUp, setIsSignedUp] = React.useState(false);
  const [affliateLeader, setAffliateLeader] = React.useState("");
  const [numberOfHires, setNumberOfHires] = React.useState(0);
  const [balance, setBalance] = React.useState(0);
  const [isError, setIsError] = React.useState(false);
  const [dogeAddress, setDogeAddress] = React.useState("");
  const [buttonText, setButtonText] = React.useState("copy");
  const [orders, setOrders] = React.useState([]);
  const handleInputChangeDogeAddress = (e: any) =>
    setDogeAddress(e.target.value);

  // const handleInputChangeDogeAddress = function (dogeAddress: string) {
  //   try {
  //     if (dogeAddress[0] !== "D") {
  //       // setIsError(true)
  //     } else {
  //       setDogeAddress(dogeAddress);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const onClickCopy = function (vaule: string) {
    try {
      // eslint-disable-next-line no-console
      console.log("onClickCopyAffiliateLink: ", vaule);
      const valueString = vaule.toString();
      navigator.clipboard.writeText(valueString.valueOf());
      alert(`Copied to clipboard! value: ${valueString}`);
    } catch (e) {
      console.error(e);
    }
  };

  // onSignUp function
  const onSignUp = async function () {
    const leader = referralAddress;
    // @ts-ignore
    setAffliateLeader(leader);
    try {
      // eslint-disable-next-line no-console
      console.log("address: ", address);

      if (!dogeAddress) alert("Invalid doge address! doge address required!");

      // register
      const code = uuid.generate();
      setAffliateId(code);
      // eslint-disable-next-line no-console
      console.log("code: ", code);

      // sign Address
      let payload: any = {
        address,
        code,
      };
      payload = JSON.stringify(payload);

      if (!address) throw Error("Onbord not setup! no address ");
      if (!wallet || !wallet.provider) throw Error("Onbord not setup!");
      const ethersProvider = new ethers.providers.Web3Provider(
        wallet.provider,
        "any"
      );
      const signer = ethersProvider.getSigner();
      const signature = await signer.signMessage(payload);

      const body: BodyRegister = {
        address,
        code,
        payload,
        dogeAddress,
        signature,
        leader,
      };
      // eslint-disable-next-line no-console
      console.log("body: ", body);
      const responseRegister = await axios.post(`${URL}/api/v1/register`, body);
      // eslint-disable-next-line no-console
      console.log("responseRegister", responseRegister.data);
      setAffliateId(responseRegister.data.discountCode);
      setAffliateLink(responseRegister.data.discountLink);
      setDogeAddress(responseRegister.data.dogeAddress);
      setAffliateLeader(leader);
      setIsSignedUp(true);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };
  // onStart
  const onConnect = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("address:  ", wallet?.accounts[0].address);
      if (wallet?.accounts[0].address) {
        setAddress(wallet.accounts[0].address);
        const user = await axios.get(
          `${URL}/api/v1/user/${wallet.accounts[0].address}`
        );
        if (user.data) {
          // eslint-disable-next-line no-console
          console.log("user: ", user.data);
          setDogeAddress(user.data.dogeAddress);
          setAffliateLink(user.data.discountLink);
          setAffliateId(user.data.discountCode);
          setAffliateLeader(user.data.leader);
          setNumberOfHires(user.data.hires.length);
          setBalance(user.data.balance);
          setIsSignedUp(true);
        }

        // get orders
        const orders = await axios.get(
          `${URL}/api/v1/orders/${wallet.accounts[0].address}`
        );
        if (orders.data) {
          // eslint-disable-next-line no-console
          console.log("orders: ", orders.data);
          setOrders(orders.data);
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  useEffect(() => {
    onConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, wallet?.accounts, wallet?.accounts[0]]); // once on startup

  useEffect(() => {
    if (!wallet) connect();
  }, [connect, wallet]); // once on startup

  return (
    <div>
      {isSignedUp ? (
        <div className="container">
          <div className="grid">
            <Tabs>
              <TabList>
                <Tab>Info</Tab>
                <Tab>payments</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Card>
                    <CardHeader>
                      <Heading size="md">User Referral Report</Heading>
                    </CardHeader>
                    <CardBody>
                      <Stack divider={<StackDivider />} spacing="4">
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Address:
                          </Heading>
                          {address}
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Doge Address:
                          </Heading>
                          <div className="value item">{dogeAddress}</div>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            CODE:
                          </Heading>
                          <div className="value item">{affliateId}</div>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            PURCHASE LINK:
                          </Heading>
                          <small>(10pct discount for users)</small>
                          <div className="value item">{affliateLink}</div>
                          <Button onClick={() => onClickCopy(affliateLink)}>
                            Copy
                          </Button>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Leader
                          </Heading>
                          <div className="value item">{affliateLeader}</div>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            MLM LINK:
                          </Heading>
                          <div className="value item">
                            https://keepkey-referral.vercel.app/signup/{address}
                          </div>
                          <Button
                            onClick={() =>
                              onClickCopy(
                                `https://keepkey-referral.vercel.app/signup/${address}`
                              )
                            }
                          >
                            Copy
                          </Button>
                        </Box>
                        <Box>
                          <Heading size="xs" textTransform="uppercase">
                            Hires:
                          </Heading>
                          <div className="value item">{numberOfHires}</div>
                        </Box>
                      </Stack>
                    </CardBody>
                  </Card>
                </TabPanel>
                <TabPanel>
                  <TableContainer>
                    <Table variant="simple">
                      <TableCaption>Orders</TableCaption>
                      <Thead>
                        <Tr>
                          <Th>amount</Th>
                          {/* <Th>Order ID</Th> */}
                          {/* <Th>Queue ID</Th> */}
                          {/* <Th>Broadcast</Th> */}
                          <Th>TXID: </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {orders.map((order) => (
                          <Tr key={order._id}>
                            <Td>{order.amount}</Td>
                            {/* <Td>{order.queueId}</Td> */}
                            <Td>{order.broadcast.txid}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      ) : (
        <Card p={4}>
          <CardBody>
            <Stack spacing={4}>
              <Text>Referral: {referralAddress}</Text>
              <Button onClick={onSignUp}>Sign Up for Affiliate Program</Button>
              <Text>Address: {address}</Text>
              <FormControl isInvalid={isError}>
                <FormLabel>Doge Address</FormLabel>
                <Input
                  type="text"
                  value={dogeAddress}
                  onChange={handleInputChangeDogeAddress}
                />
                {!isError ? (
                  <FormHelperText>Enter your doge address</FormHelperText>
                ) : (
                  <FormErrorMessage>Invalid doge address</FormErrorMessage>
                )}
              </FormControl>
            </Stack>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default Login;
