import React from "react";
import Link from "next/link";

export default function AnnouncementBar(){
    return(
        <div className="bg-gray-950">
            <div className="max-w-7xl lg:max-w-screen-2xl mx-auto px-4 py-2 md:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <p className="text-white">
                     Due to high demand, shipping may take longer than expected. Thank you for your patience!
                    </p>
                    <div className="hidden md:flex md:items-center">
                       <Link href="https://www.greenworkscommerical.com" className="font-bold text-white after:content-['|'] after:px-2 after:opacity-70 after:font-normal">Commercial</Link>
                       <Link href={`/pages/contact`} className="font-bold text-white">Support</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}