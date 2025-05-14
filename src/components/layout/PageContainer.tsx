
import React from "react";
import Navbar from "./Navbar";

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const PageContainer = ({ children, className = "" }: PageContainerProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className={`container mx-auto px-4 py-8 flex-grow ${className}`}>
        {children}
      </main>
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2025 TravelPlanner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PageContainer;
