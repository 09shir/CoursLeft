import { Image, useTheme } from "@aws-amplify/ui-react";
export function Header() {
  const { tokens } = useTheme();

  return (
    <div>
        <Image
          alt="logo"
          src={require('../../assets/inkpx-word-art.png')}
        />
    </div>
  );
}
