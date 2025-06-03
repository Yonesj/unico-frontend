
// ViewportManager.jsx
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import routes from "../../routes";

const ViewportManager = () => {
  const location = useLocation();

  const desktopPaths = routes
    .filter(route => route.desktop)
    .map(route => route.path);

  const isDesktop = desktopPaths.some(path =>
    location.pathname.startsWith(path)
  );

  const content = isDesktop
    ? "width=device-width, initial-scale=1.0"
    : "width=device-width, initial-scale=1.0";

  return (
    <Helmet>
      <meta name="viewport" content={content} />
    </Helmet>
  );
};

export default ViewportManager;

