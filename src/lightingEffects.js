import { PhongMaterial } from "@luma.gl/core";
import {
  AmbientLight,
  LightingEffect,
  _SunLight as SunLight
} from "@deck.gl/core";

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 2.0
});

export function generateLighting(date) {
  const dirLight = new SunLight({
    timestamp: date.getTime(),
    color: [255, 255, 255],
    intensity: 1.0,
    _shadow: true
  });

  const lf = new LightingEffect({
    ambientLight,
    dirLight
  });

  lf.shadowColor = [0, 0, 0, 0.5];
  return lf;
}

export const material = new PhongMaterial({
  ambient: 0.1,
  diffuse: 0.2,
  shininess: 32,
  specularColor: [255, 255, 255]
});
