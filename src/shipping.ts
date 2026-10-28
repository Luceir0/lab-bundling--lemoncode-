import log from "loglevel";

log.warn("*** Cargado el chunk del envío");

export const shippingCost = (total: number): number => (total >= 30 ? 0 : 3.9);
