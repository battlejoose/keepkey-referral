import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Web3OnboardProvider } from "@web3-onboard/react";
import { BrowserRouter as Router } from "react-router-dom";

import Layout from "lib/layout";
import Routings from "lib/router/Routings";
import web3Onboard from "./web3-onboard";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
// 3. extend the theme
const theme = extendTheme({ config });

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
