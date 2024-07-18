import React, { ReactNode } from "react";

type GraphLayoutProps = {
  children: ReactNode;
};

const GraphLayout = ({ children }: GraphLayoutProps) => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        {children}
      </div>
    </section>
  );
};

export default GraphLayout;
