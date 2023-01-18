import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Web3OnboardProvider } from "@web3-onboard/react";

import Layout from "lib/layout";
import Routings from "lib/router/Routings";
import { theme } from "lib/styles/theme";

import web3Onboard from "./web3-onboard";

const App = () => (
  <Web3OnboardProvider web3Onboard={web3Onboard}>
    <ChakraProvider theme={theme}>
      <Router>
        <Layout>
          <Routings />
        </Layout>
      </Router>
    </ChakraProvider>
  </Web3OnboardProvider>
);

export default App;
