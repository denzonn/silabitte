// import axios from "axios";
// import Breadcrumb from "../../component/Breadcrumb";
// import Button from "../../component/Button";
// import Sidebar from "../../component/Sidebar";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Cookie from 'js-cookie'

const Result = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  // const [data, setData] = useState<TypeProps>();
  // const token = Cookie.get("token");
  // const role = Cookie.get("role");
  // const [id, setId] = useState<number>(0);

  // const navigate = useNavigate();

  // const [add, setAdd] = useState<boolean>(false);
  // const [edit, setEdit] = useState<boolean>(false);

  // const getData = () => {
  //   axios
  //     .get("/api/type-livestock", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setData(res?.data?.data?.data);
  //     })
  //     .catch((err) => {
  //       toast.error(err.message);
  //     });
  // };

  // useEffect(() => {
  //   if (!token) {
  //     setTimeout(() => {
  //       toast.error("Silahkan login terlebih dahulu");
  //     }, 2000);
  //     navigate("/");
  //   }

  //   if (role !== 'admin') {
  //     navigate("/dashboard");
  //   }
  // }, [token, navigate, role]);

  return (
    <section>
      <div className="bg-primary w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      {/* <main className="ml-72 px-6 pt-5 z-10 relative">
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
                        <td>{item?.certificate_color?.toLocaleUpperCase()}</td>
                        <td>
                          <i
                            className="fa-solid fa-pen-to-square cursor-pointer ml-2"
                            onClick={() => getEditData(item?.id)}
                          ></i>
                          <i
                            className="fa-solid fa-trash cursor-pointer ml-2"
                            onClick={() => getDestroy(item?.id)}
                          ></i>
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
      </main> */}
    </section>
  );
};

export default Result;
