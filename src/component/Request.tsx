import { FC, useEffect, useState } from "react";
import Cookie from "js-cookie";
import Popup from "./Popup";
import Button from "./Button";
import Input from "./Input";
import { useFormik } from "formik";
import { validateRequestDetail } from "../validation/auth";
import axios from "axios";
import toast from "react-hot-toast";

interface RequestProps {
  id: string;
  index: number;
  file_name?: string;
  user_name?: string;
  officer_name?: string;
  total_livestock?: string;
  status?: string;
  request?: [];
  getDetailVerif?: (id: string) => void;
  getVerif?: (id: string) => void;
  confirmStatus?: (id: string) => void;
  confirmStatusLeader?: (id: string) => void;
}

const Request: FC<RequestProps> = ({
  id,
  index,
  file_name,
  user_name,
  officer_name,
  total_livestock,
  status,
  request,
  getDetailVerif,
  getVerif,
  confirmStatus,
  confirmStatusLeader,
}) => {
  const role = Cookie.get("role");
  const token = Cookie.get("token");

  const [isConfirm, setIsConfirm] = useState(false);
  const [isReject, setIsReject] = useState(false);
  const [isLeaderConfirm, setIsLeaderConfirm] = useState(false);

  const formik = useFormik({
    initialValues: {
      status: 0,
      return_description: "",
    },
    validationSchema: validateRequestDetail,
    onSubmit: (values) => {
      axios
        .put(`/api/request-file/status/${id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Data Di Verifikasi");

          setIsReject(false);
          formik.resetForm();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
  });

  useEffect(() => {
    let verifier = 0;

    request?.forEach((item: { status: string }) => {
      if (item?.status !== "3") {
        verifier += 1;
      }
    });

    if (verifier === request?.length) {
      setIsConfirm(true);
    }
  }, [request]);

  return (
    <tr className="border-b-gray-200" key={index}>
      <td>{index + 1}</td>
      <td>{file_name}</td>
      <td>{user_name}</td>
      <td>{officer_name}</td>
      <td>{total_livestock} ekor</td>
      {role === "admin" || role === "leader" ? (
        <td>
          {status == "1"
            ? "Verifikator 1"
            : status == "2"
            ? "Petugas"
            : status == "3"
            ? "Verifikator 2"
            : status == "4"
            ? "Pimpinan"
            : status == "0"
            ? "Ditolak"
            : "Permohonan Diterima"}
        </td>
      ) : null}
      <td>
        {role === "verifier II" ? (
          <div className="flex flex-row gap-x-2">
            <i
              className="fa-solid fa-eye cursor-pointer ml-2"
              onClick={() => getDetailVerif && getDetailVerif(id)}
            ></i>
            {isConfirm ? (
              <i
                className="fa-solid fa-circle-check cursor-pointer ml-2"
                onClick={() => confirmStatus && confirmStatus(id)}
              ></i>
            ) : null}
          </div>
        ) : role === "verifier I" ? (
          <i
            className="fa-solid fa-circle-check cursor-pointer ml-2"
            onClick={() => getVerif && getVerif(id)}
          ></i>
        ) : role === "leader" ? (
          <div className="flex flex-row gap-x-2">
            <i
              className="fa-solid fa-eye cursor-pointer ml-2"
              onClick={() => getDetailVerif && getDetailVerif(id)}
            ></i>
            <i
              className="fa-solid fa-circle-check cursor-pointer ml-2"
              onClick={() => setIsLeaderConfirm(!isLeaderConfirm)}
            ></i>
          </div>
        ) : (
          <i
            className="fa-solid fa-eye cursor-pointer ml-2"
            onClick={() => getDetailVerif && getDetailVerif(id)}
          ></i>
        )}
      </td>
      {isLeaderConfirm ? (
        <Popup onConfirm={() => setIsLeaderConfirm(false)}>
          <div className="relative w-[25vw] max-h-full">
            <div className="relative w-full bg-white rounded-lg shadow">
              <div className="px-6 py-6 lg:px-8">
                <div className="text-xl font-semibold text-center">
                  Apakah datanya telah sesuai ?
                </div>
                <div className=" flex flex-row gap-x-2 w-full justify-between mt-2">
                  <div className="w-full">
                    <Button
                      label="Terima"
                      className="w-full"
                      onClick={() =>
                        confirmStatusLeader && confirmStatusLeader(id)
                      }
                    />
                  </div>
                  <div className="w-full">
                    <Button
                      label="Tolak"
                      className="w-full bg-red-500 hover:bg-red-300"
                      onClick={() => {
                        setIsReject(!isReject), setIsLeaderConfirm(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Popup>
      ) : null}
      {isReject ? (
        <Popup onConfirm={() => setIsReject(false)}>
          <div className="relative w-[40vw] max-h-full">
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
                        type="button"
                        label="Kembali"
                        className="bg-red-500 hover:bg-red-400"
                        onClick={() => {setIsLeaderConfirm(true), setIsReject(false)}}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Popup>
      ) : null}
    </tr>
  );
};

export default Request;
