// src/pages/MyPhone.jsx
import Phone from "../components/Phone";
import { useNavigation } from "../context/NavigationContext.tsx";

const MyPhone = () => {
  const { current, goTo } = useNavigation();

  return (
    <div className="myPhone">
      <Phone currentPage={current} onNavigate={goTo} />
    </div>
  );
};

export default MyPhone;
