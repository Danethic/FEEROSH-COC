// src/animations/fadeSlideAnimation.ts
import { createAnimation } from "@ionic/react";
import type { AnimationBuilder } from "@ionic/react";
import type { Animation } from "@ionic/core";

/**
 * Animación reutilizable para transiciones de página en IonRouterOutlet.
 * Ideal para pantallas fuera del sistema de tabs.
 */
export const fadeSlideAnimation: AnimationBuilder = (
  baseEl: HTMLElement,
  opts: any
): Animation => {
  const enteringEl = opts.enteringEl as HTMLElement;
  const leavingEl = opts.leavingEl as HTMLElement | undefined;

  const dir = opts.direction === "back" ? -1 : 1;

  const enteringAnimation = createAnimation()
    .addElement(enteringEl)
    .duration(400)
    .easing("cubic-bezier(0.36,0.66,0.04,1)")
    .beforeRemoveClass("ion-page-invisible")
    .fromTo("opacity", "0", "1")
    .fromTo("transform", `translateX(${30 * dir}px)`, "translateX(0)");

  const leavingAnimation = leavingEl
    ? createAnimation()
        .addElement(leavingEl)
        .duration(300)
        .easing("ease-out")
        .fromTo("opacity", "1", "0")
    : createAnimation();

  return createAnimation()
    .addElement(baseEl)
    .addAnimation([enteringAnimation, leavingAnimation]);
};
