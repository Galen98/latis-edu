import Profilepage from "@/Components/Dashboard/Profilepage"
import Sidebar from "@/Components/Dashboard/Sidebar"
import { Head } from "@inertiajs/react"
export default function Profiles(props){
    console.log('ini props',props)
    return(
        <>
        <div className='min-h-screen bg-gray-100 text-black text-2xl flex flex-col md:flex-row'>
            <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen" aria-label="Sidebar">
            <Sidebar user={props.auth.user}/>
            </aside>
            <div className='lg:ml-80 flex-1 p-8'>
            <Profilepage/>
            </div>
            </div>
        </>
    )
}