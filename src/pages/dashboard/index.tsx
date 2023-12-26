import Cookie from "js-cookie";
import Sidebar from "../../component/Sidebar";
import Breadcrumb from "../../component/Breadcrumb";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface DashboardProps {
  cancel?: string
  verifierOne?: string
  verifierTwo?: string
  officer?: string
  notYetVerified?: string
  verified?: string
}

const Dashboard = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const role = Cookie.get("role");
  const token = Cookie.get("token");

  const [data, setData] = useState<DashboardProps>();
  
  const getData = () => {
    axios
      .get("/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getData()
  }, [])

  return (
    <section>
      <div className="bg-primary w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 z-10 relative">
        <Breadcrumb pages="Dashboard" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-5 pt-5 text-[#344767] text-xl font-semibold">
            Si-LA-Bitte'
            <div className="text-sm text-gray-400 font-light">
              Dinas Peternakan & Kesehatan Hewan Provinsi Sulawesi Selatan
            </div>
          </div>
          {role === "admin" || role === "leader" ? (
            <div className="px-10 pb-5 pt-3">
              <div className="mt-4 w-5/12">
                <div className="text-gray-500 text-lg">Progress</div>
                <div className="w-full bg-[#b8e0d2] text-[#184d3b]  mt-2 rounded-lg px-5 py-3 font-semibold">
                  Total
                  <br /> Permohonan
                  <Link to={"/request"}>
                    <div className="mt-2 text-sm bg-white w-fit px-5 py-2 rounded-lg text-black">
                      Cek Permohonan
                    </div>
                  </Link>
                </div>
                <div className="grid grid-cols-4 gap-x-2">
                  <div className="w-full bg-[#fcf5c7] text-[#8b7e2a] text-2xl mt-2 rounded-lg px-5 py-3 font-semibold">
                    {data?.cancel}
                    <div className="text-sm font-normal">Ditolak</div>
                  </div>
                  <div className="w-full bg-[#fcf5c7] text-[#8b7e2a] text-2xl mt-2 rounded-lg px-5 py-3 font-semibold">
                    {data?.verifierOne}
                    <div className="text-sm font-normal">Verifikator 1</div>
                  </div>
                  <div className="w-full bg-[#fcf5c7] text-[#8b7e2a] text-2xl mt-2 rounded-lg px-5 py-3 font-semibold">
                    {data?.officer}
                    <div className="text-sm font-normal">Petugas</div>
                  </div>
                  <div className="w-full bg-[#fcf5c7] text-[#8b7e2a] text-2xl mt-2 rounded-lg px-5 py-3 font-semibold">
                    {data?.verifierTwo}
                    <div className="text-sm font-normal">Verifikator 2</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-10 pb-5 pt-3">
              <div className="mt-4 w-5/12">
                <div className="text-gray-500 text-lg">Progress</div>
                <div className="w-full bg-[#b8e0d2] text-[#184d3b]  mt-2 rounded-lg px-5 py-3 font-semibold">
                  Total
                  <br /> Permohonan
                  <Link to={"/request"}>
                    <div className="mt-2 text-sm bg-white w-fit px-5 py-2 rounded-lg text-black">
                      Cek Permohonan
                    </div>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-x-2">
                  <div className="w-full bg-[#fcf5c7] text-[#8b7e2a] text-2xl mt-2 rounded-lg px-5 py-3 font-semibold">
                    {data?.notYetVerified}
                    <div className="text-sm font-normal">Belum Terverifikasi</div>
                  </div>
                  <div className="w-full bg-[#fcf5c7] text-[#8b7e2a] text-2xl mt-2 rounded-lg px-5 py-3 font-semibold">
                  {data?.verified}
                    <div className="text-sm font-normal">Terverifikasi</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </section>
  );
};

export default Dashboard;
