"use client";

import { IconFidgetSpinner, IconLoader, IconLoader3, IconLoaderQuarter } from "@tabler/icons-react";

export default function Loader() {
    return (
        <div 
            style={{
                width: "100vw", 
                height: "100vh", 
                background: "rgba(255, 255, 255, 0.5)",
                position: "fixed",
                top: 0,
                left: 0,
                padding: "25% 0",
                textAlign: "center",
                zIndex: "100"
            }}
        >
            <IconLoader3 className="spin-loader" width={80} height={80} />
        </div>
    )
}