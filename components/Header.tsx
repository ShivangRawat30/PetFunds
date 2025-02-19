import React from 'react'
import ConnectBtn from './ConnectBtn'
import Link from 'next/link'
import { MdSunnySnowing } from 'react-icons/md'
import { LiaDogSolid } from "react-icons/lia";

const Header: React.FC = () => {
  return (
    <header className='w-full absolute z-20 pt-5 px-5 sm:px-0'>
      <nav
        className="flex flex-wrap items-center justify-center lg:w-2/3 w-full
        px-2 py-3 shadow-md text-white mb-3 bg-white mx-auto rounded-full"
      >
        <div
          className="container px-4 mx-auto flex flex-wrap items-center
          justify-center"
        >
          <div className="w-full relative flex justify-between px-4 lg:static">
            <Link
              className="text-sm font-semibold leading-relaxed text-green-600
            flex justify-start items-center py-2 whitespace-no-wrap uppercase"
              href="/"
            >
              <LiaDogSolid size={25} />
              <span className='hidden sm:flex ml-3'>Pets Fund</span>
              <div className='flex flex-row gap-5 mx-10'>
                <h1>Home</h1>
                <h1>Profile</h1>
                <h1>Create</h1>
              </div>
            </Link>

            <ConnectBtn />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
