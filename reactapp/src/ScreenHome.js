import React, { useState, useEffect } from "react";
import "./App.css";
import { Input, Button, Modal } from "antd";
import { Redirect } from "react-router-dom";

function ScreenHome() {
  /*--------------------------State---------------------*/
  const [emailSignUp, setEmailSignUp] = useState("");
  const [pwdSignUp, setPwdSignUp] = useState("");
  const [nameSignUp, setNameSignUp] = useState("");
  
  const [isLogin, setIsLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [message, setMessage] = useState("");

  /*--------------------------Sign-up-POST---------------------*/
  const handleSubmitSignUp = async () => {
    let rawSignUpResponse = await fetch("/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${emailSignUp}&pwd=${pwdSignUp}&name=${nameSignUp}`,
    });
    let signUpResponse = await rawSignUpResponse.json();
    console.log(signUpResponse);
    setIsLogin(signUpResponse.notExist);
    if (signUpResponse.message) {
      setModalContent(signUpResponse.message);
      showModal();
    }

  };

  /*--------------------------Sign-in-POST---------------------*/
  async function handleClickSignin() {
    let rawResponse = await fetch("/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `email=${email}&pwd=${pwd}`,
    });
    let response = await rawResponse.json();
    console.log(response);
    setIsLogin(response.isExist);
    if (response.message) {
      setModalContent(response.message);
      showModal();
    }
  }

  /*--------------------------Modal----------------------------- */
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (isLogin === false) {
    return (
      <div>
        <Modal
          title="Messages"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{modalContent}</p>
        </Modal>
        <div className="Login-page">
          {/* SIGN-IN */}

          <div className="Sign">
            <Input
              placeholder="email@gmail.com"
              className="Login-input"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <Input.Password
              placeholder="password"
              className="Login-input"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
            />

            <Button
              style={{ width: "80px" }}
              type="primary"
              className="btn"
              onClick={() => handleClickSignin()}
            >
              Sign-in
            </Button>
          </div>

          {/* SIGN-UP */}

          <div className="Sign">
          <Input
              placeholder="name"
              className="Login-input"
              onChange={(e) => setNameSignUp(e.target.value)}
              value={nameSignUp}
            />
            <Input
              placeholder="email@gmail.com"
              className="Login-input"
              onChange={(e) => setEmailSignUp(e.target.value)}
              value={emailSignUp}
            />

            <Input.Password
              placeholder="password"
              className="Login-input"
              onChange={(e) => setPwdSignUp(e.target.value)}
              value={pwdSignUp}
          
            />

            <Button
              style={{ width: "80px" }}
              type="primary"
              className="btn"
              onClick={() =>(handleSubmitSignUp(), showModal())}
            >
              Sign-up
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/sources" />;
  }
}

export default ScreenHome;
