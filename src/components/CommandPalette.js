import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { links } from "../data/content";

const COMMANDS = [
  { id: "home", label: "Home", hint: "GH", to: "/" },
  { id: "work", label: "Work", hint: "GW", to: "/#work" },
  { id: "projects", label: "Projects", hint: "GP", to: "/#projects" },
  { id: "github", label: "GitHub", hint: "GG", href: links.github },
  { id: "linkedin", label: "LinkedIn", hint: "GI", href: links.linkedin },
];

function isTypingTarget(target) {
  if (!target) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}

export default function CommandPalette() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const chord = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter((item) => item.label.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    const onKey = (event) => {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }
      if (key === "/" && !isTypingTarget(event.target) && !open) {
        event.preventDefault();
        setOpen(true);
        return;
      }
      if (!open && !isTypingTarget(event.target) && !event.metaKey && !event.ctrlKey && !event.altKey) {
        if (key === "g") {
          chord.current = Date.now();
          return;
        }
        if (chord.current && Date.now() - chord.current < 900) {
          const jump = { h: "/", w: "/#work", p: "/#projects", l: "/#writing", a: "/#about", c: "/#contact" }[key];
          chord.current = null;
          if (jump) {
            event.preventDefault();
            navigate(jump);
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const openFromButton = () => setOpen(true);
    window.addEventListener("open-command-palette", openFromButton);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", openFromButton);
    };
  }, [navigate, open]);

  useEffect(() => {
    if (!open) return undefined;
    setQuery("");
    setActive(0);
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const go = (item) => {
    if (!item) return;
    setOpen(false);
    if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (item.to) navigate(item.to);
  };

  const onInputKey = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => Math.min(index + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[active]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  if (!open) return null;

  return (
    <div className="palette-backdrop" onClick={() => setOpen(false)}>
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        onClick={(event) => event.stopPropagation()}
      >
        <label className="palette-search">
          <span aria-hidden="true">⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKey}
            placeholder="Type a command or search…"
            aria-label="Type a command or search"
          />
        </label>
        <div className="palette-list">
          {results.length === 0 && <p className="palette-empty">No matches.</p>}
          {results.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={index === active ? "palette-item active" : "palette-item"}
              onMouseEnter={() => setActive(index)}
              onClick={() => go(item)}
            >
              <span>{item.label}</span>
              <kbd>{item.hint}</kbd>
            </button>
          ))}
        </div>
        <div className="palette-foot">
          <span>↑↓ to move</span>
          <span>↵ to open</span>
          <span>esc to close</span>
        </div>
      </div>
    </div>
  );
}
