import { Link } from "@inertiajs/react"
import Paginator from "./Paginator"
import { useRef } from "react"
import { useState } from "react"
import {useDownloadExcel} from 'react-export-table-to-excel'

export default function Tablesiswa(siswa){
const siswas = siswa.siswa.data
const lembaga = siswa.lembaga
const tableref=useRef(null)
const [search, setSearch] = useState('')
const [filter, setFiltersearch] = useState('')
const {onDownload} = useDownloadExcel({
  currentTableRef:tableref.current,
  filename:'siswa_data',
  sheet:'SiswaData'
})

    return(
        <>
<div className="overflow-x-auto mt-32 text-black bg-white p-6 shadow-sm rounded-lg">
<h2 className="text-center font-extrabold mb-5">Tabel Siswa</h2>
<div className="mb-5">
<Link href={route('create.siswa')} className="btn btn-sm btn-neutral text-white rounded mr-4">Add data</Link>
<button className="btn btn-sm btn-success text-white rounded mr-4"
onClick={onDownload}>Export Excel</button>
<input type="text" placeholder="Cari siswa" 
className="mt-10 input input-sm bg-gray-100 input-bordered w-full max-w-xs"
onChange={(e) => setSearch(e.target.value)} />
<p className="text-sm mt-5">Filter by lembaga:</p>
<select className="select select-ghost w-full max-w-xs mt-3"
onChange={(e) => setFiltersearch(e.target.value)}>
  <option disabled selected>Pilih lembaga</option>
  <option value=''>Semua lembaga</option>
  {lembaga.map((data, i) => (
<option key={i} 
value={data.id}>{data.nama_lembaga}</option>
))}
</select>
</div>
  <table className="table"
  ref={tableref}>
    {/* head */}
    <thead>
      <tr className="text-black">
        <th></th>
        <th>Nama</th>
        <th>Nis</th>
        <th>Email</th>
        <th>Lembaga</th>
        <th>Foto</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
    {siswas
    .filter((data) => {
        const isNamaMatched = search.toLowerCase() === '' || data.nama.toLowerCase().includes(search);
        const isLembagaMatched = filter === '' || data.lembaga.id == filter;
        return isNamaMatched && isLembagaMatched;
    }).map((data, i) => (
      <tr key={data.id}>
        <th>{i + 1}</th>
        <td>{data.nama}</td>
        <td>{data.nis}</td>
        <td>{data.email}</td>
        <td>{data.lembaga.nama_lembaga}</td>
        <td>
        <div className="avatar">
        <div className="w-16 rounded-full">
        <img src={`/storage/siswa-photos/${data.foto}`} />
        </div>
        </div>
        </td>
        <td>
            <Link
            className="btn btn-accent btn-sm rounded text-white"
            href={route('edit.siswa')} as="button" 
            method="GET" data={{id:data.id}}
            >Edit</Link>
        </td>
        <td>
            <Link
            className="btn btn-error btn-sm rounded text-white"
            href={route('delete.siswa')} as="button" 
            method="POST" data={{id:data.id}}
            >Delete</Link>
        </td>
      </tr>
      ))}
    </tbody>
  </table>
  <div className='flex justify-center item-center mt-5'>
  {siswa.siswa.meta.last_page == 1 ? <></> : 
        <Paginator meta={siswa.siswa.meta}/>  
    }   
       </div>
    </div>
        </>
    )
}