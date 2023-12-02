import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import IconShoppingCart from "@/assets/icons/shoppingCart_40.svg?react";
import IconSearchCart from "@/assets/icons/search_24.svg?react";
import loggedInUserState from "@/recoil/atoms/loggedInUserState";
import { getUserTypeState } from "@/recoil/selectors/loggedInUserSelector";

// constants
import { AUTH_TOKEN_KEY } from "@/constants/api";
import { MANAGE_TYPE } from "@/constants/user";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isManager, setIsManager] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const userType = useRecoilValue(getUserTypeState);

  useEffect(() => {
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    if (authToken) {
      setIsLogin(true);
      // TODO: 로그인한 사용자의 장바구니를 불러온다.
      setCartCount(0);
      if (MANAGE_TYPE.some((manageType) => userType === manageType)) {
        setIsManager(true);
      }
    } else {
      setIsLogin(false);
    }
  }, [userType]);

  const logoutClickHandle = () => {
    console.log("로그 아웃 됨");
    localStorage.clear();
    setIsManager(false);
    setCartCount(0);
    setIsLogin(false);
  };

  const categoryList = {
    common: [
      { name: "모든 상품", router: "/products" },
      { name: "티백", router: "/products/teabags" },
      { name: "잎차", router: "/products/tealeaves" },
      { name: "분말", router: "/products/powders" },
      { name: "음료/원액", router: "/products/liquids" },
    ],
    admin: [
      { name: "관리자페이지", router: "/", isPublic: false }, // TODO: api 개발 완료 후 라우터 수정
    ],
  };
  const userControlList = {
    isLogin: [
      { name: "마이페이지", router: "/mypage", onClick: () => {} },
      { name: "로그아웃", router: "/", onClick: logoutClickHandle },
    ],
    isLogout: [
      { name: "로그인", router: "/login" },
      { name: "회원가입", router: "/signup" },
    ],
  };

  return (
    <HeaderLayer>
      <HeaderWrapper>
        <LogoWrapper>
          <span>한모금</span>
        </LogoWrapper>
        <CategoryWrapper>
          <div>
            {categoryList.common.map((category) => (
              <ActiveLink end key={category.name} to={category.router}>
                {category.name}
              </ActiveLink>
            ))}
          </div>
          {isManager && (
            <AdminCategoryStyle>
              {categoryList.admin.map((category) => (
                <ActiveLink end key={category.name} to={category.router}>
                  {category.name}
                </ActiveLink>
              ))}
            </AdminCategoryStyle>
          )}
        </CategoryWrapper>
        <SearchWrapper>
          <IconSearchCart />
          <input placeholder="원하는 상품을 검색하세요" type="text" />
        </SearchWrapper>
        <UserControlWrapper>
          {isLogin
            ? userControlList.isLogin.map((userControl) => (
                <NavLink key={userControl.name} to={userControl.router} onClick={userControl.onClick}>
                  {userControl.name}
                </NavLink>
              ))
            : userControlList.isLogout.map((userControl) => (
                <NavLink key={userControl.name} to={userControl.router}>
                  {userControl.name}
                </NavLink>
              ))}
        </UserControlWrapper>
        <CartWrapper>
          <NavLink to="/cart">
            <IconShoppingCart />
            <CartCountStyle>
              <span>{cartCount}</span>
            </CartCountStyle>
          </NavLink>
        </CartWrapper>
      </HeaderWrapper>
    </HeaderLayer>
  );
};

const ActiveLink = styled(NavLink)`
  &.active {
    color: var(--color-main);
  }
`;

const HeaderLayer = styled.div`
  border-bottom: 1px solid var(--color-gray-100);
  background-color: var(--color-white);
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  height: 8.2rem;
  align-items: center;
  margin: 0 auto;
  max-width: 1280px;
`;

const LogoWrapper = styled.div`
  min-width: 12rem;
  font: var(--weight-bold) 4rem "maruburi";
  color: var(--color-main);
  cursor: pointer;
`;
const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  min-width: 46rem;
  font: var(--weight-bold) 1.6rem "suit";
  a {
    padding: 0 1rem;
  }
  margin-right: auto;
  a:hover {
    cursor: pointer;
    color: var(--color-main);
  }
`;

const AdminCategoryStyle = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;
  border-left: 2px solid var(--color-gray-500);
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-sub-500);
  border-radius: 5px;
  height: 4rem;
  svg {
    padding: 0 0.5rem;
  }
  input {
    min-width: 20rem;
    outline: none;
    border: none;
  }
`;

const UserControlWrapper = styled.div`
  display: flex;
  justify-content: end;
  min-width: 17rem;
  font: var(--weight-bold) 1.6rem "suit";
  cursor: pointer;
  a {
    padding: 0 1rem;
  }
`;
const CartWrapper = styled.div`
  position: relative;
  width: 5.2rem;
  cursor: pointer;
`;
const CartCountStyle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0.5rem;
  top: 0;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  background-color: var(--color-main);
  font: var(--weight-bold) 1.3rem "suit";
  color: var(--color-white);
`;

export default Header;
