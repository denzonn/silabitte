import { useEffect, useState } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import Sidebar from "../../component/Sidebar";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

interface TypeLiveStock {
  id: number;
  type: string;
  certificate_color: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  role: string;
  is_active: boolean;
  otp: string;
}

interface RequestProps {
  id: string;
  livestock_gender?: string;
  identification_number?: string;
  straw_number?: string;
  father_number?: string;
  mother_number?: string;
  age?: string;
  menpan_data_code?: string;
  status?: string;
  return_date?: string;
  return_description?: string;
  certificate_number?: string;
  type_livestock_id?: string;
  user_id?: string;
  length?: number;
  type_live_stock?: TypeLiveStock;
  user?: User;
}

const Request = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<RequestProps[]>();
  const token = Cookie.get("token");
  const role = Cookie.get("role");

  const navigate = useNavigate();

  const getData = () => {
    axios
      .get("/api/request", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res?.data?.data?.data);

        setData(res?.data?.data?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        toast.error("Silahkan login terlebih dahulu");
      }, 2000);
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <section>
      <div className="bg-primary w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 z-10 relative">
        <Breadcrumb pages="Data Permohonan" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-5 pt-5 text-[#344767] font-semibold">
            Data Permohonan Table
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>Nama Pemilik</td>
                  <td>No Straw</td>
                  <td>Jenis Ternak</td>
                  <td>No Identitas Ternak</td>
                  {role === "admin" || role === "leader" ? (
                    <td>Status</td>
                  ) : null}
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data && data?.length > 0 ? (
                  data?.map((item: RequestProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.user?.name}</td>
                        <td>{item?.straw_number}</td>
                        <td>
                          {item?.type_live_stock?.type?.toLocaleUpperCase()}
                        </td>
                        <td>{item?.identification_number}</td>
                        {role === "admin" || role === "leader" ? (
                          <td>
                            {item?.status == "1"
                              ? "Verifikator 1"
                              : item?.status == "2"
                              ? "Petugas"
                              : item?.status == "3"
                              ? "Verifikator 2"
                              : item?.status == "4"
                              ? "Pimpinan"
                              : item?.status == "0"
                              ? "Ditolak"
                              : "Permohonan Diterima"}
                          </td>
                        ) : null}
                        <td>
                          {role === "verifier I" || role === "verifier II" ? (
                            <i className="fa-solid fa-circle-check ml-2"></i>
                          ) : null}
                          {role === "admin" || role === "leader" ? (
                            <i className="fa-solid fa-trash cursor-pointer ml-2"></i>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="border-b-gray-200">
                    <td colSpan={6} className="text-center">
                      Tidak ada Permohonan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Request;
