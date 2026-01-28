import BrandLogo from "../components/BrandLogo";
import Alerts from "../components/Alerts";
import { Eye, EyeOff } from 'lucide-react';
import { createRef, useState} from "react";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const usernameRef = createRef();
  const passwordRef  = createRef();
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth({
    middleware: 'guest',
    url: '/'
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const loginData = {
      username : usernameRef.current.value,
      password : passwordRef.current.value
    }
    login(loginData, setErrors);

  };
  return (
    <div className="bg-white w-full md:max-w-md m-auto rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] overflow-hidden p-8 sm:p-10 relative border border-slate-200">
      {/* Top Red Bar Accent */}
      <div className="bg-primary absolute top-0 left-0 w-full h-2 hidden md:block"></div>

      {/* Header / Logo */}
      <div className="flex flex-col items-center mb-8 mt-2">
        <BrandLogo />
        <h1 className="text-text-main text-2xl font-extrabold leading-tight tracking-tight text-center">
          Admin Portal
        </h1>
        <p className="text-text-muted mt-2 text-center text-sm font-medium">
          Please authenticate to continue
        </p>
      </div>
      {errors
        ? errors.map((error, i) => <Alerts key={i}> {error}</Alerts>)
        : null}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-2">
          <label
            className="text-slate-700 text-[11px] font-bold uppercase tracking-wide ml-1"
            htmlFor="username"
          >
            Username
          </label>
          <input
            name="username"
            type="text"
            id="username"
            className="flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-slate-800
                       focus:outline-none focus:ring-0 border-2 border-[#1e293b] bg-white
                       focus:border-primary h-12 placeholder:text-slate-400 px-4
                       text-sm font-medium leading-normal transition-all duration-200"
            placeholder="Enter your username"
            ref={usernameRef}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="text-slate-700 text-[11px] font-bold uppercase tracking-wide ml-1"
            htmlFor="password"
          >
            Password
          </label>
          <div className="flex w-full items-stretch rounded-lg relative group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-800
                       focus:outline-none focus:ring-0 border-2 border-input-border bg-white
                       focus:border-primary h-12 placeholder:text-slate-400 px-4 pr-12
                       text-sm font-medium leading-normal transition-all duration-200"
              placeholder="Enter your password"
              ref={passwordRef}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer right-0 top-0 h-full px-4 text-text-muted hover:text-primary transition-colors flex items-center justify-center outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-1">
          <label className="flex items-center gap-2.5 cursor-pointer group select-none">
            <div className="relative flex items-center">
              <input
                name="rememberMe"
                type="checkbox"
                className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 bg-white checked:border-primary checked:bg-primary transition-all duration-200 focus:ring-0"
              />
            </div>
            <span className="text-text-muted group-hover:text-slate-700 text-sm font-medium transition-colors">
              Remember Me
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-primary cursor-pointer text-white mt-4 w-full h-12 hover:bg-primary-hover active:scale-[0.99]
                     disabled:opacity-70 disabled:cursor-not-allowed
                     transition-all duration-200 rounded-lg font-bold tracking-wide
                     shadow-[0_4px_14px_0_rgba(227,30,36,0.3)] uppercase text-sm flex items-center justify-center gap-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}
