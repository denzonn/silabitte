import { useEffect, useState } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import Button from "../../component/Button";
import Input from "../../component/Input";
import Popup from "../../component/Popup";
import Sidebar from "../../component/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { validateType } from "../../validation/auth";

interface TypeProps {
  type?: string;
  certificate_color?: string;
}

const Type = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<TypeProps>();
  const token = Cookie.get("token");
  const role = Cookie.get("role");
  const [id, setId] = useState<number>(0);

  const navigate = useNavigate();

  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const getData = () => {
    axios
      .get("/api/type-livestock", {
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

  const handleChangeCertificateColor = (event) => {
    formik.setFieldValue("certificate_color", event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      type: "",
      certificate_color: "",
    },
    validationSchema: validateType,
    onSubmit: (values) => {
      axios
        .post("/api/type-livestock", values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Menambahkan Tipe Ternak");
          setAdd(false);
          getData();
          formik.resetForm();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
  });
  
  const getEditData = (id: string) => {
    axios
      .get(`/api/type-livestock/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEdit(!edit);
        setId(res?.data?.data?.id);
        initializeFormik(res?.data?.data);
      });
  };

  const initializeFormik = (data: any) => {
    editFormik.setValues({
      type: data?.type || "",
      certificate_color: data?.certificate_color || "",
    });
  };


  const handleEditChangeCertificateColor = (event) => {
    editFormik.setFieldValue("certificate_color", event.target.value);
  };

  const editFormik = useFormik({
    initialValues: {
      type: "",
      certificate_color: "",
    },
    validationSchema: validateType,
    onSubmit: (values) => {
      axios
        .put(`/api/type-livestock/${id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Mengupdate Tipe Ternak");
          setEdit(false);
          getData();
          editFormik.resetForm();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
  });

  const getDestroy = (id: string) => {
    toast.promise(
      axios
        .delete(`/api/type-livestock/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          getData();
        })
        .catch((err) => {
          throw new Error(err.message);
        }),
      {
        loading: "Menghapus...",
        success: "Berhasil Menghapus Tipe Ternak...",
        error: (error) => {
          toast.error(error.message);
        },
      }
    );
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

    if (role !== 'admin') {
      navigate("/dashboard");
    }
  }, [token, navigate, role]);

  return (
    <section>
      <div className="bg-primary w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 z-10 relative">
        <Breadcrumb pages="Data Jenis Ternak" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-5 pt-5 text-[#344767] font-semibold">
            Data Jenis Ternak Table
          </div>
          <div className="flex flex-row justify-between px-10 my-3">
            <div>
              <Button
                label="Tambah Jenis Ternak"
                className="text-sm"
                onClick={() => setAdd(!add)}
              />
            </div>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>Nama</td>
                  <td>Warna Setifikat</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.length > 0 ? (
                  data?.map((item: TypeProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.type?.toLocaleUpperCase()}</td>
                        <td>
                          <div className={`w-6 h-6 bg-[${item?.certificate_color}] rounded-full`}></div>
                        </td>
                        <td>
                          <i className="fa-solid fa-pen-to-square cursor-pointer ml-2" onClick={() => getEditData(item?.id)}></i>
                          <i className="fa-solid fa-trash cursor-pointer ml-2" onClick={() => getDestroy(item?.id)}></i>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="border-b-gray-200">
                    <td colSpan={4} className="text-center">
                      Tidak ada Jenis Ternak
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {add && (
        <Popup
          onConfirm={() => {
            setAdd(false);
          }}
        >
          <div className="relative w-[60vw] max-h-full">
            <div className="relative w-full bg-white rounded-lg shadow">
              <div className="px-6 py-6 lg:px-8">
                <div className="mb-4 text-xl text-center font-bold text-black">
                  Tambahkan Jenis Ternak
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className=" grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Name"
                        placeholder="Masukkan Name Tipe Ternak"
                        name="type"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.type && formik.errors.type ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.type}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label className={`text-[#697a8d] text-sm mb-1`}>
                        Warna Sertifikat
                      </label>
                      <div className="flex flex-row gap-x-5 mt-2">
                        <div className="flex flex-col items-center">
                          <input
                            type="radio"
                            name="certificate_color"
                            value="#82b7f4"
                            className="radio h-5 w-5 checked:bg-[#82b7f4] checked:shadow-none shadow-none checked:border-none border-[#dee3e8]"
                            checked={
                              formik.values.certificate_color === "#82b7f4"
                            }
                            onChange={handleChangeCertificateColor}
                          />
                          <label className={`text-[#697a8d] text-xs mb-1`}>
                            Biru Muda
                          </label>
                        </div>
                        <div className="flex flex-col items-center">
                          <input
                            type="radio"
                            name="certificate_color"
                            value="#fffdd0"
                            className="radio h-5 w-5 checked:bg-[#fffdd0] checked:shadow-none shadow-none checked:border-none border-[#dee3e8]"
                            checked={
                              formik.values.certificate_color === "#fffdd0"
                            }
                            onChange={handleChangeCertificateColor}
                          />
                          <label className={`text-[#697a8d] text-xs mb-1`}>
                            Krem
                          </label>
                        </div>
                        <div className="flex flex-col items-center">
                          <input
                            type="radio"
                            name="certificate_color"
                            value="#68e773"
                            className="radio h-5 w-5 checked:bg-[#68e773] checked:shadow-none shadow-none checked:border-none border-[#dee3e8]"
                            checked={
                              formik.values.certificate_color === "#68e773"
                            }
                            onChange={handleChangeCertificateColor}
                          />
                          <label className={`text-[#697a8d] text-xs mb-1`}>
                            Hijau Muda
                          </label>
                        </div>
                        <div className="flex flex-col items-center">
                          <input
                            type="radio"
                            name="certificate_color"
                            value="#ffffff"
                            className="radio h-5 w-5 checked:bg-[#ffffff] checked:shadow-none shadow-none checked:border-none border-[#dee3e8]"
                            checked={
                              formik.values.certificate_color === "#ffffff"
                            }
                            onChange={handleChangeCertificateColor}
                          />
                          <label className={`text-[#697a8d] text-xs mb-1`}>
                            Putih
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Button
                      label="Tambah Data"
                      className="w-full mt-4"
                      type="submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Popup>
      )}
      {edit && (
        <Popup
          onConfirm={() => {
            setEdit(false);
          }}
        >
          <div className="relative w-[60vw] max-h-full">
            <div className="relative w-full bg-white rounded-lg shadow">
              <div className="px-6 py-6 lg:px-8">
                <div className="mb-4 text-xl text-center font-bold text-black">
                  Edit Jenis Ternak
                </div>
                <form onSubmit={editFormik.handleSubmit}>
                  <div className=" grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Name"
                        placeholder="Masukkan Name Tipe Ternak"
                        name="type"
                        value={editFormik.values.type}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.type && editFormik.errors.type ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.type}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label className={`text-[#697a8d] text-sm mb-1`}>
                        Warna Sertifikat
                      </label>
                      <div className="flex flex-row gap-x-5 mt-2">
                        <div className="flex flex-col items-center">
                          <input
                            type="radio"
                            name="certificate_color"
                            value="#82b7f4"
                            className="radio h-5 w-5 checked:bg-[#82b7f4] checked:shadow-none shadow-none checked:border-none border-[#dee3e8]"
                            checked={
                              editFormik.values.certificate_color === "#82b7f4"
                            }
                            onChange={handleEditChangeCertificateColor}
                          />
                          <label className={`text-[#697a8d] text-xs mb-1`}>
                            Biru Muda
                          </label>
                        </div>
                        <div className="flex flex-col items-center">
                          <input
                            type="radio"
                            name="certificate_color"
                            value="#fffdd0"
                            className="radio h-5 w-5 checked:bg-[#fffdd0] checked:shadow-none shadow-none checked:border-none border-[#dee3e8]"
                            checked={
                              editFormik.values.certificate_color === "#fffdd0"
                            }
                            onChange={handleEditChangeCertificateColor}
                          />
                          <label className={`text-[#697a8d] text-xs mb-1`}>
                            Krem
                          </label>
                        </div>
                        <div className="flex flex-col items-center">
                          <input
                            type="radio"
                            name="certificate_color"
                            value="#68e773"
                            className="radio h-5 w-5 checked:bg-[#68e773] checked:shadow-none shadow-none checked:border-none border-[#dee3e8]"
                            checked={
                              editFormik.values.certificate_color === "#68e773"
                            }
                            onChange={handleEditChangeCertificateColor}
                          />
                          <label className={`text-[#697a8d] text-xs mb-1`}>
                            Hijau Muda
                          </label>
                        </div>
                        <div className="flex flex-col items-center">
                          <input
                            type="radio"
                            name="certificate_color"
                            value="#ffffff"
                            className="radio h-5 w-5 checked:bg-[#ffffff] checked:shadow-none shadow-none checked:border-none border-[#dee3e8]"
                            checked={
                              editFormik.values.certificate_color === "#ffffff"
                            }
                            onChange={handleEditChangeCertificateColor}
                          />
                          <label className={`text-[#697a8d] text-xs mb-1`}>
                            Putih
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Button
                      label="Tambah Data"
                      className="w-full mt-4"
                      type="submit"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </section>
  );
};

export default Type;
