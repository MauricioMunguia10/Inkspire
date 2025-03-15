import { Bounce, ToastContainer } from "react-toastify";
import AppRoutes from "./routes/routes";

const App = () => {
  return (
    <div>
      <AppRoutes />
      <ToastContainer
        position="top-left"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default App;
