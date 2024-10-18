import {
  Button,
  FileInput,
  Group,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";

import PasswordStrength from "./PasswordStrength";
import { uploadFile, uploadImageFireBase } from "../utils";
import { useSignUp } from "../hooks/auth";

const SignUpForm = ({ setIsLogin, toggle, visible }) => {
  // theme daskmode hook color mantin
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";
  // Validation : useForm mantin - no ko phu thuoc vao thu vien
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      image: "",
      accountType: "Writer",
    },

    validate: {
      firstName: (value) =>
        value.length < 2 ? "firstName must have at least 2 letters" : null,
      lastName: (value) =>
        value.length < 2 ? "lastName must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 2 ? "passWord must have at least 2 letters" : null,
    },
  });
  // Cau truc chuan input field
  // label ,placeholder, form.getinputprops (hieu ban chat nos gom logic chung )

  // Custom field passWordStrenght : password Strenght @mantin

  // state luu file[0] - effect thoi doi onchange - until firebase luu anh -> set field image = url until tra ra
  const [file, setFile] = useState("");
  const [fileURL, setFileURL] = useState();
  // handle input picture : api firebase

  useEffect(() => {
    if (file) {
    uploadFile(setFileURL, file, toggle);
    }
  }, [file]);

  // handle submit : import useMute cau hinh tu react-query
  const { mutate } = useSignUp(toggle);
  const handleSignUp = (values) => {
    toggle();
    mutate({
      ...values,
      image: fileURL,
    });
  };

  
  return (
    <form onSubmit={form.onSubmit((values) => handleSignUp(values))}>
      <TextInput
        label="firstName"
        placeholder="firstName"
        key={form.key("firstName")}
        {...form.getInputProps("firstName")}
      />
      <TextInput
        label="lastName"
        placeholder="lastName"
        key={form.key("lastName")}
        {...form.getInputProps("lastName")}
      />
      <TextInput
        label="Email"
        placeholder="your@email.com"
        key={form.key("Email")}
        {...form.getInputProps("email")}
      />

      <PasswordStrength name={"password"} onChange={form.setFieldValue} />

      <FileInput
        accept="image/png,image/jpeg"
        label="Upload files"
        placeholder="Upload files"
        onChange={(file) => setFile(file)}
      />

      <Group justify="flex-end" mt="md">
        <Button type="btn" variant="default" onClick={() => setIsLogin(true)}>
          Login
        </Button>
        <Button type="submit" loading={visible}>
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default SignUpForm;
