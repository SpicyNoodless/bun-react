import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { get, set } from "lodash";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type People = {
  name: string;
  age: number;
}

type NumberConfig = {
  b: {
    c: number;
  }
}

type Student = People & {
  studentId: string;
  a: NumberConfig;
};

// extends Student a.b
type Student2 = Student & {
  a: NumberConfig & {
    b: {
      c: number;
      d: number;
    }
  }
};

const tom: Student2 = {
  name: "Tom",
  age: 18,
  studentId: "123456",
  a: {
    b: {
      c: 1,
      d: 2,
    },
  },
};
