import type { NextPage } from "next";

import SomeText from "lib/components/intro/SomeText";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
      <SomeText />
    </div>
  );
};

export default Home;
