import { actionDelete, actionForm } from "@/action";
import Edit from "@/components/Edit";
import prisma from "@/lib/prisma";



export default async function Home() {
  const posts = await prisma.posts.findMany();
  return (
    <div>
      <form action={actionForm} className="border grid grid-cols-5 bg-orange-500 text-white rounded-md px-2 text-lg">
        <input type="text" name="title" placeholder="Enter you title" className="col-span-4 outline-none p-2" />
        <button type="submit" className="border-l hover:bg-orange-600">Send</button>
      </form>
      <div>
        {
          posts.length === 0 ?"":
          posts.map((d,i)=> <div key={i} className="p-4 rounded-md my-2 bg-slate-400">
            <p>{d.createdAt.toLocaleString()}</p>
            <h1 className="text-2xl font-bold">{d.title}</h1>
            <div className="flex gap-5 mt-2 items-center">
              <Edit data={d}/>
            <form action={actionDelete}>
              <input type="hidden" value={d.id} name="id" />
              <button className="bg-red-500 py-2 px-5 rounded-md text-white" type="submit">Delete</button>
            </form>
            </div>
          </div>)
        }
      </div>
    </div>
  );
}
