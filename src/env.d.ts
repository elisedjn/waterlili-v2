/// <reference types="astro/client" />

type Plausible = {
  (...args: unknown[]): void;
  q?: IArguments[];
  init?: (options?: Record<string, unknown>) => void;
  o?: Record<string, unknown>;
};

interface Window {
  plausible?: Plausible;
}

declare var plausible: Plausible;
