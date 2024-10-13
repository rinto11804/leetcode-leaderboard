"use client";

import { useUserContext } from "@/hooks/user";

export default function TaskForm() {
  const user = useUserContext();
  console.log(user);
  return (
    <div className="card bg-base-200">
      <div className="card-body flex gap-10 w-full">
        <h2 className="card-title text-gray-50">
          Submit your leetcode
          <span className="bg-black text-gray-50 px-2">solution</span>
        </h2>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text text-gray-50 font-semibold">
              Question No:
            </span>
          </div>
          <input
            type="text"
            placeholder="question no"
            id="question_no"
            name="question_no"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <div className="card-actions w-full">
          <button className="btn btn-primary w-full">Submit</button>
        </div>
      </div>
    </div>
  );
}
