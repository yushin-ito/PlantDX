import { memo } from "react";

import HStack from "../atoms/HStack";

const Header = memo(() => {
  return (
    <header>
      <HStack className="absolute top-0 h-12 w-full items-center bg-white shadow-sm">
        <div />
      </HStack>
    </header>
  );
});

export default Header;
