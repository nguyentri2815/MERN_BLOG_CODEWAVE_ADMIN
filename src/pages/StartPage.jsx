import React, { useState } from "react";
import { Modal, Button } from "@mantine/core";

import useStore from "../stores";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import Loading from "../components/Loading";
import { useDisclosure } from "@mantine/hooks";

const StartPage = () => {
  const [visible, { toggle }] = useDisclosure(false);

  //show/hide modal login/signUp
  const { showModal, setShowModal } = useStore();
  //Modal : khung mantin + content component + dk login/signup
  const [isLogin, setIsLogin] = useState(true);
  const handleCloseModal = () => {
    setShowModal();
    setIsLogin(true);
  };
  return (
    <div>
      <h1>Join Our Community of Passionate Writers!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        feugiat dolor id lorem rutrum viverra. Vivamus dignissim ipsum turpis,
        non venenatis augue congue.
      </p>
      <div className="flex gap-6 items-center mt-6">
        <Button onClick={setShowModal}>Get Started</Button>
      </div>
      {/* Nội dung toggle bên trong bị delay khi close nên cần check bên ngoài  */}
      {showModal && (
        <Modal
          opened={showModal}
          onClose={handleCloseModal}
          title={isLogin ? "Login" : "Signup"}
          centered
        >
          {isLogin && <LoginForm setIsLogin={setIsLogin} toggle={toggle} visible={visible}/>}
          {!isLogin && <SignUpForm setIsLogin={setIsLogin} toggle={toggle} visible={visible}/>}
        </Modal>
      )}
      {visible && <Loading visible={visible}/>}
    </div>
  );
};

export default StartPage;

// Route trong layout lấy navbar
// Content : mô tả + btn: get start show form login/signup
// Sử dụng biến state từ Zustand show/hide modal form login/signUp : vì có 2 nơi tách biết cần là nav và startPage
// Mặc định khi click show form là Login : khi click btn login navbar và startPage
