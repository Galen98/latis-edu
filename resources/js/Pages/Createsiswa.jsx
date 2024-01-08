import Sidebar from "@/Components/Dashboard/Sidebar"
import { useState } from "react"
import { router } from "@inertiajs/react"
import InputError from "@/Components/InputError"
export default function Createsiswa(props){
    console.log('ini propsss',props)
    const lembaga = props.lembaga
    const [lembaga_id, setLembaga] = useState('')
    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [nis, setNIS] = useState('')
    const [foto, setFoto] = useState('')
    
    const handleSubmit = () => {
        const data = {
            lembaga_id, nama, email, nis, foto
        }
      router.post('/siswa', data)
    }

    return(
        <>
        <div className='min-h-screen bg-gray-100 text-black text-2xl flex flex-col md:flex-row'>
            <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen" aria-label="Sidebar">
            <Sidebar user={props.auth.user}/>
            </aside>
            <div className='lg:ml-80 flex-1 p-8'>
            <h2 className="mt-5 mb-5 text-center font-extrabold">Tambah Data Siswa</h2>
            <label className="block m-2 text-gray-700 text-sm font-bold mb-2" for="username">
             Nama
            </label>
            <input type="text" placeholder="Name" 
            className="m-2 bg-gray-100 input input-bordered w-full"
            required
            onChange={(nama) => setNama(nama.target.value)}
            />
             <InputError message={props.errors.nama}/>
            <label className="block m-2 text-gray-700 text-sm font-bold mb-2" for="username">
             Email
            </label>
            <input type="email" placeholder="Email" 
            className="m-2 bg-gray-100 input input-bordered w-full"
            required
            onChange={(email) => setEmail(email.target.value)}
            />
            <InputError message={props.errors.email}/>
            <label className="block m-2 text-gray-700 text-sm font-bold mb-2" for="username">
            NIS
            </label>
            <input type="text" placeholder="NIS" 
            className="m-2 bg-gray-100 input input-bordered w-full"
            required
            onChange={(nis) => setNIS(nis.target.value)}
            />
            <InputError message={props.errors.nis}/>
            <label className="block m-2 text-gray-700 text-sm font-bold mb-2" for="username">
            Lembaga
            </label>
            <select className="m-2 bg-gray-100 select select-bordered w-full max-w-xs"
            onChange={(lembaga_id) => setLembaga(lembaga_id.target.value)}>
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
            <input type="file" placeholder="Photo" 
            className="m-2 bg-gray-100 input  w-full"
            accept="image/*"
            onChange={(foto) => setFoto(foto.target.files[0])}
                />
            <InputError message={props.errors.foto}/>
            <button className='btn btn-md btn-neutral m-2 mt-4 text-white rounded'
             onClick={() => handleSubmit()}>Submit</button>
            </div>
            </div>
        </>
    )
}