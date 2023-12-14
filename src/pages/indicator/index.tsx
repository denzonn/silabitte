import { useState } from "react";
import Button from "../../component/Button";
import Input from "../../component/Input";
import Popup from "../../component/Popup";
import Sidebar from "../../component/Sidebar";
import Breadcrumb from "../../component/Breadcrumb";

const Indicator = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const [type, setType] = useState<string>("");

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
                  <td>Jenis</td>
                  <td>Indikator</td>
                  <td>Satuan</td>
                  <td>Is Active</td>
                  <td>Jenis Kelamin</td>
                  <td>Umur</td>
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
                  Tambahkan Indikator
                </div>
                <form
                // onSubmit={formik.handleSubmit}
                >
                  <div className=" grid grid-cols-2 gap-x-5">
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Jenis Ternak
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-0 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="jenis_ternak"
                        onChange={(e) => setType(e.target.value)}
                        // onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Jenis Ternak
                        </option>
                        <option value="Sapi Potong">Sapi Potong</option>
                        <option value="Sapi Perah">Sapi Perah</option>
                        <option value="Kerbau">Kerbau</option>
                        <option value="Kambing / Domba">Kambing / Domba</option>
                      </select>
                      {/* {formik.touched.status && formik.errors.status ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.status}
                      </div>
                    ) : null} */}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Indikator"
                        placeholder="Masukkan Indikator"
                        name="indicator"
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
                        label="Satuan"
                        placeholder="Masukkan Satuan"
                        name="satuan"
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
                        Is Active
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-0 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="is_active"
                        // onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Is Active
                        </option>
                        <option value="Active">Active</option>
                        <option value="Non Active">Non Active</option>
                      </select>
                      {/* {formik.touched.status && formik.errors.status ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.status}
                      </div>
                    ) : null} */}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-x-5">
                    <div>
                      <label
                        className={`text-[#697a8d] text-sm mb-1 after:content-["*"] after:text-red-600 after:ml-1 `}
                      >
                        Jenis Kelamin
                      </label>
                      <select
                        className="select select-bordered w-full bg-transparent mb-4 mt-0 focus:outline-none text-[#697a8d] max-h-[2.6rem] min-h-[2.6rem]"
                        name="jenis_kelamin"
                        // onChange={formik.handleChange}
                      >
                        <option disabled selected>
                          Pilih Jenis Kelamin
                        </option>
                        <option value="Jantan">Jantan</option>
                        <option value="Betina">Betina</option>
                      </select>
                      {/* {formik.touched.status && formik.errors.status ? (
                      <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                        {formik.errors.status}
                      </div>
                    ) : null} */}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Dari Umur"
                        placeholder="Masukkan Dari Umur"
                        name="dari_umur"
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
                        label="Sampai Umur"
                        placeholder="Masukkan Sampai Umur"
                        name="sampai_umur"
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
                  {type === "Sapi Potong" ? (
                    <div className="grid grid-cols-3 gap-x-5">
                      <div>
                        <Input
                          admin
                          label="Batas Grade 1"
                          placeholder="Masukkan Batas Grade 1"
                          name="grade_1"
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
                          label="Batas Grade 2"
                          placeholder="Masukkan Batas Grade 2"
                          name="grade_2"
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
                          label="Batas Grade 3"
                          placeholder="Masukkan Batas Grade 3"
                          name="grade_3"
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
                  ) : null}
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

export default Indicator;
