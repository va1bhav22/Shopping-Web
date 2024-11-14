import { Loader } from "components/core";
import { useAuth } from "hooks";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const PrivateRoute = ({ children }: any) => {
  const { user, isUserLoading } = useAuth();
  const { push, asPath } = useRouter();
  useEffect(() => {
    if (!user?._id && !isUserLoading) {
      push("/signin#signin-form");
    }
  }, [isUserLoading]);

  if (!user?._id) return <Loader visible={true} />;
  return <>{children}</>;
};

export default PrivateRoute;
