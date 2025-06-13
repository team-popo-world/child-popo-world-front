import { Background } from "../../../components/layout/Background";
import backgroundImage from "../../../assets/image/login/login_background.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../../../lib/api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/toast.css";
import { useAuthStore } from "@/lib/zustand/store";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await apiClient.post("/auth/login", form);
      console.log("응답 헤더:", JSON.stringify(response.headers, null, 2));

      // 액세스 토큰 저장
      const accessToken = response.headers["authorization"]?.replace("Bearer ", "");
      if (accessToken) {
        Cookies.set("accessToken", accessToken, {
          expires: 1, // 1일 후 만료
          secure: true,
          sameSite: "strict", // CSRF 공격 방지
        });
      }

      // 리프레시 토큰 저장
      const refreshToken = response.headers["refresh-token"];
      if (refreshToken) {
        Cookies.set("refreshToken", refreshToken, {
          expires: 14, // 14일 후 만료
          secure: true,
          sameSite: "strict", // CSRF 공격 방지
        });
      }

      // 사용자 정보 저장
      if (response.data) {
        setUser({
          name: response.data.name,
        });
        console.log("로그인 성공");
      }

      // 메인 페이지로 이동
      navigate("/");
    } catch (error: any) {
      console.error("로그인 에러:", error);
      if (error.response) {
        console.error("에러 응답:", error.response.data);
        toast.error(error.response.data.message || "로그인에 실패했습니다.");
      } else {
        toast.error("서버 연결에 실패했습니다.");
      }
    }
  };

  return (
    <Background backgroundImage={backgroundImage}>
      <form onSubmit={handleSubmit} className="flex flex-col items-center" autoComplete="off">
        <h1
          className="text-[4rem] font-extrabold text-[#BBEB4B] text-center mt-6"
          style={{ WebkitTextStroke: "3px #457E9E" }}
        >
          로그인
        </h1>
        <input
          type="email"
          name="email"
          autoComplete="off"
          value={form.email}
          onChange={handleChange}
          placeholder="이메일"
          className="mt-3 rounded-full bg-white px-4 py-3 placeholder-[#48BBD3] font-bold w-80 text-[1.2rem] focus:outline-none focus:ring-0"
        />
        <input
          type="password"
          name="password"
          autoComplete="off"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호"
          className="mt-3 rounded-full bg-white px-4 py-3 placeholder-[#48BBD3] font-bold w-80 text-[1.2rem] focus:outline-none focus:ring-0"
        />

        <button
          type="submit"
          className="mt-3 rounded-full bg-[#EB864B] px-4 py-3 text-white font-bold w-80 text-[1.2rem] cursor-pointer"
        >
          로그인
        </button>
        <Link to="/auth/register" className="mt-2 text-white text-center text-[0.8rem] ">
          회원가입
        </Link>
        <div className="w-13 h-[1px] bg-white rounded-full" />
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        style={{ position: "absolute", top: "1rem", right: "1rem" }}
        className="w-60"
      />
    </Background>
  );
}
