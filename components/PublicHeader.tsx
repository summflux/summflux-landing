"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const navigationId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    previousFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = [
        menuButtonRef.current,
        ...(navigationRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") || []),
      ].filter(Boolean) as HTMLElement[];
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    navigationRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      previousFocusRef.current?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${open ? " is-open" : ""}`}>
      <div className="public-container site-header__inner">
        <Link className="brand-link" href="/" aria-label="SummFlux — página inicial" onClick={close}>
          <Image
            src="/assets/images/summflux-white.png"
            alt="SummFlux"
            width={178}
            height={42}
            priority
          />
        </Link>

        <button
          ref={menuButtonRef}
          className="site-menu-button"
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls={navigationId}
          onClick={() => setOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>

        {open ? (
          <button
            className="site-menu-backdrop"
            type="button"
            aria-label="Fechar menu"
            onClick={close}
          />
        ) : null}

        <nav ref={navigationRef} id={navigationId} className="site-navigation" aria-label="Navegação principal">
          <Link href="/#produto" onClick={close}>Produto</Link>
          <Link href="/#como-funciona" onClick={close}>Como funciona</Link>
          <Link href="/#ary" onClick={close}>Ary</Link>
          <Link href="/#planos" onClick={close}>Planos</Link>
          <Link href="/blog" onClick={close}>Blog</Link>
          <a className="site-navigation__login" href="https://app.summflux.com/" onClick={close}>
            Entrar
          </a>
          <Link className="button button--primary button--small" href="/#demonstracao" onClick={close}>
            Solicitar demonstração
          </Link>
        </nav>
      </div>
    </header>
  );
}
