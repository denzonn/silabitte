import { FC, useEffect, useState } from "react";
import Cookie from "js-cookie";

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
}) => {
  const role = Cookie.get("role");
  const [isConfirm, setIsConfirm] = useState(false);

  useEffect(() => {
    let verifier = 0;

    request?.forEach((item: {status: string}) => {
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
        ) : (
          <i
            className="fa-solid fa-eye cursor-pointer ml-2"
              onClick={() => getDetailVerif && getDetailVerif(id)}
          ></i>
        )}
      </td>
    </tr>
  );
};

export default Request;
