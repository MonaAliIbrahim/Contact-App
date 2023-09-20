import { Outlet } from "react-router-dom";
import { AppNavbar } from "../shared/Components/Navbar/Navbar";

export default function MasterLayout() {
  return (
    <div className="h-[100vh] w-[100vw] bg-secondary p-6">
      <div className="relative flex min-h-full max-h-full rounded-lg shadow-xl bg-white">
        <AppNavbar className="absolute top-0 bottom-0 left-0"/>
        <main className="w-full rounded-r-lg bg-gray-50 overflow-x-auto overflow-y-hidden">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}
