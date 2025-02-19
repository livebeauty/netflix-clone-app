import { Provider } from "react-redux";
import { store } from "../app/store";
import "../styles/global.css";
import { AuthProvider } from "@/context/AuthContext";


export default function MyApp({ Component, pageProps }) {
  return (
    <>
    <AuthProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
    </>
  );
}
