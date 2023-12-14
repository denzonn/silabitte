import { useState } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import Button from "../../component/Button";
import Input from "../../component/Input";
import Popup from "../../component/Popup";
import Sidebar from "../../component/Sidebar";

const Type = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

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
                <tr className="border-b-gray-200">
                  <td>1</td>
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
                  Tambahkan Jenis Ternak
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
                      <label className={`text-[#697a8d] text-sm mb-1`}>
                        Warna Sertifikat
                      </label>
                      <div className="flex flex-row gap-x-5 mt-2">
                        <div className="flex flex-col items-center">
                          <input
                            type="radio"
                            name="radio-1"
                            className="radio h-5 w-5 checked:bg-[#82b7f4] checked:shadow-none shadow-none checked:border-none border-[#dee3e8]"
                            checked
                          />
                          <label className={`text-[#697a8d] text-xs mb-1`}>
                            Biru Muda
                          </label>
                        </div>
                        <div className="flex flex-col items-center">
                          <input
                            type="radio"
                            name="radio-1"
                            className="radio h-5 w-5 checked:bg-[#fffdd0] checked:shadow-none shadow-none checked:border-none border-[#dee3e8]"
                          />
                          <label className={`text-[#697a8d] text-xs mb-1`}>
                            Krem
                          </label>
                        </div>
                        <div className="flex flex-col items-center">
                          <input
                            type="radio"
                            name="radio-1"
                            className="radio h-5 w-5 checked:bg-[#68e773] checked:shadow-none shadow-none checked:border-none border-[#dee3e8]"
                          />
                          <label className={`text-[#697a8d] text-xs mb-1`}>
                            Hijau Muda
                          </label>
                        </div>
                        <div className="flex flex-col items-center">
                          <input
                            type="radio"
                            name="radio-1"
                            className="radio h-5 w-5 checked:bg-[#ffffff] checked:shadow-none shadow-none checked:border-none border-[#dee3e8]"
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
