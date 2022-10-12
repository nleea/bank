import { hashSync, genSaltSync, compareSync } from "bcrypt";

const saltRounds = 10;

export function hashPin(pin: string) {
  const salt = genSaltSync(saltRounds);
  const encrypted = hashSync(pin, salt);
  return {
    encrypted,
  };
}

export function comparePin(pin: string, hashPin) {
  return compareSync(pin, hashPin);
}
