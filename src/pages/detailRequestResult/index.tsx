import { useEffect, useState } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import Sidebar from "../../component/Sidebar";
import Cookie from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../../component/Button";
import Popup from "../../component/Popup";
import { useFormik } from "formik";
import { validateRequestDetail } from "../../validation/auth";
import Input from "../../component/Input";

interface RequestProps {
  id: string;
  livestock_gender?: string;
  identification_number?: string;
  straw_number?: string;
  father_number?: string;
  mother_number?: string;
  pure_lineage?: string;
  livestock_health?: string;
  livestock_reproduction?: string;
  age?: string;
  menpan_data_code?: string;
  status?: string;
  return_date?: string;
  return_description?: string;
  type_live_stock?: TypeLiveStockProps;
  user?: UserProps;
  result?: ResultProps;
  type_livestock_id?: string;
}

type TypeLiveStockProps = {
  id?: string;
  type?: string;
};

type UserProps = {
  id?: string;
  name?: string;
};

interface ResultProps {
  id?: string;
  information?: string;
  image?: string;
  result_detail?: ResultDetailProps;
}

type ResultDetailProps = {
  id?: string;
  results?: string;
  indicator?: IndicatorProps;
};

type IndicatorProps = {
  id?: string;
  indicator?: string;
  unit?: string;
};

const DetailRequestResult = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<RequestProps>();
  const token = Cookie.get("token");
  const role = Cookie.get("role");
  const id = Cookie.get("id");
  const id_data = Cookie.get("id_data");
  const [isConfirm, setIsConfirm] = useState(false);

  const navigate = useNavigate();

  const getData = () => {
    axios
      .get(`/api/request/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const result = res?.data?.data?.request?.find(
          (item: ResultProps) => item.id == id_data
        );
        setData(result);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const verifyData = () => {
    axios
      .put(
        `/api/request/status/${id_data}`,
        {
          status: 5,
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
        toast.success("Ternak Di Verifikasi");

        navigate(`/detail-request-data/${id}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      status: 0,
      return_description: "",
    },
    validationSchema: validateRequestDetail,
    onSubmit: (values) => {
      axios
        .put(`/api/request/status/${id_data}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Ternak Di Verifikasi");

          setIsConfirm(false);
          navigate(`/detail-request-data/${id}`);
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
          <div className="px-10 mt-5 py-5 text-[#344767]  ">
            <div className="flex flex-row gap-x-3 items-center">
              <div>
                <Link to={`/detail-request-data/${id}`}>
                  <i className="fa-solid fa-circle-left"></i>
                </Link>
              </div>
              <div className="font-semibold text-xl">Data Permohonan</div>
            </div>
            <div className="mt-4 mb-2">Detail Ternak</div>
            <div className="grid grid-cols-3 gap-x-4 leading-7">
              <div>Jenis Ternak : {data?.type_live_stock?.type}</div>
              <div>No Identitas : {data?.identification_number}</div>
              <div>Rumpun Murni : {data?.pure_lineage}</div>
            </div>
            <div className="grid grid-cols-3 gap-x-4 leading-7">
              <div>Umur : {data?.age} bulan</div>
              <div>Jenis Kelamin : {data?.livestock_gender}</div>
              <div>Kesehatan Ternak : {data?.livestock_health}</div>
            </div>
            <div className="grid grid-cols-3 gap-x-4 leading-7">
              <div>
                No Ayah :{" "}
                {data?.father_number === null
                  ? "Tidak ada"
                  : data?.father_number}
              </div>
              <div>
                No Induk :{" "}
                {data?.mother_number === null
                  ? "Tidak ada"
                  : data?.mother_number}
              </div>
              <div>Kode Mempan : {data?.menpan_data_code}</div>
            </div>
            <div className="mt-4 mb-2">Detail Pengukuran</div>
            <div className="grid grid-cols-3 gap-x-4">
              <div className="col-span-1">
                {data?.type_livestock_id !== "2" ? (
                  <div className="relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">
                      Tidak ada Foto
                    </div>
                    <img
                      src=""
                      alt=""
                      className="bg-gray-200 h-56 w-full object-cover rounded-md border-none outline-none"
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      src={data?.result?.image}
                      alt="h-56 w-full object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <div className="col-span-2">
                {data?.result?.result_detail &&
                  data?.result?.result_detail?.map(
                    (item: ResultDetailProps, index: number) => {
                      return (
                        <div
                          key={index}
                          className="grid grid-cols-2 gap-x-4 leading-7"
                        >
                          <div key={index}>{item?.indicator?.indicator}</div>
                          <div key={index}>
                            : {item?.results} {item?.indicator?.unit}
                          </div>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
            {data?.status === "3" && role === "verifier II" ? (
              <div className="flex flex-row gap-x-4 justify-end">
                <Button
                  label="Terima"
                  className="mt-2"
                  onClick={() => verifyData()}
                />
                <Button
                  label="Tolak"
                  className="mt-2 bg-red-500 hover:bg-red-400"
                  onClick={() => setIsConfirm(!isConfirm)}
                />
              </div>
            ) : null}
          </div>
        </div>
      </main>
      {isConfirm ? (
        <Popup onConfirm={() => setIsConfirm(false)}>
          <div className="relative w-[60vw] max-h-full">
            <div className="relative w-full bg-white rounded-lg shadow">
              <div className="px-6 py-6 lg:px-8">
                <form
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className="mb-4 text-xl text-center font-bold text-black">
                    Alasan Menolak
                  </div>
                  <div>
                    <Input
                      admin
                      placeholder="Masukkan Alasan Menolak"
                      name="return_description"
                      value={formik.values.return_description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.return_description &&
                    formik.errors.return_description ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.return_description}
                      </div>
                    ) : null}
                    <div className="flex flex-row gap-x-4 w-full justify-end">
                      <Button label="Kirim" type="submit" />
                      <Button
                        label="Kembali"
                        className="bg-red-500 hover:bg-red-400"
                        onClick={() => setIsConfirm(false)}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Popup>
      ) : null}
    </section>
  );
};

export default DetailRequestResult;
