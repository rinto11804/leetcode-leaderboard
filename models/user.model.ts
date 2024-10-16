import { Role, type User } from "@/lib/types";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { boolean } from "zod";
import { SolvedCount, calculateInitialPoints } from "@/lib/utils";

export interface IUser extends Document {
  username: string;
  email: string;
  role: Role;
  password: string;
  isVerified: boolean;
  points: number;
  solution: SolvedCount;
  createdAt: Date;
  updatedAt: Date;
}
const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    points: {
      type: Number,
      default: 0,
    },
    solution: {
      type: {
        easy: Number,
        medium: Number,
        hard: Number,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export async function createUser({ email, username, role, password }: User) {
  try {
    const isUserExist = await User.findOne({ $and: [{ email }, { username }] });
    if (isUserExist) {
      return { error: true, data: "user already exist" };
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ username, email, role, password: hash });
    return user;
  } catch (e: any) {
    return e;
  }
}

export async function getUsers(): Promise<IUser[]> {
  try {
    const users = await User.find({});
    return users;
  } catch (e) {
    throw e;
  }
}

export async function getUserbyId(id: string): Promise<IUser> {
  try {
    const userId = new mongoose.Types.ObjectId(id);
    const user = (await User.findOne({ _id: userId })) as IUser;
    return user;
  } catch (e) {
    throw e;
  }
}

export async function getUserbyEmail(email: string): Promise<IUser> {
  try {
    const user = (await User.findOne({ email })) as IUser;
    return user;
  } catch (e) {
    throw e;
  }
}

export async function verifyUser(
  email: string,
  { easy, medium, hard }: SolvedCount
) {
  try {
    const user = (await User.findOne({ email })) as IUser;
    if (user.isVerified) {
      return { error: false, data: "user already verified" };
    }
    await User.updateOne(
      { email },
      { $inc: { points: calculateInitialPoints({ easy, medium, hard }) } }
    );

    await User.updateOne(
      { email },
      { isVerified: true, solution: { easy, medium, hard } }
    );

    return { error: false, data: "user verified" };
  } catch (e) {
    return e;
  }
}

export { User };
