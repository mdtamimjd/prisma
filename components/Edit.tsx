"use client"

import { editForm } from "@/action"
import { Posts } from "@/app/generated/prisma/client"
import { useState } from "react"

export default function Edit({ data }: { data: Posts }) {
  const [active, setActive] = useState(false)

  return (
    <div>
      <form 
        action={async (formData) => {
          await editForm(formData); // Server Action run hobe
          setActive(false);        // Form auto hide hoye jabe!
        }} 
        className={active ? "block" : "hidden"}
      >
        <input 
          type="text" 
          name="title" 
          defaultValue={data.title} 
          placeholder="Update your title" 
          className="p-2 rounded-md outline focus:outline-green-500"
        />
        <input type="hidden" value={data.id} name="id" />
        
        <div className="flex gap-2 mt-2">
          <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">
            Update
          </button>
          
          {/* Cancel button: edit na korte chaile hide korar jonno */}
          <button 
            type="button" 
            onClick={() => setActive(false)} 
            className="bg-gray-400 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </form>

      <button 
        onClick={() => setActive(!active)} 
        className={`${active ? "hidden" : "block"} py-2 px-5 rounded-md bg-blue-500 text-white`}
      >
        Edit
      </button>
    </div>
  )
}