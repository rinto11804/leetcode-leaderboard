"use client";
import Link from "next/link";
import { login } from "../actions/auth";
import { useFormState, useFormStatus } from "react-dom";

export default function Login() {
  const [state, action] = useFormState(login, undefined);
  const { pending } = useFormStatus();

  return (
    <div className="flex items-center justify-center w-full h-screen p-10">
      <div className="card bg-base-100 items-center shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">welcome back...</h2>
          <form
            className="flex justify-between  flex-col gap-5 w-full"
            action={action}
          >
            <label className="input input-bordered flex items-center gap-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" placeholder="Email" id="email" name="email" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                name="password"
                id="password"
              />
            </label>
            <div className="card-actions justify-end">
              <Link href="/signup" className="link">
                create account
              </Link>
              <button
                className="btn btn-primary w-full"
                aria-disabled={pending}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
