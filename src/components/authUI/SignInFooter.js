import { Flex, Link, useTheme } from "@aws-amplify/ui-react";

// export function SignInFooter() {
//   const { toResetPassword } = useAuthenticator();
//   const { tokens } = useTheme();

//   return (
//     <Flex justifyContent="center" padding={`0 0 ${tokens.space.medium}`}>
//       <Link onClick={toResetPassword}>Reset your password</Link>
//     </Flex>
//   );
// }

export function SignInFooter() {
  const { tokens } = useTheme();

  return (
    <Flex justifyContent="center" padding={`0 0 ${tokens.space.medium}`}>
      <Link href="https://coursleft.vercel.app/">Just want to try a demo?</Link>
    </Flex>
  );
}
