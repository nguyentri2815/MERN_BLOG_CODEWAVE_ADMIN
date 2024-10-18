import React, { useState } from "react";
import { Box, PasswordInput, Progress, rem, Text } from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";

function PasswordRequirement({ meets, label }) {
  return (
    <Text
      c={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? (
        <IconCheck style={{ width: rem(14), height: rem(14) }} />
      ) : (
        <IconX style={{ width: rem(14), height: rem(14) }} />
      )}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}
const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}
const PasswordStrength = (props) => {
  const [value, setValue] = useState("");
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));
  const strength = getStrength(value);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
  return (
    <div>
      <PasswordInput
        withAsterisk
        label="password"
        placeholder="password"
        value={value}
        onChange={(event) => {
          setValue(event.currentTarget.value);
          props.onChange &&
            props.onChange(props.name, event.currentTarget.value);
        }}
      />
      <Progress color={color} value={strength} size={5} mb="xs" />
      <PasswordRequirement
        label="Includes at least 6 characters"
        meets={value.length > 5}
      />
      {checks}
    </div>
  );
};

export default PasswordStrength;
