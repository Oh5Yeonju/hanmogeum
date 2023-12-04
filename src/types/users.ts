type UserType = "user" | "seller" | "admin";

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: string;
  type: string;
}

export interface UserExtra {
  like?: number[];
  birthday?: string;
  address?: UserAddress[];
}

export interface UserAddress {
  id: number;
  name: string;
  value: string;
}

// POST /users/ 회원가입
export interface ResponseSignUp {
  ok: number;
  item: User;
}

export interface User {
  _id: number;
  email: string;
  name: string;
  type: UserType;
  phone: string;
  address: string;
  extra?: UserExtra;
  createdAt: string;
  updatedAt: string;
}
export interface ResponseEmailDuplicateCheck {
  ok: number;
  message: string;
}

// POST /users/login 로그인
export interface ResponseLogin {
  ok: number;
  item: UserWithToken;
}

export interface UserWithToken extends User {
  token: AuthToken;
}
export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

// PATCH /users/{_id} 유저 정보 업데이트
export interface ResponseUpdateUser {
  ok: number;
  updated: UpdatedUser;
}

export interface RequestUpdateUser {
  name?: string;
  phone?: string;
  password?: string;
  address?: string;
  extra?: UserExtra;
}

interface UpdatedUser extends RequestUpdateUser {
  updatedAt: string;
}
