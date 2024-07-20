// utils/deviceCheck.js

export const isDesktopOrLaptop = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobile = /mobile|android|iphone|ipad|tablet|kindle|silk|opera mini/.test(userAgent);
    return !mobile;
  };
  