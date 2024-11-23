"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/src/utils/supabase/server";

export async function register(formData: FormData) {
  const supabase = await createClient();

  const userData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const username = formData.get("username") as string;

  const { data, error } = await supabase.auth.signUp(userData);
  const userId = data.user?.id as string;
  console.log(userId);

  const registerError = await insertUser(userId, username);
  console.log(registerError);

  if (error || registerError) {
    redirect("/users/error?message=register");
  }

  revalidatePath("/", "layout");
  redirect("/users/login");
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const userData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(userData);

  if (error) {
    redirect("/users/error?message=login");
  }

  revalidatePath("/", "layout");
  redirect("/game");
}

async function insertUser(user_id: string, username: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("user").insert({ user_id, username });

  if (error) {
    return error;
  }
}

export async function getUserName(user_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user")
    .select("username")
    .eq("user_id", user_id);

  if (error) {
    return error;
  }

  const username = data[0].username as string;

  return username;
}

export async function getUserId() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const userId = data.user?.id;

  if (error) {
    return error;
  }

  return userId;
}
