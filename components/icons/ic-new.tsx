import React from "react";

const NewIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const clipPathId = React.useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19 19"
      fill="currentColor"
      {...props}
    >
      <g clipPath={`url(#${clipPathId})`}>
        <path d="m17.458 12-2.04-2.5 2-2.45a.91.91 0 0 0 .115-.97.965.965 0 0 0-.9-.58h-15.5a.955.955 0 0 0-.97.94v6.125a.955.955 0 0 0 .97.935h15.555a.965.965 0 0 0 .885-.545.91.91 0 0 0-.115-.955Zm-16.295.5v-6h15.39l-2.42 2.965 2.455 3.035H1.163Z" />
        <path d="M4.858 10.175 3.228 8h-.565v3.09h.565V8.92l1.63 2.17h.56V8h-.56v2.175ZM6.252 11.09h2.33v-.51H6.817v-.805h1.595V9.26H6.817v-.745h1.765V8h-2.33v3.09ZM12.423 10.215 11.693 8h-.61l-.735 2.215L9.688 8h-.615l.98 3.09h.555l.78-2.295.775 2.295h.565L13.703 8h-.615l-.665 2.215Z" />
      </g>
      <defs>
        <clipPath id={clipPathId}>
          <path fill="#fff" d="M.163.5h18v18h-18z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default NewIcon;
