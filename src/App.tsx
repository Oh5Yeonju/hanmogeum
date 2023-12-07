import "@/App.css";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

import codeApi from "@/apis/services/code";
import codeState from "@/recoil/atoms/codeState";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const App = () => {
  const setCodeState = useSetRecoilState(codeState);
  const getCodeData = async () => {
    try {
      const { data } = await codeApi.getCode();
      setCodeState(data.item);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCodeData();
  }, []);
  return (
    <>
      <Header />
      <ContentsWrapper>
        <Outlet />
      </ContentsWrapper>
      <Footer />
    </>
  );
};

export default App;

const ContentsWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 65px;
  min-height: 80vh;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;
