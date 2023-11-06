// function OutSideClickHandler(ref: any, callback: any) {

//   function handleClickOutside(event: any) {
//     if (ref.current && !ref.current.contains(event.target)) {
//       callback();
//     }
//   }

//   document.addEventListener("mousedown", handleClickOutside);

//   return () => {
//     document.removeEventListener("mousedown", handleClickOutside);
//   };
// }

// export default OutSideClickHandler;
import { useEffect } from "react";

const OutSideClickHandler = (ref: any, fun: any) => {
  useEffect(() => {
    const listener = (e: any) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      fun();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, fun]);
};

export default OutSideClickHandler;
