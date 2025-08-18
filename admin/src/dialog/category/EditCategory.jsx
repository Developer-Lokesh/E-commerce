import { Pencil } from 'lucide-react';
import React, { useState } from 'react'

const EditCategory = ({ id, name, edit }) => {
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <button onClick={() => setOpen(true)} className='cursor-pointer'>
                <Pencil className="cursor-pointer" />
            </button>
            <Dialog id={id} name={name} edit={edit} open={open} onClose={onClose} />
        </div>
    );
};

const Dialog = ({ id, name, edit, open, onClose }) => {
    const [input, setInput] = useState(name || "");
    const [loading, setLoading] = useState(false);

    const handleEdit = async () => {
        try {
            setLoading(true);
            const url = import.meta.env.VITE_SERVER_URL;
            const res = await fetch(`${url}/admin/category/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ name: input.trim() }),
            });

            const data = await res.json();

            if (!data.success) {
                alert(data.error || "Something went wrong");
                return;
            }

            console.log(data);

            const n = data.data.name;
            const s = data.data.slug;

            edit(id, n, s);
            onClose();
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${open ? "flex" : "hidden"} fixed top-0 left-0 w-full h-full bg-gray-500/50 justify-center items-center`}>
            <div className='bg-white p-4 m-4 w-[300px] relative rounded'>
                <button onClick={onClose} className='absolute top-1 right-3 text-xs font-bold cursor-pointer'>X</button>
                <div className='flex flex-col gap-2'>
                    <h1 className='font-bold'>Edit category</h1>
                    <div className='flex gap-2 items-center mt-3'>
                        <label>Name:</label>
                        <input className='w-full rounded border text-sm border-gray-300 p-1'
                            type="text"
                            placeholder='Enter the category name'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <button
                        disabled={!input || loading}
                        className={`float-right w-fit bg-blue-400 cursor-pointer p-1 text-xs px-2 rounded text-white font-semibold disabled:opacity-50${!input && "disabled:-cursor-not-allowed"} ${loading && "disabled:cursor-progress"}`}
                        onClick={handleEdit}>
                        {loading ? "creating..." : "Create"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditCategory;