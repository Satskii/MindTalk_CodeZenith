export const isChromeOrEdge = () => {
  return /Chrome/.test(navigator.userAgent) || /Edg/.test(navigator.userAgent);
};

export const requiresUserInteraction = () => {
  return isChromeOrEdge();
};