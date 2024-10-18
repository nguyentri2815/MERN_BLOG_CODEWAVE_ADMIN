import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useSignUp = (toggle) =>
  useMutation({
    mutationFn: (newUser) => {
      return axios.post("http://localhost:8800/auth/register", newUser);
    },
    onSuccess: (values) => {
      toggle();
      toast.success(
        "Tạo tài khoản thành công - vui lòng check mail để active tk"
      );
      // set user localStore
      localStorage.setItem(
        "otpData-blog-codewave",
        JSON.stringify(values?.data?.user)
      );
      // localStorage.setItem('token-blog-codewave',values?.token);

      setTimeout(() => {
        window.location.replace("/otp-verification");
      }, 2000);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err?.message || "lỗi service"
      );
    },
  });

export const useVerifyOTP = () =>
  useMutation({
    mutationFn: (verifyData) => {
      const { userId, otp } = verifyData;
      return axios.post(
        `http://localhost:8800/users/verify/${userId}/${otp}`,
        {}
      );
    },
    onSuccess: (values) => {
      // toggle()
      toast.success("Active tk thành công");
      setTimeout(() => {
        window.location.replace("/auth");
      }, 2000);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err?.message || "lỗi service"
      );
    },
  });

export const useLogin = () =>
  useMutation({
    mutationFn: (loginData) => {
      return axios.post(`http://localhost:8800/auth/login`, loginData);
    },
    onSuccess: (values) => {
      // toggle()
      toast.success("Login thanh cong");
      localStorage.setItem(
        "user-blog-codewave",
        JSON.stringify(values?.data?.user)
      );
      localStorage.setItem(
        "token-blog-codewave",
        values?.data?.token
      );
      setTimeout(() => {
        window.location.replace("/");
      }, 2000);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err?.message || "lỗi service"
      );
      setTimeout(() => {
        window.location.replace("/otp-verification");
      }, 2000);
    },
  });

export const useResend = () =>
  useMutation({
    mutationFn: (userID) => {
      return axios.post(`http://localhost:8800/users/resend-otp/${userID}`, {});
    },
    onSuccess: (values) => {
      // toggle()
      toast.success("Resend thanh cong + check mail");
      // set user localStore
      localStorage.setItem(
        "otpData-blog-codewave",
        JSON.stringify(values?.data?.user)
      );
      // localStorage.setItem('token-blog-codewave',values?.token);

      setTimeout(() => {
        window.location.replace("/otp-verification");
      }, 2000);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err?.message || "lỗi service"
      );
      setTimeout(() => {
        window.location.replace("/otp-verification");
      }, 2000);
    },
  });
