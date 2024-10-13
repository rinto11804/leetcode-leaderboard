"use server";

import dbConnect from "@/lib/dbConnect";
import { createSession, deleteSession } from "@/lib/session";
import {
  SignupFormSchema,
  User,
  LoginFormSchema,
  FormState,
} from "@/lib/types";
import { SolvedCount } from "@/lib/utils";
import { createUser, getUserbyEmail, verifyUser } from "@/models/user.model";
import bcrpyt from "bcrypt";
import { createInitialRouterState } from "next/dist/client/components/router-reducer/create-initial-router-state";
import { redirect } from "next/navigation";

const LEETCODE_API = process.env.LEETCODE_API;

export async function signup(state: FormState, formData: FormData) {
  await dbConnect();
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const data = validatedFields.data as User;
  const res = await createUser(data);
  if (res.error) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  let solvedQuestions = await fetch(`${LEETCODE_API}/${res.username}/solved`);
  let { easySolved, hardSolved, mediumSolved } = await solvedQuestions.json();
  await verifyUser(data.email, {
    easy: easySolved,
    medium: mediumSolved,
    hard: hardSolved,
  });
}

export async function login(state: FormState, formData: FormData) {
  await dbConnect();
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const data = validatedFields.data as User;
  const user = await getUserbyEmail(data.email);
  if (!user) {
    return {
      message: "An error occurred while login.",
    };
  }
  if (!user) return null;
  const passwordMatch = await bcrpyt.compare(data.password, user.password);
  if (!passwordMatch) {
    return {
      message: "Not Authorized",
    };
  }
  createSession(user);
  redirect("/dashboard");
}

export async function logout() {
  deleteSession();
  redirect("/login");
}
