import { Center, Grid, Heading, Text } from "@chakra-ui/react";

const SomeText = () => {
  return (
    <Center>
      <Grid textAlign="center" gap={2} marginY={4}>
        <Heading fontSize="2xl" fontWeight="extrabold">
          KeepKey Affiliate program
        </Heading>
        <Text color="gray.500" fontSize="sm">
          Home Page
        </Text>
      </Grid>
    </Center>
  );
};

export default SomeText;
