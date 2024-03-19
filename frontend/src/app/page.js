import AuthWrapper from "@/common/components/AuthWrapper.jsx";
import Home from "@/components/home/Home";
export default function Index() {
  return (
    <AuthWrapper>
      <Home />
    </AuthWrapper>
  );
}
