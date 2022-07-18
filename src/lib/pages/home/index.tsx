import type { NextPage } from "next";
import Link from "next/link";

import SomeText from "lib/components/intro/SomeText";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center">
      <SomeText />
      <div>
        <Link href="/login" passHref>
          <button type="button" className="btn btn-primary">
            Login for Demo
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
