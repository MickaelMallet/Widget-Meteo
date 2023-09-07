export const getTemperaturePercentage = (temperature) => {
  // on borne notre température entre 2 extrêmes pour le calcul du pourcentage
  const T_MIN = -20; // 0 %
  const T_MAX = 40; // 100 %

  let limitedTemperature = temperature;

  // on doit rester dans notre intervalle
  limitedTemperature = Math.max(T_MIN, limitedTemperature);
  limitedTemperature = Math.min(T_MAX, limitedTemperature);

  // on fait ensuite un produit en croix pour déterminer le pourcentage
  // max = 40 °C → 100 %
  //        t °C → t * 100 / 40
  //
  // mais notre intervalle démarre à -20 ; on doit le prendre en compte :
  // on doit « glisser » notre intervalle pour que le minimum arrive à 0.
  //
  // on ramène notre minimum à 0 et on garde la grandeur de notre intervalle
  // on doit donc enlever `min` de chaque côté
  // min : min - min = 0
  // max : max - min = 40 - (-20) = 60
  //
  // on doit aussi répercuter ce glissement à notre température
  // t = t - min
  //
  // notre calcul devient donc
  // min - min →   0 %
  // max - min → 100 %
  //   t - min → (t - min) * 100 / (max - min)
  //
  // Exemple : la moitié de notre intervalle est à 10 °C ((40 + -20) / 2)
  // on devrait donc avoir 50 %
  // 10 °C → (10 - (-20)) * 100 / (40 - (-20)) = 30 * 100 / 60 = 3000 / 60 = 50
  return (limitedTemperature - T_MIN) * 100 / (T_MAX - T_MIN);
};

export const getTemperatureHue = (percent) => {
  const HUE_MIN = 0; // rouge
  const HUE_MAX = 230; // bleu

  // notre intervalle (HUE_MAX - HUE_MIN) vaut 100 % de la jauge
  // 100 % → HUE_MAX - HUE_MIN                = 230 °
  //   1 % → (HUE_MAX - HUE_MIN) / 100        = 2.3 °
  //   p % → ((HUE_MAX - HUE_MIN) / 100) * p  = 2.3p °
  //
  // notre intervalle va de 230 ° à 0 ° (de bleu à rouge)
  // on retranche donc notre valeur calculée à HUE_MAX
  //
  // pour le milieu de notre intervalle (10 °C), on veut donc (230 + 0) / 2 = 115 °
  //  1 % → (HUE_MAX - HUE_MIN) / 100
  // 50 % → ((HUE_MAX - HUE_MIN) / 100) * 50 = 230 / 100 * 50 = 155
  // 230 - 115 = 115
  return HUE_MAX - ((HUE_MAX - HUE_MIN) / 100) * percent;
};