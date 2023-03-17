import { Grid, Heading, Text } from "@chakra-ui/react";

const SomeText = () => {
  return (
    <Grid textAlign="center" gap={2}>
      <Heading fontSize="2xl" fontWeight="extrabold">
        KeepKey Affiliate program
      </Heading>
      <Text color="gray.500" fontSize="sm">
        Home Page
      </Text>
    </Grid>
  );
};

export default SomeText;
