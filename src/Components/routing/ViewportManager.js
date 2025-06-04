
import { useLocation, matchPath } from "react-router-dom";
import { Helmet } from "react-helmet";
import routes from "../../routes";

const extractDesktopPaths = (routes, parentPath = "") => {
  const paths = [];

  for (const route of routes) {
    const routePath = route.path || "";
    let fullPath;

    if (routePath === "*") {
      fullPath = parentPath;
    } else if (routePath.startsWith("/")) {
      fullPath = routePath;
    } else {
      fullPath = parentPath.endsWith("/")
        ? parentPath + routePath
        : parentPath + "/" + routePath;
    }

    if (route.desktop) {
      paths.push(fullPath);
    }

    if (route.children) {
      paths.push(...extractDesktopPaths(route.children, fullPath));
    }
  }

  return paths;
};

const ViewportManager = () => {
  const location = useLocation();

  const desktopPaths = extractDesktopPaths(routes);

  const isDesktop = desktopPaths.some((path) =>
    matchPath({ path, end: false }, location.pathname)
  );

  const content = isDesktop
    ? "width=1400"
    : "width=device-width, initial-scale=1.0";

  return (
    <Helmet>
      <meta name="viewport" content={content} />
    </Helmet>
  );
};

export default ViewportManager;
