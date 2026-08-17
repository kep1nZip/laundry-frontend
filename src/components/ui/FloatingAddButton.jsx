import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import "../../styles/components/FloatingAddButton.css";

function FloatingAddButton({
  to = "/orders/create",
  title = "Tambah Pesanan Baru",
}) {
  return (
    <Link
      to={to}
      className="app-floating-add-btn"
      title={title}
      aria-label={title}
    >
      <Plus className="app-floating-add-btn__icon" />
    </Link>
  );
}

export default FloatingAddButton;
