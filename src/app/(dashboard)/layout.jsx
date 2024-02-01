import Header from "../../components/dashboard/header";
import SideBar from "../../components/dashboard/sideBar";

export default function DashboardLayout({ children }) {
  return (
    <section className="w-full h-full bg-backgroundPrimary">
      <div className="flex w-full h-full">
        <SideBar />
        <div className="w-full h-full">
          <Header />
          {children}
        </div>
      </div>
    </section>
  );
}
