import { SVGProps } from "react";

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      {...props}
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path
          stroke="#ed8796"
          d="M.5 4.06c0 .77.24 1.52.7 2.13l2.24 3.96l.04.08h0c.13.17.32.27.52.27s.36-.09.48-.23h0l.03-.03l.08-.15l2.2-3.88c.46-.61.71-1.37.71-2.15A3.63 3.63 0 0 0 3.88.5C1.95.5.5 2.1.5 4.06"
        ></path>
        <path
          stroke="#ed8796"
          d="M5.5 4A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 2.5 4A1.5 1.5 0 0 1 4 2.5A1.5 1.5 0 0 1 5.5 4"
        ></path>
        <path
          stroke="#eed49f"
          d="M10 4.5h3.5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V13"
        ></path>
        <path
          stroke="#eed49f"
          d="M13.5 9c-.33-.33-.83-.5-1.5-.5c-1 0-1.5.5-1.5 1s.5 1 1.5 1s1.5.5 1.5 1s-.5 1-1.5 1c-.67 0-1.17-.17-1.5-.5m-2-3.5v3a1 1 0 1 1-2 0"
        ></path>
      </g>
    </svg>
  );
}
