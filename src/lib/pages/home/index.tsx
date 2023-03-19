import { Grid } from "@chakra-ui/react";
// import axios from "axios";
// import { useEffect } from "react";

import CTASection from "./components/CTASection";
import SomeImage from "./components/SomeImage";
import SomeText from "./components/SomeText";

// const URL = "https://ccbot.pro";

const Home = () => {
  return (
    <Grid gap={4}>
      <SomeText />
      <SomeImage />
      <CTASection />
    </Grid>
  );
};

export default Home;
