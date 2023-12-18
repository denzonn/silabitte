import { useFormik } from "formik";
import Button from "../../component/Button";
import Input from "../../component/Input";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../../validation/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();

  const token = Cookie.get("token");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateLogin,
    onSubmit: (values) => {
      axios
        .post("/api/login", {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          Cookie.set("token", res?.data?.data?.token);

          toast.success("Berhasil Login");
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    },
  });

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="w-[100vw] h-[100vh] bg-primary flex justify-center items-center relative overflow-hidden">
      <div className="w-96 bg-white shadow-sm rounded-2xl p-10 flex flex-col justify-center items-center text-center z-40">
        <div className="text-3xl font-bold mb-3">Login</div>
        <div className="text-sm mb-3">
          Selamat datang di Website Resmi Dinas Peternakan
        </div>
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="w-full">
            <Input
              type="email"
              placeholder="Email Address"
              name="email"
              className="mb-4"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 focus:outline-red-500 text-sm font-normal mb-9 md:mb-4">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          <div className="w-full">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 focus:outline-red-500 text-sm font-normal mb-9 md:mb-4">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <Button label="Login" className="mt-5" type="submit"/>
        </form>
      </div>
      <div className="w-64 h-64 rounded-3xl absolute top-[20vh] left-4 bg-[#98fdee] rotate-45 -translate-x-16"></div>
      <div className="w-40 h-[70px] absolute top-[60vh] left-12 bg-[#98fdee] rounded-full rotate-[135deg]"></div>
      <div className="w-52 h-52 absolute top-[5vh] right-12 bg-[#98fdee] rounded-full"></div>
      <div className="w-64 h-64 rounded-3xl absolute bottom-0 right-0 bg-[#98fdee] rotate-45 translate-x-24 translate-y-20"></div>
    </div>
  );
};

export default Login;
