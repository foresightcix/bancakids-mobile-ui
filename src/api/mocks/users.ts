import { Parent, Child } from "@/types";

export const mockParent: Parent = {
  id: "p_001",
  name: "Andrés Martínez",
  email: "andres.martinez@gmail.com",
  phone: "+51 987 654 321",
};

export const mockChild: Child = {
  id: "c_001",
  profileId: "profile_c_001",
  accountId: "account_c_001",
  name: "Sofi",
  age: 8,
  avatarColor: "#E87C31",
  piggyConnected: true,
  balance: 123.5,
};
