import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const domain = "dev-xm3iqpcr.us.auth0.com";
  const clientId = "MJcDlAqPrpZYiwMS0Zmd6v15NIs4viag";

  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate(window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;