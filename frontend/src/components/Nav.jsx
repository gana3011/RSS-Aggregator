import React from 'react'
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <header className="bg-white">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="flex-1 md:flex md:items-center md:gap-12">
        <div className="block text-rose-700">
        <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">FeedTube</h1>
        </div>
      </div>

      <div className="md:flex md:items-center md:gap-12">
        <div className="flex items-center gap-4">
          <div className="sm:flex sm:gap-4">
            <div
              className="rounded-md bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm"
            >
            <Link to="/signin">
              Signin
              </Link>
            </div>

            <div className="hidden sm:flex">
              <div
                className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-rose-600"
              >
                <Link to="/signup">
                Signup
                </Link>
              </div>
            </div>
          </div>

          <div className="block md:hidden">
            <button
              className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
    </div>
  )
}

export default Nav;
