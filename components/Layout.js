import Navigation from "./Navigation";
import SideNavigation from "./SideNavigation";

export default function Layout({ children }) {
  return (
    <>
      <div
        className={"uk-grid-collapse uk-position-fixed uk-width-1-1"}
        data-uk-grid={""}
      >
        <div
          className={"uk-section-secondary uk-width-auto uk-box-shadow-large"}
        >
          <SideNavigation />
        </div>
        <div className={"uk-width-expand"}>
          <Navigation />
          <div style={{ height: "calc(100vh - 6rem)", overflow: "auto" }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
