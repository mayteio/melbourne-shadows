export function setMapStyle(map, theme) {
  if (!map) return;

  const colors =
    theme === "night"
      ? {
          roads: "#1e2e38",
          water: "#112330",
          parks: "#09101d",
          background: "#09101d"
        }
      : {
          roads: "#fff",
          water: "#cce3f0",
          parks: "#d7ead9",
          background: "#ebf0f5"
        };
  const style = map.getStyle();
  style.layers.forEach(layer => {
    if (
      ["line", "fill"].includes(layer.type) &&
      layer.id.match(/(bridge|road|tunnel)/g) !== null
    ) {
      layer.paint[`${layer.type}-color`] = colors.roads;
    }

    if (
      ["line", "fill"].includes(layer.type) &&
      layer.id.match(/(water)/g) !== null
    ) {
      layer.paint[`${layer.type}-color`] = colors.water;
    }

    if (
      ["line", "fill"].includes(layer.type) &&
      layer.id.match(/(park)/g) !== null
    ) {
      layer.paint[`${layer.type}-color`] = colors.parks;
    }

    if (layer.id === "background") {
      layer.paint["background-color"] = colors.background;
    }
  });

  map.setStyle(style);
}
