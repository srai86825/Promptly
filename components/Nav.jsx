"use client"; //cuz of hooks

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link className="flex gap-2 flex-center" href="/">
        <Image
          src="/assets/images/logo.svg"
          className="object-contain"
          width={30}
          height={30}
          alt="promptly logo"
        />
        <p className="logo_text">Promptly</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link className="black_btn" href="/create-prompt">
              Create Post
            </Link>
            <button className="outline_btn" onClick={signOut} type="button">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                className="rounded-full"
                src={session?.user.image}
                width={37}
                height={37}
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider, i) => {
                return (
                  <button
                    key={i}
                    className="black_btn"
                    onClick={async () => {
                      await signIn(provider.id);
                    }}
                    type="button"
                  >
                    {" "}
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div>
            <Image
              className="rounded-full"
              src={session?.user.image}
              width={37}
              height={37}
              alt="profile"
              onClick={() => {
                setToggleDropDown((prev) => !prev);
              }}
            />
            {toggleDropDown && (
              <div className="dropdown">
                <Link href="/profile" onClick={() => setToggleDropDown(false)}>
                  Profile
                </Link>
                <Link
                  href="/create-prompt"
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Post
                </Link>
                <Link
                  className="mt-5 black_btn w-full"
                  href="/profile"
                  onClick={() => {
                    setToggleDropDown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider, i) => {
                {
                  /* console.log(provider);
                console.log(session) */
                }
                return (
                  <button
                    key={i}
                    className="black_btn"
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    type="button"
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};
export default Nav;
