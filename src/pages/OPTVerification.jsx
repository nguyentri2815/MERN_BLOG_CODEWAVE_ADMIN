import { TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import React, { useEffect, useState } from "react";
import { useResend, useVerifyOTP } from "../hooks/auth";
import useStore from "../stores";

const OPTVerification = () => {
  const { mutate } = useVerifyOTP();
  const { _id } = JSON.parse(localStorage.getItem('otpData-blog-codewave'));
 
  const [seconds, setSeconds] = useState(120);
  const [countdown, setCountdown] = useState(null);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds > 0 ? prevSeconds -1 : 0);
    }, 1000);
    setCountdown(intervalId);
    return () => clearInterval(intervalId); // Dọn dẹp khi component bị hủy
  }, []);
  useEffect(() => {
    if (seconds === 0) {
      clearInterval(countdown);
    }
  }, [seconds, countdown]);

  //Validation form : mantin
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      otp: "",
    },

    validate: {
      otp: hasLength({ min: 6, max: 6 }, "OTP must be 6 characters long"),
    },
  });
  //Api zustand + muta
  const handleSubmit = (values) => {
    console.log("values", values)
    mutate({
      otp: values?.otp,
      userId: _id,
    });
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  //Nên dùng như này vì sẽ có nhiều cấu hình hook api trong 1 page
  const reSend = useResend();
  const handleResendOTP = () =>{
    console.log('_id',_id);
    
    reSend.mutate(_id);
  }
  return (
    <div>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label="Input label"
          name="otp"
          key={form.key("otp")}
          {...form.getInputProps("otp")}
        />
         <div className='pt-5 flex items-center justify-center gap-3 text-base'>
          {seconds === 0 ? (
            <a
              className='text-base text-blue-600 underline cursor-pointer'
              onClick={() => handleResendOTP()}
            >
              Resend
            </a>
          ) : (
            <>
              <p>OTP will expire in:</p>
              <span className='text-rose-600 font-semibold'>
                {formatTime(seconds)}
              </span>
            </>
          )}
        </div>
        <button type="submit">xác nhận</button>
      </form>
    </div>
  );
};

export default OPTVerification;
