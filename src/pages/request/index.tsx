import { useEffect, useState } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import Sidebar from "../../component/Sidebar";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import RequestComp from "../../component/Request";

interface RequestProps {
  id: string;
  file_name?: string;
  total_livestock?: string;
  status?: string;
  return_date?: string;
  return_description?: string;
  officer?: OfficerProps;
  user?: UserProps;
  request?: []
}

interface OfficerProps {
  id: string;
  name: string;
}

interface UserProps {
  id: string;
  name: string;
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
        setData(res?.data?.data?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const getVerif = (id: string) => {
    axios
      .put(
        `/api/request-file/status/${id}`,
        {
          status: 2,
          return_description: null,
          return_date: null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Berhasil Memverifikasi Data");
        getData();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const getDetailVerif = (id: string) => {
    Cookie.set("id", id);

    navigate(`/detail-request-data/${id}`);
  };

  // const getDetailData = (id: string) => {
  //   Cookie.set("id", id);

  //   navigate(`/detail-request/${id}`);
  // };

  const confirmStatus = (id: string) => {
    axios
      .put(
        `/api/request-file/status/${id}`,
        {
          status: 4,
          return_description: null,
          return_date: null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Berhasil Memverifikasi Data");
        getData();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

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
                  <td>File Name</td>
                  <td>Nama Pemohon</td>
                  {role !== "verifier I" ? <td>Nama Petugas</td> : null}
                  <td>Total Ternak</td>
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
                      <RequestComp
                        id={item?.id}
                        index={index}
                        file_name={item?.file_name}
                        user_name={item?.user?.name}
                        officer_name={item?.officer?.name}
                        total_livestock={item?.total_livestock}
                        status={item?.status}
                        request={item?.request}
                        getDetailVerif={() => getDetailVerif(item?.id)}
                        getVerif={() => getVerif(item?.id)}
                        confirmStatus={() => confirmStatus(item?.id)}
                      />
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
