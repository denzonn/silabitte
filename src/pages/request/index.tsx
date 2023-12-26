import { useEffect, useState } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import Sidebar from "../../component/Sidebar";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Popup from "../../component/Popup";
import Button from "../../component/Button";
import Input from "../../component/Input";
import { useFormik } from "formik";
import { validateStatus } from "../../validation/auth";

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
  const [detailData, setDetailData] = useState<RequestProps>();
  const token = Cookie.get("token");
  const role = Cookie.get("role");
  const [statusId, setStatusId] = useState<string>();

  const [detail, setDetail] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [statusCancel, setStatusCancel] = useState<boolean>(false);

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

  const getDetailData = (id: string) => {
    setDetail(!detail);

    axios
      .get(`/api/request/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDetailData(res?.data?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const setVerif = (id: string) => {
    setStatus(!status);

    setStatusId(id);

    axios
      .get(`/api/request/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDetailData(res?.data?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const getStatusVerif1 = () => {
    axios
      .put(
        `/api/request/status/${statusId}`,
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
        toast.success("Berhasil Mengupdate Status");
        getData();
        setStatus(false);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const getStatusVerif2 = () => {
    axios
      .put(
        `/api/request/status/${statusId}`,
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
        toast.success("Berhasil Mengupdate Status");
        getData();
        setStatus(false);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      status: 0,
      return_description: "",
    },
    validationSchema: validateStatus,
    onSubmit: (values) => {
      axios
        .put(`/api/request/status/${statusId}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Mengupdate Status");
          setStatusCancel(false);
          setStatus(false);
          getData();
          formik.resetForm();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
  });

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
                            <i
                              className="fa-solid fa-circle-check ml-2"
                              onClick={() => setVerif(item?.id)}
                            ></i>
                          ) : null}
                          {role === "admin" || role === "leader" ? (
                            <i
                              className="fa-solid fa-eye cursor-pointer ml-2"
                              onClick={() => getDetailData(item?.id)}
                            ></i>
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
        {detail && (
          <Popup
            onConfirm={() => {
              setDetail(false);
            }}
          >
            <div className="relative w-[60vw] max-h-full">
              <div className="relative w-full bg-white rounded-lg shadow">
                <div className="px-6 py-6 lg:px-8">
                  <div className="mb-4 text-xl text-center font-bold text-black">
                    Detail Permohonan -{" "}
                    {detailData?.type_live_stock?.type.toUpperCase()}
                    <span className="text-gray-400 font-light text-sm">
                      {" "}
                      ( {detailData?.identification_number} )
                    </span>{" "}
                    -{" "}
                    <span>
                      {detailData?.status == "1"
                        ? "Verifikator 1"
                        : detailData?.status == "2"
                        ? "Petugas"
                        : detailData?.status == "3"
                        ? "Verifikator 2"
                        : detailData?.status == "4"
                        ? "Pimpinan"
                        : detailData?.status == "0"
                        ? "Ditolak"
                        : "Permohonan Diterima"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-5 items-center">
                    <div>
                      <div className="text-lg">Identitas Pemilik</div>
                      <div className="text-gray-600 font-light">
                        <div>Nama Pemilik : {detailData?.user?.name}</div>
                        <div>No Hp : {detailData?.user?.phone_number}</div>
                        <div>Alamat : {detailData?.user?.address}</div>
                      </div>
                    </div>
                    <div>
                      <img
                        src={detailData?.result?.image}
                        alt=""
                        className="h-40"
                      />
                    </div>
                  </div>

                  <div className="text-lg">Identitas Ternak</div>
                  <div className="text-gray-600 font-light">
                    <div className="grid grid-cols-3 gap-x-5">
                      <div>No Straw : {detailData?.straw_number}</div>
                      <div>No Bapak : {detailData?.father_number}</div>
                      <div>No Induk : {detailData?.mother_number}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-5">
                      <div>Umur : {detailData?.age} bulan</div>
                      <div>
                        No Sertifikat : {detailData?.certificate_number}
                      </div>
                      <div>
                        Kode Data Menpan : {detailData?.menpan_data_code}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-5">
                      <div>Jenis Kelamin : {detailData?.livestock_gender}</div>
                      <div>
                        Kesehatan Ternak : {detailData?.livestock_health}
                      </div>
                      <div>
                        Reproduksi Ternak : {detailData?.livestock_reproduction}
                      </div>
                    </div>
                  </div>

                  {detailData?.result !== null ? (
                    <div>
                      <div className="text-lg mt-3">Hasil Pengukuran</div>
                      <div className="text-gray-600 font-light">
                        <div>Informasi : {detailData?.result?.information}</div>
                        {detailData &&
                          detailData?.result?.result_detail.map(
                            (item, index: number) => {
                              return (
                                <div className="grid grid-cols-2 gap-x-5">
                                  <div>
                                    Indikator : {item?.indicator?.indicator}
                                  </div>
                                  <div>Hasil :{item?.results}</div>
                                </div>
                              );
                            }
                          )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Popup>
        )}
        {status && (
          <Popup
            onConfirm={() => {
              setStatus(false);
            }}
          >
            <div
              className={
                role === "verifier II"
                  ? `relative w-[80vw] max-h-full`
                  : `relative w-[60vw] max-h-full`
              }
            >
              <div className="relative w-full bg-white rounded-lg shadow">
                <div className="px-6 py-6 lg:px-8">
                  <div className="mb-4 text-xl text-center font-bold text-black">
                    Detail Permohonan -{" "}
                    {detailData?.type_live_stock?.type.toUpperCase()}
                    <span className="text-gray-400 font-light text-sm">
                      {" "}
                      ( {detailData?.identification_number} )
                    </span>{" "}
                    -{" "}
                    <span>
                      {detailData?.status == "1"
                        ? "Verifikator 1"
                        : detailData?.status == "2"
                        ? "Petugas"
                        : detailData?.status == "3"
                        ? "Verifikator 2"
                        : detailData?.status == "4"
                        ? "Pimpinan"
                        : detailData?.status == "0"
                        ? "Ditolak"
                        : "Permohonan Diterima"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-5 items-center">
                    <div>
                      <div className="text-lg">Identitas Pemilik</div>
                      <div className="text-gray-600 font-light">
                        <div>Nama Pemilik : {detailData?.user?.name}</div>
                        <div>No Hp : {detailData?.user?.phone_number}</div>
                        <div>Alamat : {detailData?.user?.address}</div>
                      </div>
                    </div>
                    <div>
                      <img
                        src={detailData?.result?.image}
                        alt=""
                        className="h-40"
                      />
                    </div>
                  </div>

                  <div className="text-lg">Identitas Ternak</div>
                  <div className="text-gray-600 font-light">
                    <div className="grid grid-cols-3 gap-x-5">
                      <div>No Straw : {detailData?.straw_number}</div>
                      <div>No Bapak : {detailData?.father_number}</div>
                      <div>No Induk : {detailData?.mother_number}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-5">
                      <div>Umur : {detailData?.age} bulan</div>
                      <div>
                        No Sertifikat : {detailData?.certificate_number}
                      </div>
                      <div>
                        Kode Data Menpan : {detailData?.menpan_data_code}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-5">
                      <div>Jenis Kelamin : {detailData?.livestock_gender}</div>
                      <div>
                        Kesehatan Ternak : {detailData?.livestock_health}
                      </div>
                      <div>
                        Reproduksi Ternak : {detailData?.livestock_reproduction}
                      </div>
                    </div>
                  </div>

                  {role === "verifier II" ? (
                    <div>
                      <div className="text-lg mt-3">Hasil Pengukuran</div>
                      <div className="text-gray-600 font-light">
                        <div>Informasi : {detailData?.result?.information}</div>
                        {detailData &&
                          detailData?.result?.result_detail.map(
                            (item, index: number) => {
                              return (
                                <div className="grid grid-cols-2 gap-x-5">
                                  <div>
                                    Indikator : {item?.indicator?.indicator}
                                  </div>
                                  <div>Hasil :{item?.results}</div>
                                </div>
                              );
                            }
                          )}
                      </div>
                    </div>
                  ) : null}
                  <div className="mb-4 mt-4 text-xl text-center font-bold text-black">
                    Apakah data sudah benar ?
                  </div>
                  <div className="grid grid-cols-2 gap-x-5">
                    <Button
                      label="Tolak"
                      className="w-full bg-gray-300 hover:bg-gray-200"
                      onClick={() => setStatusCancel(!statusCancel)}
                    />
                    {role === "verifier I" ? (
                      <Button
                        label="Benar"
                        className="w-full"
                        onClick={() => getStatusVerif1()}
                      />
                    ) : role === "verifier II" ? (
                      <Button
                        label="Benar"
                        className="w-full"
                        onClick={() => getStatusVerif2()}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        )}
        {statusCancel && (
          <Popup
            onConfirm={() => {
              setStatusCancel(false);
            }}
          >
            <div className="relative w-[30vw] max-h-full">
              <div className="relative w-full bg-white rounded-lg shadow">
                <div className="px-6 py-6 lg:px-8">
                  <div className="mb-4 text-xl text-center font-bold text-black">
                    Alasan Penolakan ?
                  </div>
                  <form onSubmit={formik.handleSubmit}>
                    <Input
                      placeholder="Alasan Menolak"
                      name="return_description"
                      value={formik.values.return_description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <div className="grid grid-cols-2 gap-x-5">
                      <Button label="Kirim" className="w-full " type="submit" />
                      <Button
                        label="Kembali"
                        className="w-full bg-gray-300 hover:bg-gray-200"
                        onClick={() => setStatusCancel(false)}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Popup>
        )}
      </main>
    </section>
  );
};

export default Request;
