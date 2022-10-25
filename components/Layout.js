import Navigation from "./Navigation";
import SideNavigation from "./SideNavigation";

export default function Layout({ children }) {
  return (
    <>
      <div
        className={"uk-grid-collapse"}
        data-uk-grid={""}
        data-uk-height-viewport={""}
      >
        <div
          className={"uk-section-secondary uk-width-auto uk-box-shadow-large"}
        >
          <SideNavigation />
        </div>
        <div className={"uk-width-expand"}>
          <Navigation />
          {children}
        </div>
      </div>
    </>
  );
}
