import { mockChild } from "./mocks/users";
import type { Child } from "@/types";

export type UserProfileChildDto = {
  id: string;
  user_id: string;
  parent_id: string;
  full_name: string;
  nickname?: string | null;
  date_of_birth?: string | null;
  accounts: {
    id: string;
    account_type: string;
    balance: string | number;
  }[];
};

export type RegisterChildBody = {
  full_name: string;
  nickname?: string | null;
  date_of_birth?: string | null;
  avatar_url?: string | null;
};

export const DEFAULT_CREATE_CHILD_BODY: RegisterChildBody = {
  full_name: mockChild.name,
  nickname: mockChild.name,
  date_of_birth: "2018-05-15",
};

function ageFromDateOfBirth(dob: string | null | undefined): number {
  if (!dob) return mockChild.age;
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return mockChild.age;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
}

export function toChild(dto: UserProfileChildDto): Child {
  const simpleAccount =
    dto.accounts.find((a) => a.account_type === "simple") ?? dto.accounts[0];

  return {
    id: dto.user_id,
    profileId: dto.id,
    accountId: simpleAccount?.id ?? "",
    name: dto.nickname?.trim() || dto.full_name,
    age: ageFromDateOfBirth(dto.date_of_birth),
    avatarColor: mockChild.avatarColor,
    piggyConnected: false,
    balance: simpleAccount ? Number(simpleAccount.balance) : 0,
  };
}

export function toMockChild(balance?: number): Child {
  return {
    ...mockChild,
    balance: balance ?? mockChild.balance,
  };
}
