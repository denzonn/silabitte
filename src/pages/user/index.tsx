import { useFormik } from "formik";
import Breadcrumb from "../../component/Breadcrumb";
import Button from "../../component/Button";
import Popup from "../../component/Popup";
import Sidebar from "../../component/Sidebar";
import { useEffect, useState } from "react";
import Input from "../../component/Input";
import axios from "axios";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import { validateUser } from "../../validation/auth";
import { useNavigate } from "react-router-dom";

interface UserProps {
  id: string
  name?: string;
  email?: string;
  role?: string;
  is_active?: string;
  length?: string
}

const User = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<UserProps[]>();
  const token = Cookie.get("token");
  const role = Cookie.get("role");
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>();

  const navigate = useNavigate();

  const [add, setAdd] = useState<boolean>(false);

  const getData = () => {
    axios
      .get(`/api/user?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res?.data?.data?.data);
        setLastPage(res?.data?.data?.last_page);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      address: "",
      phone_number: "",
      is_active: true
    },
    validationSchema: validateUser,
    onSubmit: (values) => {
      axios
        .post("/api/user", values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Menambahkan User");

          setAdd(false);
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
  }, [page]);

  const getDestroy = (id: string) => {
    toast.promise(
      axios
        .delete(`/api/user/${id}`, {
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
        success: "Berhasil Menghapus User...",
        error: (error) => {
          return toast.error(error.message);
        },
      }
    );
  };

  const nextPage = () => {
    if (lastPage !== page) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

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
        <Breadcrumb pages="Data User" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-5 pt-5 text-[#344767] font-semibold">
            Data User Table
          </div>
          <div className="flex flex-row justify-between px-10 my-3">
            <div>
              <Button
                label="Tambah User"
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
                  <td>Email</td>
                  <td>Role</td>
                  <td>Is Active</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {data && data?.length > 0 ? (
                  data?.map((item: UserProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.name}</td>
                        <td>{item?.email}</td>
                        <td>{item?.role}</td>
                        <td>{item?.is_active === '1' ? 'Aktif' : 'Non Aktif'}</td>
                        <td>
                          <i className="fa-solid fa-trash cursor-pointer ml-2" onClick={() => getDestroy(item?.id)}></i>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="border-b-gray-200">
                    <td colSpan={6} className="text-center">
                      Tidak ada User
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex flex-row gap-x-3 w-full justify-end mt-3">
              <Button
                label="Prev"
                className={`px-6 bg-gray-400 hover:bg-gray-300 ${
                  page === 1 ? "cursor-not-allowed" : ""
                }`}
                other
                onClick={() => prevPage()}
              />
              <Button
                label="Next"
                className={`px-6 ${
                  page === lastPage ? "bg-gray-400 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
              />
            </div>
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
                  Tambahkan User
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className=" grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Name"
                        placeholder="Masukkan Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.name}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Email"
                        type="Email"
                        placeholder="Masukkan Email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className=" grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Alamat"
                        placeholder="Masukkan Alamat"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.address && formik.errors.address ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.address}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="No HP"
                        placeholder="Masukkan No HP"
                        name="phone_number"
                        value={formik.values.phone_number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.phone_number && formik.errors.phone_number ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.phone_number}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Password"
                        type="password"
                        placeholder="Masukkan Password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Role
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-0 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="role"
                        onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Role
                        </option>
                        <option value="verifier I">Verifikator 1</option>
                        <option value="official">Tim Penilai</option>
                        <option value="verifier II">Verifikator 2</option>
                        <option value="leader">Pimpinan</option>
                      </select>
                      {formik.touched.role && formik.errors.role ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.role}
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
    </section>
  );
};

export default User;
