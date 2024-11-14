//? CashFree Logic

import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const useCashfreePayment = () => {
  const loadScript = useCallback((src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }, []);

  const scriptUrl = "development";
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      loadScript(`https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js`);
      // loadScript(`https://sdk.cashfree.com/js/ui/2.0.0/cashfree.prod.js`);
    }
    return () => {
      isMounted = false;
    };
  }, [loadScript, scriptUrl]);

  const openCashfree = (paymentSessionId: string) => {
    const cashfree = new (window as any).Cashfree(paymentSessionId);
    cashfree?.redirect();
  };
  return { openCashfree };
};

export default useCashfreePayment;
