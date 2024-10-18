import { Button, Group, TextInput, useMantineColorScheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useLogin } from "../hooks/auth";

const LoginForm = ({ setIsLogin }) => {
  //Dask mode toggle class : usemantinColorSchema
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";
  //validation : useForm - mantine
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length < 2 ? "Invalid email" : null),
    },
  });
  //Cau truc chuan input field : @mantin
  //handleSubmit : mutate import su dung tu cau hinh react-query
  const {mutate} = useLogin();
  const handleLogin = (values) => {
    console.log(values)
    mutate(values)
  }
  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
        <TextInput
          withAsterisk
          label="email"
          placeholder="email"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label="password"
          placeholder="password"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="btn" variant="default" onClick={()=>setIsLogin(false)} >signup</Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </>
  );
};

export default LoginForm;
