"use server";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="grid place-items-center  h-screen gap-2">
      <div className="card flex flex-col items-center p-9 bg-base-200 gap-7">
        <h1 className="font-bold text-xl">Welcome to leetcode-leaderboard</h1>
        <div className="card-body flex flex-row gap-3">
          <button className="btn btn-primary">
            <Link href="/login">Sign In</Link>
          </button>
          <button>
            <Link href="/signup" className="btn btn-outline btn-primary">
              Sign Up
            </Link>
          </button>
        </div>
      </div>
    </main>
  );
}
