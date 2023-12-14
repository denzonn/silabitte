import Button from "../../component/Button";
import Input from "../../component/Input";

const Login = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-primary flex justify-center items-center relative overflow-hidden">
      <div className="w-96 bg-white shadow-sm rounded-2xl p-10 flex flex-col justify-center items-center text-center z-40">
        <div className="text-3xl font-bold mb-3">Login</div>
        <div className="text-sm mb-3">
          Selamat datang di Website Resmi Dinas Peternakan
        </div>
        <div className="w-full">
          <Input
            type="email"
            placeholder="Email Address"
            name="email"
            className="mb-4"
          />
        </div>
        <div className="w-full">
          <Input type="password" placeholder="Password" name="password" />
        </div>
        <Button label="Login" className="mt-5" />
      </div>
      <div className="w-64 h-64 rounded-3xl absolute top-[20vh] left-4 bg-[#98fdee] rotate-45 -translate-x-16"></div>
      <div className="w-40 h-[70px] absolute top-[60vh] left-12 bg-[#98fdee] rounded-full rotate-[135deg]"></div>
      <div className="w-52 h-52 absolute top-[5vh] right-12 bg-[#98fdee] rounded-full"></div>
      <div className="w-64 h-64 rounded-3xl absolute bottom-0 right-0 bg-[#98fdee] rotate-45 translate-x-24 translate-y-20"></div>
    </div>
  );
};

export default Login;
