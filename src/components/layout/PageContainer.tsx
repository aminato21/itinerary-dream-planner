
import React from "react";
import Navbar from "./Navbar";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const PageContainer = ({ children, className = "" }: PageContainerProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`container mx-auto px-4 py-8 flex-grow z-10 ${className}`}>
        <div className="glass-card rounded-2xl p-6 md:p-8 mt-4">
          {children}
        </div>
      </main>
      <footer className="glass z-10 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-700">
          <p className="font-medium">© 2025 TravelPlanner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PageContainer;
