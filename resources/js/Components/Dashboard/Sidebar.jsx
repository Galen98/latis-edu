import { Link } from "@inertiajs/react"
export default function Sidebar({ user }){

return(
    <>
    <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center mt-5">
    <label htmlFor="my-drawer-2" className="btn btn-sm btn-light text-white drawer-button lg:hidden">
    <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
    </label>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <li><a href={route('dashboard')}>Siswa</a></li>
      <li><a href={route('profile.edit')}>Profile, {user.name}</a></li>
      <li><Link href={route('logout')} method="post" as="button">Logout</Link></li>
    </ul>
  
  </div>
</div>
    </>
)
}