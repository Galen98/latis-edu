import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Dashboard/Sidebar';
import Tablesiswa from '@/Components/Dashboard/Tablesiswa';

export default function Dashboard(props) {
console.log(props)
    return (
<>
            <Head title="Dashboard" />
            <div className='min-h-screen bg-gray-100 text-black text-2xl flex flex-col md:flex-row'>
            <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen" aria-label="Sidebar">
            <Sidebar user={props.auth.user}/>
            </aside>
            <div className='lg:ml-80 flex-1 p-8'>
            <div className="toast toast-top toast-center">
            {props.flash.message ? <div className="alert alert-success text-white">
                <span>{props.flash.message}</span>
            </div>
            : 
            <></>
            }
            </div>
            <Tablesiswa siswa={props.siswa} lembaga={props.lembaga}/>
            </div>
            </div>
            </>
    );
}
