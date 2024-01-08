import Sidebar from "@/Components/Dashboard/Sidebar"
import { usePage } from "@inertiajs/react"
import { useState } from "react"
import InputError from "@/Components/InputError"
import { router } from "@inertiajs/react"

export default function Editsiswa(props){
    const siswa = props.siswa
    const lembaga = props.lembaga
    console.log(lembaga)
    const [lembaga_id, setLembaga] = useState(siswa.lembaga_id)
    const [nama, setNama] = useState(siswa.nama)
    const [email, setEmail] = useState(siswa.email)
    const [nis, setNIS] = useState(siswa.nis)
    const [foto, setFoto] = useState(null)

    const handleSubmit = () => {
        const data = {
            id:siswa.id,lembaga_id, nama, email, nis, foto
        }
      router.post('/siswa/update', data)
    }

    return(
        <>
     <div className='min-h-screen bg-gray-100 text-black text-2xl flex flex-col md:flex-row'>
            <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen" aria-label="Sidebar">
            <Sidebar user={props.auth.user}/>
            </aside>
            <div className='lg:ml-80 flex-1 p-8'>
            <h2 className="mt-5 mb-5 text-center font-extrabold">Edit Siswa</h2>

            <label className="block m-2 text-gray-700 text-sm font-bold mb-2" for="username">
             Nama
            </label>
            <input type="text" placeholder="Name" 
            className="m-2 bg-gray-100 input input-bordered w-full"
            required
            onChange={(nama) => setNama(nama.target.value)}
            defaultValue={siswa.nama}
            />
             <InputError message={props.errors.nama}/>
            <label className="block m-2 text-gray-700 text-sm font-bold mb-2" for="username">
             Email
            </label>
            <input type="email" placeholder="Email" 
            className="m-2 bg-gray-100 input input-bordered w-full"
            required
            defaultValue={siswa.email}
            onChange={(email) => setEmail(email.target.value)}
            />
            <InputError message={props.errors.email}/>
            <label className="block m-2 text-gray-700 text-sm font-bold mb-2" for="username">
            NIS
            </label>
            <input type="text" placeholder="NIS" 
            className="m-2 bg-gray-100 input input-bordered w-full"
            required
            defaultValue={siswa.nis}
            onChange={(nis) => setNIS(nis.target.value)}
            />
            <InputError message={props.errors.nis}/>

            <label className="block m-2 text-gray-700 text-sm font-bold mb-2" for="username">
            Lembaga
            </label>
            <select className="m-2 bg-gray-100 select select-bordered w-full max-w-xs"
            onChange={(lembaga_id) => setLembaga(lembaga_id.target.value)}
            defaultValue={siswa.lembaga_id}>
            <option disabled selected>Pilih lembaga</option>
            {lembaga.map((data, i) => (
            <option key={i} 
            value={data.id}>{data.nama_lembaga}</option>
            ))}
            </select>
            <InputError message={props.errors.lembaga_id}/>
            <label className="block m-2 text-gray-700 text-sm font-bold mb-2" for="username">
            Foto
            </label>
            <div className="avatar">
                <div className="w-20 rounded-full">
                { !siswa.photo ? 
                    <img src={`/storage/siswa-photos/${siswa.foto}`} /> :
                    <img src="https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg=" />
                }
                </div>
                </div>
            <input type="file" placeholder="Photo" 
            className="m-2 bg-gray-100 input  w-full"
            accept="image/*"
            onChange={(foto) => setFoto(foto.target.files[0])}
                />
            <InputError message={props.errors.foto}/>

            <button className='btn btn-md btn-neutral m-2 mt-5 text-white rounded'
             onClick={() => handleSubmit()}>Submit</button>
            </div>
            </div>
        </>
    )
}