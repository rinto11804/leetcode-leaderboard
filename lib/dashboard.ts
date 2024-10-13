import { getUsers } from "@/models/user.model";

export default async function getAllUsers() {
  try {
    return await getUsers();
  } catch (e) {
    throw e;
  }
}
