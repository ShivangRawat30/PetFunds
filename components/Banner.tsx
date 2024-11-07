import Link from 'next/link'
import React from 'react'
import { MdSunnySnowing } from 'react-icons/md'

const IMAGE_BANNER = 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
const Banner: React.FC<{ mine?: boolean }> = ({ mine }) => {
  return (
    <div
      style={{ backgroundImage: 'url(' + IMAGE_BANNER + ')' }}
      className="relative w-full h-[44rem] flex items-center justify-center text-white
      bg-no-repeat bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-75"></div>
      <div className="flex flex-col justify-end text-white p-8 space-y-8 relative z-10 h-80">
        {!mine ? (
          <h1 className="text-7xl text-center font-semibold">
            Give a Second Chance, <br /> Change a Life
          </h1>
        ) : (
          <h1 className="text-7xl text-center font-semibold">
            Your Charity <br /> Projects
          </h1>
        )}
        <Link
          href={'/donations/create'}
          className="bg-white text-green-600 px-4 space-x-1
        flex justify-center items-center rounded-full text-center py-3
        transition duration-300 ease-in-out hover:bg-green-600 hover:text-white"
        >
          <MdSunnySnowing size={25} />
          <span>Start a Shelter fund</span>
        </Link>
      </div>
    </div>
  )
}

export default Banner
