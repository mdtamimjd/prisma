"use server"
import { revalidatePath } from "next/cache";
import prisma from "./lib/prisma";

export async function actionForm(formData:FormData) {
  const title = formData.get("title") as string;
  if(!title || !title.trim()) return;
  const post = await prisma.posts.create({
    data:{title}
  })
    revalidatePath("/")
}
export async function actionDelete(formData:FormData) {
  const id = formData.get("id") as string;
  if(!id || !id.trim()) return;

  const deletePost = await prisma.posts.delete({
    where: { id }
  })
  revalidatePath("/")
}
export async function editForm(formData:FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  console.log(id,title)
  if(!title || !title.trim() || !id || !id.trim() ) return;
  const post = await prisma.posts.update({
    where:{id},
    data:{ title }
  })
  revalidatePath("/")
}
