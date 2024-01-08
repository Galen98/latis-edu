import { usePage, useForm } from "@inertiajs/react";
import { useState } from "react";
import { router } from "@inertiajs/react";
import InputError from "../InputError";
export default function Profilepage(){
    const errors = usePage().props.errors
    console.log('ini props',errors)
    const user = usePage().props.auth.user;
    const [name, setName] = useState(user.name)
    const [position, setPosition] = useState(user.position)
    const [email, setEmail] = useState(user.email)
    const [photo, setPhoto] = useState(null)

    const handleSubmit = () => {
        const data = {
           id:user.id, name, position, email, photo
        }
      router.post('/profiles', data)
      setName('')
      setEmail('')
      setPosition('')
      setPhoto('')
    }

    return(
        <>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-black">
                <h2 className="mt-5 mb-5 font-extrabold">Update Profile</h2>
                <div className="avatar">
                <div className="w-20 rounded-full">
                { !user.photo ? 
                    <img src="https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=" /> :
                    <img src={`/storage/profile-photos/${user.photo}`} />
                }
                </div>
                </div>
                <input type="file" placeholder="Photo" 
                className="m-2 bg-gray-100 input  w-full"
                accept="image/*"
                onChange={(photo) => setPhoto(photo.target.files[0])} 
                />
               
                <label className="block m-2 text-gray-700 text-sm font-bold mb-2" for="username">
                    Name
                </label>
                <input type="text" placeholder="Name" 
                className="m-2 bg-gray-100 input input-bordered w-full"
                required
                onChange={(name) => setName(name.target.value)} 
                defaultValue={user.name} />
                 <InputError message={errors.name}/>
                <label className="block m-2 text-gray-700 text-sm font-bold mb-2" for="username">
                   Email
                </label>
                <input type="email" placeholder="Name" 
                className="m-2 bg-gray-100 input input-bordered w-full"
                required
                onChange={(email) => setEmail(email.target.value)} 
                defaultValue={user.email} />
                 <InputError message={errors.email}/>
                <label className="block m-2 text-gray-700 text-sm font-bold mb-2" for="username">
                   Position
                </label>
                <input type="text" placeholder="Name" 
                className="m-2 bg-gray-100 input input-bordered w-full"
                required
                onChange={(position) => setPosition(position.target.value)} 
                defaultValue={user.position} />
                <button className='btn btn-md btn-neutral m-2 text-white rounded'
                 onClick={() => handleSubmit()}>Submit</button>
                </div>
                </div>
        </>
    )
}