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
import { validateNews } from "../../validation/auth";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface NewsProps {
  id: string;
  title?: string;
  image?: string;
  content?: string | TrustedHTML;
  length?: string;
}

const News = () => {
  const rootElement = document.documentElement;
  rootElement.style.backgroundColor = "#FAFAFA";

  const [data, setData] = useState<NewsProps[]>();
  const [editData, setEditData] = useState<NewsProps>();
  const token = Cookie.get("token");
  const role = Cookie.get("role");
  const [id, setId] = useState<number>(0);

  const [showPhoto, setShowPhoto] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<NewsProps[]>();
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>();

  const navigate = useNavigate();

  const [add, setAdd] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const getData = () => {
    axios
      .get(`/api/news?page=${page}`, {
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

  const formik = useFormik({
    initialValues: {
      title: "",
      image: null,
      content: "",
    },
    validationSchema: validateNews,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      if (values.image !== null) {
        formData.append("image", values.image);
      }
      formData.append("content", values.content);

      axios
        .post("/api/news", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Menambahkan Berita");
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
      .get(`/api/news/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEdit(!edit);
        setId(res?.data?.data?.id);
        setEditData(res?.data?.data);
        initializeFormik(res?.data?.data);
      });
  };

  const initializeFormik = (data: NewsProps) => {
    editFormik.setFieldValue("title", data?.title || "");
    editFormik.setFieldValue("content", data?.content || 0);
    editFormik.setFieldValue("image", data?.image || null);
  };

  const editFormik = useFormik({
    initialValues: {
      title: "",
      image: null,
      content: "",
    },
    validationSchema: validateNews,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      if (values.image !== null) {
        formData.append("image", values.image);
      }
      formData.append("_method", "PUT");

      axios
        .post(`/api/news/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Berhasil Mengupdate Berita");
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
        .delete(`/api/news/${id}`, {
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
        success: "Berhasil Menghapus Berita...",
        error: (error) => {
          return toast.error(error.message);
        },
      }
    );
  };

  const searchFormik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      axios
        .get(`/api/news?search=${values.search}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res?.data?.data?.data.length > 0) {
            updateSearchData(res?.data?.data?.data);
          } else {
            toast.error("Berita dicari tidak ada !!");
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
  });

  // Update searchData whenever the search input changes
  useEffect(() => {
    setSearchData([]);
  }, [searchFormik.values.search]);

  // Update searchData after fetching results
  const updateSearchData = (data: any) => {
    setSearchData(data);
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        toast.error("Silahkan login terlebih dahulu");
      }, 2000);
      navigate("/");
    }

    if (role !== "admin") {
      navigate("/dashboard");
    }
  }, [token, navigate, role]);

  return (
    <section>
      <div className="bg-primary w-full h-[40vh] fixed top-0 left-0 z-0"></div>
      <Sidebar />

      <main className="ml-72 px-6 pt-5 z-10 relative">
        <Breadcrumb pages="Data Berita" />

        <div className="bg-white rounded-2xl">
          <div className="px-10 mt-5 pt-5 text-[#344767] font-semibold">
            Data Berita Table
          </div>
          <div className="flex flex-row justify-between px-10 my-3">
            <div>
              <Button
                label="Tambah Berita"
                className="text-sm"
                onClick={() => setAdd(!add)}
              />
            </div>
            <form onSubmit={searchFormik.handleSubmit}>
              <div className="flex flex-row gap-x-2">
                <div className="flex flex-row gap-x-2 items-center justify-center bg-transparent focus:outline-none border border-gray-100 px-6 py-2 rounded-lg font-light text-sm">
                  <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                  <input
                    type="text"
                    className="bg-transparent focus:border-none focus:outline-none"
                    placeholder="Cari Berita"
                    name="search"
                    value={searchFormik.values.search}
                    onChange={searchFormik.handleChange}
                  />
                </div>
                <div>
                  <Button label="Cari" type="submit" />
                </div>
              </div>
            </form>
          </div>
          <div className="overflow-x-auto px-10 pb-5">
            <table className="table">
              <thead>
                <tr className="border-b-gray-200 text-gray-400 text-sm font-medium">
                  <td>No</td>
                  <td>Gambar</td>
                  <td>Title</td>
                  <td>Content</td>
                  <td></td>
                </tr>
              </thead>
              <tbody className="text-[#344767]">
                {searchData &&
                searchData?.length > 0 &&
                searchFormik.values.search !== "" ? (
                  searchData?.map((item: NewsProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={item?.image}
                            alt=""
                            className="h-32 object-cover"
                          />
                        </td>
                        <td>{item?.title}</td>
                        <td>
                          {item?.content && (
                            <div
                              dangerouslySetInnerHTML={{ __html: item.content }}
                            ></div>
                          )}
                        </td>
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
                ) : data && data?.length > 0 ? (
                  data?.map((item: NewsProps, index: number) => {
                    return (
                      <tr className="border-b-gray-200" key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={item?.image}
                            alt=""
                            className="h-32 object-cover"
                          />
                        </td>
                        <td>{item?.title}</td>
                        <td>
                          {item?.content && (
                            <div
                              dangerouslySetInnerHTML={{ __html: item.content }}
                            ></div>
                          )}
                        </td>
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
                    <td colSpan={5} className="text-center">
                      {searchFormik.values.search !== ""
                        ? "Tidak ada Berita yang dicari"
                        : "Tidak ada Berita"}
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
                  page === lastPage ? "cursor-not-allowed" : ""
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
                  Tambahkan Berita
                </div>
                <form
                  onSubmit={formik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className=" grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Name"
                        placeholder="Masukkan Name Judul Berita"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.title && formik.errors.title ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.title}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        admin
                        label="Tumbnail"
                        type="file"
                        placeholder="Masukkan Name Judul Berita"
                        name="image"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "image",
                            event.currentTarget.files[0]
                          )
                        }
                        onBlur={formik.handleBlur}
                        required
                      />
                      {formik.touched.image && formik.errors.image ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {formik.errors.image}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <CKEditor
                      editor={ClassicEditor}
                      data={formik.values.content}
                      onChange={(_event, editor) => {
                        const data = editor.getData();
                        formik.setFieldValue("content", data);
                      }}
                    />
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
          <div className="relative w-[65vw] ">
            <div className="relative w-full bg-white rounded-lg shadow h-[90vh] overflow-auto news">
              <div className="px-6 py-6 lg:px-8">
                <div className="mb-4 text-xl text-center font-bold text-black">
                  Edit Berita
                </div>
                <form
                  onSubmit={editFormik.handleSubmit}
                  encType="multipart/form-data"
                >
                  <div className=" grid grid-cols-2 gap-x-5">
                    <div>
                      <Input
                        admin
                        label="Name"
                        placeholder="Masukkan Name Judul Berita"
                        name="title"
                        value={editFormik.values.title}
                        onChange={editFormik.handleChange}
                        onBlur={editFormik.handleBlur}
                        required
                      />
                      {editFormik.touched.title && editFormik.errors.title ? (
                        <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                          {editFormik.errors.title}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-row gap-x-5 items-center">
                      <div>
                        <Input
                          admin
                          label="Tumbnail"
                          type="file"
                          placeholder="Masukkan Name Judul Berita"
                          name="image"
                          onChange={(event) =>
                            editFormik.setFieldValue(
                              "image",
                              event.currentTarget.files[0]
                            )
                          }
                          onBlur={editFormik.handleBlur}
                        />
                        {editFormik.touched.image && editFormik.errors.image ? (
                          <div className="text-red-500 focus:outline-red-500 text-sm font-medium pb-2">
                            {editFormik.errors.image}
                          </div>
                        ) : null}
                      </div>
                      <div className="w-1/6 ">
                        <div
                          className="border border-slate-200 text-slate-400 py-[0.6rem] px-[0.875rem] text-center rounded-lg mt-2 text-sm"
                          onClick={() => setShowPhoto(true)}
                        >
                          Foto
                        </div>
                        {showPhoto ? (
                          <div className="absolute top-0 left-0 h-full w-full flex justify-center py-10 bg-black bg-opacity-50 z-50">
                            <div className="relative">
                              <img
                                src={editData?.image}
                                alt=""
                                className="h-full rounded-lg border-2 border-white"
                              />
                              <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                                <i
                                  className="fa-solid fa-circle-xmark text-2xl text-white cursor-pointer"
                                  onClick={() => setShowPhoto(false)}
                                ></i>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div>
                    <CKEditor
                      editor={ClassicEditor}
                      data={editFormik.values.content}
                      onChange={(_event, editor) => {
                        const data = editor.getData();
                        editFormik.setFieldValue("content", data);
                      }}
                    />
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

export default News;
