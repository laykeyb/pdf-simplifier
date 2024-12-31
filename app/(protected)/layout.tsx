import Navbar from "@/components/Navbar";
import { Provider } from "jotai";

const PdfSimplifierLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Navbar />
      <Provider>
        <main>{children}</main>
      </Provider>
    </div>
  );
};

export default PdfSimplifierLayout;
