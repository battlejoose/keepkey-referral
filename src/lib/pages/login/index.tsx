import { Grid, Button } from "@chakra-ui/react";
import { useConnectWallet } from "@web3-onboard/react";
// import SomeText from "./components/SomeText";
import axios from "axios";
import { ethers } from "ethers";
import React, { useEffect } from "react";
import uuid from "short-uuid";

const URL = "https://ccbot.pro";

interface BodyRegister {
  address: string;
  code?: string;
  payload: string;
  signature: string;
}

const Login = () => {
  const [{ wallet }, connect] = useConnectWallet();
  const [address, setAddress] = React.useState("");
  const [affliateId, setAffliateId] = React.useState("");
  const [affliateLink, setAffliateLink] = React.useState("");
  const [isSignedUp, setIsSignedUp] = React.useState(false);

  // onSignUp
  const onSignUp = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("address: ", address);

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
        signature,
      };
      // eslint-disable-next-line no-console
      console.log("body: ", body);
      const responseRegister = await axios.post(`${URL}/api/v1/register`, body);
      // eslint-disable-next-line no-console
      console.log("responseRegister", responseRegister.data);
      setAffliateId(responseRegister.data.discountCode);
      setAffliateLink(responseRegister.data.discountLink);
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
          setAffliateLink(user.data.discountLink);
          setAffliateId(user.data.discountCode);
          setIsSignedUp(true);
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
        <div>
          <Grid gap={4}>
            <div>Address: {address}</div>
            <div>CODE: {affliateId}</div>
            <div>LINK: {affliateLink}</div>
            <div>orderCount: {}</div>
            <div>foxReward: {}</div>
            <div>TTDrop: {}</div>
          </Grid>
        </div>
      ) : (
        <div>
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <Button onClick={onSignUp}>Sign Up for Affiliate Program</Button>
          <div>Address: {address}</div>
        </div>
      )}
    </div>
  );
};

export default Login;
