import { useEffect, useState } from "react";
import Button from "../../component/Button";
import Input from "../../component/Input";
import Popup from "../../component/Popup";
import Sidebar from "../../component/Sidebar";
import Breadcrumb from "../../component/Breadcrumb";
import axios from "axios";
import Cookie from "js-cookie";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { validateIndicator } from "../../validation/auth";
import { useNavigate } from "react-router-dom";

interface IndicatorProps {
  indicator?: string;
  unit?: string;
  gender?: string;
  from_age?: string;
  to_age?: string;
  limit_grade_1?: string;
  limit_grade_2?: string;
  limit_grade_3?: string;
  type_livestock_id?: string;
}

const Indicator = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<IndicatorProps>();
  const token = Cookie.get("token");
  const [id, setId] = useState<number>(0);
  const [dataEdit, setDataEdit] = useState<IndicatorProps>();

  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const [livestock_type, setLivestock_type] = useState<any>();

  const navigate = useNavigate()
  
  const getType = () => {
    axios
      .get("/api/type-livestock", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLivestock_type(res?.data?.data?.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const getData = () => {
    axios
      .get("/api/indicator", {
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

  const formik = useFormik({
    initialValues: {
      indicator: "",
      unit: "",
      gender: "",
      from_age: "",
      to_age: "",
      limit_grade_1: "",
      limit_grade_2: "",
      limit_grade_3: "",
      type_livestock_id: "",
    },
    validationSchema: validateIndicator,
    onSubmit: (values) => {
      axios
        .post("/api/indicator", values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Menambahkan Indikator");
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
      .get(`/api/indicator/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEdit(!edit);
        setId(res?.data?.data?.id);
        setDataEdit(res?.data?.data);
        initializeFormik(res?.data?.data);
      });
  };

  const initializeFormik = (data: any) => {
    editFormik.setValues({
      indicator: data?.indicator || "",
      unit: data?.unit || "",
      gender: data?.gender || "",
      from_age: data?.from_age || "",
      to_age: data?.to_age || "",
      limit_grade_1: data?.limit_grade_1 || "",
      limit_grade_2: data?.limit_grade_2 || "",
      limit_grade_3: data?.limit_grade_3 || "",
      type_livestock_id: data?.type_livestock_id || "",
    });
  };

  const editFormik = useFormik({
    initialValues: {
      indicator: "",
      unit: "",
      gender: "",
      from_age: "",
      to_age: "",
      limit_grade_1: "",
      limit_grade_2: "",
      limit_grade_3: "",
      type_livestock_id: "",
    },
    validationSchema: validateIndicator,
    onSubmit: (values) => {
      axios
        .put(`/api/indicator/${id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Mengupdate Indikator");
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
        .delete(`/api/indicator/${id}`, {
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
        success: "Berhasil Menghapus Indikator...",
        error: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  useEffect(() => {
    getType();
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
        <Breadcrumb pages="Data Indikator" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-5 pt-5 text-[#344767] font-semibold">
            Data Indikator Table
          </div>
          <div className="flex flex-row justify-between px-10 my-3">
            <div>
              <Button
                label="Tambah Indikator"
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
                  <td>Indikator</td>
                  <td>Jenis Ternak</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data?.length > 0 ? (
                  data?.map((item: IndicatorProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.indicator}</td>
                        <td>{item?.type_live_stock?.type}</td>
                        <td>
                          <i
                            className="fa-solid fa-pen-to-square cursor-pointer ml-2"
                            onClick={() => getEditData(item?.id)}
                          ></i>
                          <i className="fa-solid fa-trash cursor-pointer ml-2" onClick={() => getDestroy(item?.id)}></i>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="border-b-gray-200">
                    <td colSpan={6} className="text-center">
                      Tidak ada Indikator
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
                  Tambahkan Indikator
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className=" grid grid-cols-2 gap-x-5">
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Jenis Ternak
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-0 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="type_livestock_id"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Jenis Ternak
                        </option>
                        {livestock_type?.map((item, index) => {
                          return (
                            <option value={item?.id}>
                              {item?.type?.toLocaleUpperCase()}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <Input
                        admin
                        label="Indikator"
                        placeholder="Masukkan Indikator"
                        name="indicator"
                        value={formik.values.indicator}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.indicator && formik.errors.indicator ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.indicator}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Satuan"
                        placeholder="Masukkan Satuan"
                        name="unit"
                        value={formik.values.unit}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.unit && formik.errors.unit ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.unit}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Jenis Kelamin
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-0 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="gender"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Jenis Kelamin
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Dari Umur"
                        placeholder="Masukkan Dari Umur"
                        name="from_age"
                        value={formik.values.from_age}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.from_age && formik.errors.from_age ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.from_age}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Sampai Umur"
                        placeholder="Masukkan Sampai Umur"
                        name="to_age"
                        value={formik.values.to_age}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.to_age && formik.errors.to_age ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.to_age}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Grade 1"
                        placeholder="Masukkan Grade 1"
                        name="limit_grade_1"
                        value={formik.values.limit_grade_1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.limit_grade_1 &&
                      formik.errors.limit_grade_1 ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.limit_grade_1}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Grade 2"
                        placeholder="Masukkan Grade 2"
                        name="limit_grade_2"
                        value={formik.values.limit_grade_2}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.limit_grade_2 &&
                      formik.errors.limit_grade_2 ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.limit_grade_2}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Grade 3"
                        placeholder="Masukkan Grade 3"
                        name="limit_grade_3"
                        value={formik.values.limit_grade_3}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.limit_grade_3 &&
                      formik.errors.limit_grade_3 ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.limit_grade_3}
                        </div>
                      ) : null}
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
                  Edit Indikator
                </div>
                <form onSubmit={editFormik.handleSubmit}>
                  <div className=" grid grid-cols-2 gap-x-5">
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Jenis Ternak
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-0 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="type_livestock_id"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Jenis Ternak
                        </option>
                        {livestock_type?.map((item, index) => {
                          return (
                            <option
                              value={item?.id}
                              selected={item?.id == dataEdit?.type_livestock_id}
                            >
                              {item?.type?.toLocaleUpperCase()}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <Input
                        admin
                        label="Indikator"
                        placeholder="Masukkan Indikator"
                        name="indicator"
                        value={editFormik.values.indicator}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.indicator &&
                      editFormik.errors.indicator ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.indicator}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Satuan"
                        placeholder="Masukkan Satuan"
                        name="unit"
                        value={editFormik.values.unit}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.unit && editFormik.errors.unit ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.unit}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Jenis Kelamin
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-0 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="gender"
                        onChange={editFormik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Jenis Kelamin
                        </option>
                        <option value="Male" selected={dataEdit?.gender === 'Male'}>Male</option>
                        <option value="Female" selected={dataEdit?.gender === 'Female'}>Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Dari Umur"
                        placeholder="Masukkan Dari Umur"
                        name="from_age"
                        value={editFormik.values.from_age}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.from_age &&
                      editFormik.errors.from_age ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.from_age}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Sampai Umur"
                        placeholder="Masukkan Sampai Umur"
                        name="to_age"
                        value={editFormik.values.to_age}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.to_age && editFormik.errors.to_age ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.to_age}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Grade 1"
                        placeholder="Masukkan Grade 1"
                        name="limit_grade_1"
                        value={editFormik.values.limit_grade_1}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.limit_grade_1 &&
                      editFormik.errors.limit_grade_1 ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.limit_grade_1}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Grade 2"
                        placeholder="Masukkan Grade 2"
                        name="limit_grade_2"
                        value={editFormik.values.limit_grade_2}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.limit_grade_2 &&
                      editFormik.errors.limit_grade_2 ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.limit_grade_2}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Grade 3"
                        placeholder="Masukkan Grade 3"
                        name="limit_grade_3"
                        value={editFormik.values.limit_grade_3}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.limit_grade_3 &&
                      editFormik.errors.limit_grade_3 ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.limit_grade_3}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="py-2">
                    <Button
                      label="Edit Data"
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

export default Indicator;
