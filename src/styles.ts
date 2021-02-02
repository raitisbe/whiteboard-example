import {Circle, Fill, Stroke, Style} from 'ol/style';

const fill = new Fill({
  color: 'rgba(255,255,255,0.4)',
});

export const DefaultFeatureStyle = (feature, resolution) => {
  const stroke = new Stroke({
    color: '#3399CC',
    width: feature.get('highlightedByModel') ? 3 : 1.25,
  });
  return [
    new Style({
      image: new Circle({
        fill: fill,
        stroke: stroke,
        radius: 5,
      }),
      fill: fill,
      stroke: stroke,
    }),
  ];
};
