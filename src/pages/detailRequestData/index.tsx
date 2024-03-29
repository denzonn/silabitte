import { useEffect, useState } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import Sidebar from "../../component/Sidebar";
import Cookie from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

interface RequestProps {
  map(arg0: (item: RequestProps, index: number) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
  id: string;
  file_name?: string;
  total_livestock?: string;
  status?: string;
  return_date?: string;
  return_description?: string;
  request?: RequestProps;
}

interface RequestProps {
  identification_number?: string;
  livestock_health?: string;
  type_live_stock?: TypeLiveStockProps;
  length: number;
}

interface TypeLiveStockProps {
  id?: string;
  type?: string;
}

const DetailVerifRequest = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<RequestProps>();
  const token = Cookie.get("token");
  const id = Cookie.get("id");
  const role = Cookie.get("role");

  const navigate = useNavigate();

  const getData = () => {
    axios
      .get(`/api/request/${id}`, {
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

  const getDetailData = (id: string) => {
    Cookie.set("id_data", id);

    navigate(`/detail-request-result/${id}`);
  };

  const getSertificate = (id: string) => {
    axios
      .get(`api/request/certificate/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // Set tipe respons ke blob untuk file
      })
      .then((res) => {
        const fileName = `certificate_${id}.pdf`; // Gantilah dengan nama file yang sesuai
        const url = window.URL.createObjectURL(new Blob([res.data]));

        // Buat tautan untuk mengunduh file
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        toast.error(error.message);
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
          <div className="px-10 mt-5 py-5 text-[#344767] font-semibold flex items-center gap-x-3">
            <Link to={"/request"}>
              <i className="fa-solid fa-circle-left"></i>
            </Link>
            <div className="">
              Data Permohonan{" "}
              <span className="text-xs ml-2">- {data?.file_name}</span>
            </div>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>No Identitas</td>
                  <td>Jenis Ternak</td>
                  <td>Kesehatan Ternak</td>
                  <td>Status</td>
                  {role === "admin" ? <td>Sertifikat</td> : null}
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.request && data?.request?.length > 0 ? (
                  data?.request?.map((item: RequestProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.identification_number}</td>
                        <td>{item?.type_live_stock?.type}</td>
                        <td>{item?.livestock_health}</td>
                        <td>
                          {item?.status === "5"
                            ? "Diterima"
                            : item?.status === "3"
                            ? "Menunggu Proses"
                            : "Ditolak"}
                        </td>
                        {role === "admin" && item?.status === "5" ? (
                          <td>
                            <button
                              className="bg-green-500 px-3 p-1 rounded-md"
                              onClick={() => getSertificate(item?.id)}
                            >
                              <i className="fa-solid fa-download text-white"></i>
                            </button>
                          </td>
                        ) : <td></td>}
                        <td>
                          <div>
                            {item?.status === "3" ? (
                              <i
                                className="fa-solid fa-eye cursor-pointer ml-2"
                                onClick={() => getDetailData(item?.id)}
                              ></i>
                            ) : item?.status === "0" ? (
                              <div className="flex flex-row gap-x-3">
                                <div>
                                  <i
                                    className="fa-solid fa-eye cursor-pointer ml-2"
                                    onClick={() => getDetailData(item?.id)}
                                  ></i>
                                </div>
                                <div>
                                  <i className="fa-solid fa-circle-xmark cursor-pointer ml-2 text-red-500"></i>
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-row gap-x-3">
                                <div>
                                  <i
                                    className="fa-solid fa-eye cursor-pointer ml-2"
                                    onClick={() => getDetailData(item?.id)}
                                  ></i>
                                </div>
                                <div>
                                  <i className="fa-solid fa-circle-check cursor-pointer ml-2 text-green-600"></i>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="border-b-gray-200">
                    <td colSpan={6} className="text-center">
                      Tidak ada Pengukuran
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

export default DetailVerifRequest;
