import { useEffect, useRef } from "react";
import { createAnimation } from "@ionic/react";

/**
 * Observa el cambio de visibilidad del ion-page (en Tabs)
 * y aplica animaciones de entrada y salida.
 *
 * @param enterDirection Dirección de entrada: "up" | "left" | "right" | "down"
 * @param duration Duración en ms de la animación
 */
export const useTabVisibilityAnimation = (
  enterDirection: "up" | "left" | "right" | "down" = "up",
  duration: number = 450
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Función de entrada
    const playEnter = () => {
      const start =
        enterDirection === "up"
          ? "translateY(30px)"
          : enterDirection === "down"
          ? "translateY(-30px)"
          : enterDirection === "left"
          ? "translateX(-30px)"
          : "translateX(30px)";

      const anim = createAnimation()
        .addElement(el)
        .duration(duration)
        .easing("cubic-bezier(0.36,0.66,0.04,1)")
        .fromTo("opacity", "0", "1")
        .fromTo("transform", start, "translate(0, 0)");

      anim.play();
    };

    // Función de salida
    const playLeave = () => {
      const end =
        enterDirection === "up"
          ? "translateY(-30px)"
          : enterDirection === "down"
          ? "translateY(30px)"
          : enterDirection === "left"
          ? "translateX(30px)"
          : "translateX(-30px)";

      const anim = createAnimation()
        .addElement(el)
        .duration(300)
        .easing("ease-out")
        .fromTo("opacity", "1", "0")
        .fromTo("transform", "translate(0, 0)", end);

      anim.play();
    };

    // Observer de visibilidad
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "class") {
          const isHidden = el.classList.contains("ion-page-hidden");
          if (!isHidden) {
            // La página se hizo visible
            playEnter();
          } else {
            // La página se ocultó
            playLeave();
          }
        }
      }
    });

    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [enterDirection, duration]);

  return ref;
};
