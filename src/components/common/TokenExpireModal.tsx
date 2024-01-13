import Modal from "./Modal";
import Button from "./Button";
import useTokenExpiredModal from "@/store/useTokenExpiredModal";

const TokenExpireModal = () => {
  // tokenExpired가 true이면
  const tokenExpired = useTokenExpiredModal((state) => state.tokenModalState);

  const handleModal = () => {
    useTokenExpiredModal();
    window.location.assign("/login");
  };

  // 모달창을 열고
  // 확인을 누르면 다시 false로 변경되는 함수를 넣는다.
  return (
    <div style={{ zIndex: 99999 }}>
      <Modal isOpen={tokenExpired} message="토큰이 만료되었습니다.\n로그인 페이지로 이동합니다.">
        <Button value="확인" size="sm" variant="sub" onClick={handleModal} />
      </Modal>
    </div>
  );
};

export default TokenExpireModal;
