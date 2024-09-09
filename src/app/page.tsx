import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex w-full">
      <div className="ml-[10%] mt-[12%] flex w-[42%] flex-col space-y-4">
        <h1 className="mb-4 text-5xl font-medium">
          Find cool toilets with UQPottyPal <span className="whitespace-nowrap">{">.<"}</span>
        </h1>
        <p className="text-lg">
          UQPottyPal is your go-to companion for finding and reviewing public restrooms on and around the University of
          Queensland campus. Whether you’re a student, staff member, or visitor, UQPottyPal helps you locate the
          cleanest and most accessible restrooms nearby.
        </p>
        <p className="text-lg">
          Designed to make your campus experience more comfortable, UQPottyPal is the trusted guide for all your
          restroom needs.
        </p>
        <div className="mr-3 space-x-12 place-self-center">
          <Link href="/dashboard" className="btn btn-primary btn-sm px-4">
            Get Started
          </Link>
          <Link href="/toilets" className="btn btn-outline btn-sm px-4">
            Create Toilets
          </Link>
        </div>
      </div>
      <Image src="/toilet.png" alt="toilet" className="ml-auto mt-6 w-[36%]" width={1200} height={1200} />
    </div>
  );
};

export default Home;
