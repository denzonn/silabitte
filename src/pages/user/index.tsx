import { useFormik } from "formik";
import Breadcrumb from "../../component/Breadcrumb";
import Button from "../../component/Button";
import Popup from "../../component/Popup";
import Sidebar from "../../component/Sidebar";
import { useState } from "react";
import Input from "../../component/Input";

const User = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  // const formik = useFormik({
  //   initialValues: {
  //     judul: "",
  //     file: null,
  //   },
  //   validationSchema: validateDokument,
  //   onSubmit: (values) => {
  //     const formData = new FormData();
  //     formData.append("judul", values.judul);
  //     formData.append("file", values.file);

  //     axios
  //       .post("dokument", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then(() => {
  //         toast.success("Berhasil Menambahkan Dokument");

  //         setAdd(false);
  //         getData();
  //         formik.resetForm();
  //       })
  //       .catch((err) => {
  //         if (err.response && err.response.data && err.response.data.message) {
  //           toast.error(err.response.data.message);
  //         } else if (
  //           err.response &&
  //           err.response.data &&
  //           err.response.data.errors
  //         ) {
  //           const errorMessages = Object.values(
  //             err.response.data.errors
  //           ).flat();
  //           toast.error(errorMessages.join("\n"));
  //         } else {
  //           // If the error doesn't have the expected structure, display a generic error message
  //           toast.error("An error occurred. Please try again.");
  //         }
  //       });
  //   },
  // });

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
                <tr className="border-b-gray-200">
                  <td>1</td>
                  <td>dasd</td>
                  <td>dasd</td>
                  <td>dasd</td>
                  <td>dasd</td>
                  <td>
                    <i className="fa-solid fa-pen-to-square cursor-pointer"></i>
                    <i className="fa-solid fa-trash cursor-pointer ml-2"></i>
                  </td>
                </tr>
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
                  Tambahkan User
                </div>
                <form
                // onSubmit={formik.handleSubmit}
                >
                  <div className=" grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Name"
                        placeholder="Masukkan Name"
                        name="name"
                        // value={formik.values.judul}
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        required
                      />
                      {/* {formik.touched.judul && formik.errors.judul ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.judul}
                      </div>
                    ) : null} */}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Email"
                        type="Email"
                        placeholder="Masukkan Email"
                        name="email"
                        // value={formik.values.judul}
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        required
                      />
                      {/* {formik.touched.judul && formik.errors.judul ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.judul}
                      </div>
                    ) : null} */}
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
                        // value={formik.values.judul}
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        required
                      />
                      {/* {formik.touched.judul && formik.errors.judul ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.judul}
                      </div>
                    ) : null} */}
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
                        // onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Role
                        </option>
                        <option value="Admin">Admin</option>
                        <option value="Pemohon">Pemohon</option>
                        <option value="Verifikator 1">Verifikator 1</option>
                        <option value="Verifikator 2">Verifikator 2</option>
                        <option value="Petugas">Petugas</option>
                        <option value="Pimpinan">Pimpinan</option>
                      </select>
                      {/* {formik.touched.status && formik.errors.status ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.status}
                      </div>
                    ) : null} */}
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
