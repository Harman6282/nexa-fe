"use client";

import React, { ReactNode } from "react";

const Wrapper = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
    return (
        <div className={`max-w-7xl mx-auto px-2 ${className}`}>
            {children}
        </div>
    );
};

export default Wrapper;
