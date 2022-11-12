import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { useGlobal } from "../lib/context";

export default function Navigation() {
  const { data: session } = useSession();

  const router = useRouter();

  const { projects, editingProject, setEditingProject } = useGlobal();

  const logo = ["/", "/register", "/login"];
  const noGreeting = ["/", "/register", "/login", "/app/editor"];
  const noProjects = ["/", "/register", "/login", "/app/editor"];

  return (
    <nav
      className={"uk-navbar-container uk-light uk-box-shadow-medium"}
      data-uk-navbar={""}
    >
      <div className={"uk-navbar-left"}>
        {!noGreeting.includes(router.pathname) && (
          <div className={"uk-navbar-item"}>Hello, {session?.user?.name}!</div>
        )}
        {!noProjects.includes(router.pathname) && !!projects?.length && (
          <div className={"uk-navbar-item"}>
            <select
              value={editingProject?._id}
              className={"uk-select"}
              onChange={(event) =>
                setEditingProject(
                  projects.find((project) => project._id === event.target.value)
                )
              }
            >
              {projects?.map((project) => (
                <option value={project._id} key={project._id}>
                  {project?.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {logo.includes(router.pathname) && (
          <Link href={"/"} legacyBehavior>
            <a
              title={
                "Stupendous CMS by Stupendous Web | Clients manage their content. You manage their software."
              }
              className={"uk-navbar-item uk-logo uk-visible@s"}
            >
              Stupendous CMS
            </a>
          </Link>
        )}
      </div>
      <div className={"uk-navbar-right"}>
        {session?.user ? (
          <div className={"uk-navbar-item"}>
            <Link href={"/app"} legacyBehavior>
              <a className={"uk-button uk-button-primary uk-margin-right"}>
                Dashboard
              </a>
            </Link>
            <a
              className={"uk-button uk-button-primary"}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </a>
          </div>
        ) : (
          <div className={"uk-navbar-item"}>
            <Link href={"/register"} legacyBehavior>
              <a
                title={
                  "Get Started | Stupendous CMS by Stupendous Web | Clients manage their content. You manage their software."
                }
                className={"uk-button uk-button-primary uk-margin-right"}
              >
                Start for FREE!
              </a>
            </Link>
            <Link href={"/login"} legacyBehavior>
              <a
                title={
                  "Login | Stupendous CMS by Stupendous Web | Clients manage their content. You manage their software."
                }
                className={"uk-button uk-button-primary"}
              >
                Login
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
