"use client";

import useAuth from "../hook/auth/useAuth";

const RootPage = () => {
  const { session, isLoading } = useAuth();

  return (
    <section className="flex flex-grid items-center justify-center gap-4 py-8 md:py-10"></section>
  );
};

export default RootPage;
