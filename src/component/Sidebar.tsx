import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Cookie from "js-cookie";

const Sidebar = () => {
  const pathname = location.pathname;
  const role = Cookie.get("role");

  return (
    <div
      className={`fixed z-10 top-0 lg:ml-3 px-3 py-5 w-72 h-full rounded-3xl lg:block`}
    >
      <div className="bg-white inset-y-0 shadow-sm w-full h-full rounded-2xl outline-none flex flex-col px-4 py-6 relative">
        <div className="absolute top-0 right-0 lg:hidden">
          <i className="fa-solid fa-circle-xmark text-xl"></i>
        </div>
        <div className="text-2xl flex flex-row gap-2 justify-center items-center font-roboto text-[#566a7f]">
          <img src="../../public/SILABITTE.png" alt="" className="w-14 h-14" />
        </div>
        <hr className="my-3" />
        <div className="flex flex-col justify-between h-full ">
          <ul className="w-full overflow-auto slides relative pl-0">
            <Link to="/dashboard">
              <li
                className={`px-5 w-full py-4 rounded-lg ${
                  pathname === "/dashboard" ? "bg-[#4abdac2e]" : ""
                } text-sm flex gap-3 items-center mb-1`}
              >
                <i
                  className={`fa-solid fa-house ${
                    pathname === "/dashboard"
                      ? "text-[#4abdac]"
                      : "text-[#67748E]"
                  }`}
                ></i>
                <span
                  className={
                    pathname === "/dashboard"
                      ? "text-[#4abdac]"
                      : "text-[#67748E]"
                  }
                >
                  Dashboard
                </span>
              </li>
            </Link>
            {role !== "admin" ? (
              ""
            ) : (
              <div>
                <Link to="/user">
                  <li
                    className={`px-5 w-full py-4 rounded-lg ${
                      pathname === "/user" ? "bg-[#4abdac2e]" : ""
                    } text-sm flex gap-3 items-center mb-1`}
                  >
                    <i
                      className={`fa-solid fa-user ${
                        pathname === "/user"
                          ? "text-[#4abdac]"
                          : "text-[#67748E]"
                      }`}
                    ></i>
                    <span
                      className={
                        pathname === "/user"
                          ? "text-[#4abdac]"
                          : "text-[#67748E]"
                      }
                    >
                      User
                    </span>
                  </li>
                </Link>
                <Link to="/news">
                  <li
                    className={`px-5 w-full py-4 rounded-lg ${
                      pathname === "/news" ? "bg-[#4abdac2e]" : ""
                    } text-sm flex gap-3 items-center mb-1`}
                  >
                    <i
                      className={`fa-solid fa-newspaper ${
                        pathname === "/news"
                          ? "text-[#4abdac]"
                          : "text-[#67748E]"
                      }`}
                    ></i>
                    <span
                      className={
                        pathname === "/news"
                          ? "text-[#4abdac]"
                          : "text-[#67748E]"
                      }
                    >
                      Berita
                    </span>
                  </li>
                </Link>
                <Link to="/type">
                  <li
                    className={`px-5 w-full py-4 rounded-lg ${
                      pathname === "/type" ? "bg-[#4abdac2e]" : ""
                    } text-sm flex gap-3 items-center mb-1`}
                  >
                    <i
                      className={`fa-solid fa-clipboard-list ${
                        pathname === "/type"
                          ? "text-[#4abdac]"
                          : "text-[#67748E]"
                      }`}
                    ></i>
                    <span
                      className={
                        pathname === "/type"
                          ? "text-[#4abdac]"
                          : "text-[#67748E]"
                      }
                    >
                      Jenis Ternak
                    </span>
                  </li>
                </Link>
                <Link to="/indicator">
                  <li
                    className={`px-5 w-full py-4 rounded-lg ${
                      pathname === "/indicator" ? "bg-[#4abdac2e]" : ""
                    } text-sm flex gap-3 items-center mb-1`}
                  >
                    <i
                      className={`fa-solid fa-star ${
                        pathname === "/indicator"
                          ? "text-[#4abdac]"
                          : "text-[#67748E]"
                      }`}
                    ></i>
                    <span
                      className={
                        pathname === "/indicator"
                          ? "text-[#4abdac]"
                          : "text-[#67748E]"
                      }
                    >
                      Indikator
                    </span>
                  </li>
                </Link>
              </div>
            )}
            <Link to="/request">
              <li
                className={`px-5 w-full py-4 rounded-lg ${
                  pathname === "/request" ? "bg-[#4abdac2e]" : ""
                } text-sm flex gap-3 items-center mb-1`}
              >
                <i
                  className={`fa-solid fa-person-circle-question ${
                    pathname === "/request"
                      ? "text-[#4abdac]"
                      : "text-[#67748E]"
                  }`}
                ></i>
                <span
                  className={
                    pathname === "/request"
                      ? "text-[#4abdac]"
                      : "text-[#67748E]"
                  }
                >
                  Permohonan
                </span>
              </li>
            </Link>
            {role !== "admin" ? (
              ""
            ) : (
              <Link to="/result">
                <li
                  className={`px-5 w-full py-4 rounded-lg ${
                    pathname === "/result" ? "bg-[#4abdac2e]" : ""
                  } text-sm flex gap-3 items-center mb-1`}
                >
                  <i
                    className={`fa-solid fa-square-poll-vertical ${
                      pathname === "/result"
                        ? "text-[#4abdac]"
                        : "text-[#67748E]"
                    }`}
                  ></i>
                  <span
                    className={
                      pathname === "/result"
                        ? "text-[#4abdac]"
                        : "text-[#67748E]"
                    }
                  >
                    Hasil Pengukuran
                  </span>
                </li>
              </Link>
            )}
            <Link to="/" onClick={() => {Cookie.remove("token"), Cookie.remove('role')}}>
              <li
                className={`px-5 w-full py-4 rounded-lg ${
                  pathname === "/result" ? "bg-[#4abdac2e]" : ""
                } text-sm flex gap-3 items-center mb-1`}
              >
                <i
                  className={`fa-solid fa-right-from-bracket ${
                    pathname === "/result" ? "text-[#4abdac]" : "text-[#67748E]"
                  }`}
                ></i>
                <span
                  className={
                    pathname === "/result" ? "text-[#4abdac]" : "text-[#67748E]"
                  }
                >
                  Logout
                </span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Sidebar;
