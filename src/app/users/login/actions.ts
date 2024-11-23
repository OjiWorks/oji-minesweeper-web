"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/src/utils/supabase/server";

export default async function login(formData: FormData) {
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
