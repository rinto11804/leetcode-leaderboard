"use server";

import dbConnect from "@/lib/dbConnect";
import { createSession, deleteSession } from "@/lib/session";
import {
  SignupFormSchema,
  User,
  LoginFormSchema,
  FormState,
} from "@/lib/types";
import { createUser, getUserbyEmail } from "@/models/user.model";
import bcrpyt from "bcrypt";
import { redirect } from "next/navigation";

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
  const user = await createUser(data);
  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }
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
