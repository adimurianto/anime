"use client";

import { useRouter } from 'next/navigation';
import { IconMenu2 } from "@tabler/icons-react";
import { useState } from 'react';

export default function Navbar() {
    const router = useRouter();
    const [active, setActive] = useState(false);

    return (
        <header>
            <div 
                className="logo"
                onClick={() => {
                    setActive(false)
                    router.push("/");
                }}
                style={{cursor: "pointer"}}
            >
                ANIME
            </div>

            <nav className={active === true ? "active" : ""}>
                <ul>
                    <li>
                        <a 
                            onClick={() => {
                                setActive(false)
                                router.push("/");
                            }}
                        >
                            Home
                        </a>
                    </li>

                    <li>
                        <a 
                            onClick={() => {
                                setActive(false)
                                router.push("/collections");
                            }}
                        >
                            Collection
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="menu-toggle" onClick={() => setActive(!active)}>
                <IconMenu2 />
            </div>
        </header>
    )
}