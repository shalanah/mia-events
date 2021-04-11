const SvgFilter = () => (
  <svg style={{ position: "absolute", left: "-100%", top: "-100%" }}>
    <filter
      id="filter"
      x="-10%"
      y="-10%"
      width="120%"
      height="120%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
    >
      <feColorMatrix
        type="matrix"
        values="1 0 0 0 0
1 0 0 0 0
1 0 0 0 0
0 0 0 1 0"
        in="SourceGraphic"
        result="colormatrix"
      />
      <feComponentTransfer in="colormatrix" result="componentTransfer">
        <feFuncR type="table" tableValues="0.43 0.97" />
        <feFuncG type="table" tableValues="0.06 0.88" />
        <feFuncB type="table" tableValues="0.37 0.79" />
        <feFuncA type="table" tableValues="0 1" />
      </feComponentTransfer>
      <feBlend
        mode="normal"
        in="componentTransfer"
        in2="SourceGraphic"
        result="blend"
      />
    </filter>
  </svg>
);

export default SvgFilter;
