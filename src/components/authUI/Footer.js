import { Flex, Text, useTheme } from "@aws-amplify/ui-react";

export function Footer() {
  const { tokens } = useTheme();

  return (
    <Flex justifyContent="center" padding={tokens.space.medium}>
      <Text style={{ color: "#D3D3D3"}}>&copy; All Rights Reserved</Text>
    </Flex>
  );
}
