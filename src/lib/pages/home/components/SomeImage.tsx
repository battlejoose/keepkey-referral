import { Center, Flex, Image } from "@chakra-ui/react";

const ICON_SIZE = 44;

const SomeImage = () => {
  return (
    <Center>
      <Flex justifyContent="center" alignItems="center" gridGap={2} marginY={4}>
        <Image src="/assets/keepkey.png" title="vite" height={ICON_SIZE} width={ICON_SIZE} />
        <Image src="/assets/dogelogo.webp" title="react" height={ICON_SIZE} width={ICON_SIZE} />
      </Flex>
    </Center>
  );
};

export default SomeImage;
