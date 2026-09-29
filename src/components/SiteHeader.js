import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { links } from "../data/content";

const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#projects", label: "Projects" },
  { href: "/#writing", label: "Writing" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

function nyTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  }).format(new Date());
}

export default function SiteHeader() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(nyTime);

  useEffect(() => {
    const id = setInterval(() => setTime(nyTime()), 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="Sonja Wong, home">
        <svg aria-hidden="true" focusable="false" viewBox="19.2 -764.1 2364.6 974.2">
          <g fill="currentColor">
            <path d="M464.6 -408.6 362.2 -393.5Q353.8 -420.5 328.8 -442.9Q303.8 -465.2 255.5 -465.2Q212 -465.2 182.9 -445.7Q153.8 -426.2 153.8 -396.1Q153.8 -369.8 173.3 -353.3Q192.8 -336.8 236.6 -326.7L325.5 -307.2Q401.1 -290.4 438.3 -253.9Q475.6 -217.4 475.6 -159.7Q475.6 -109.8 446.9 -71.2Q418.1 -32.6 367.3 -10.7Q316.4 11.2 249.8 11.2Q155.5 11.2 96.9 -29.2Q38.2 -69.5 25.2 -142.5L134.3 -157Q143.8 -117.7 173.1 -97.9Q202.5 -78 249.3 -78Q299.4 -78 329.8 -99Q360.2 -120 360.2 -150Q360.2 -200.1 284 -217.5L191.7 -238Q114.4 -255.3 77.6 -293.2Q40.8 -331.1 40.8 -389.5Q40.8 -438.6 68.1 -475.3Q95.4 -512 143.6 -532.3Q191.9 -552.7 254.5 -552.7Q345.5 -552.7 397.4 -513.4Q449.2 -474.1 464.6 -408.6Z" />
            <path d="M795.8 11.2Q718.1 11.2 660.5 -24Q602.9 -59.2 571.2 -122.6Q539.6 -186.1 539.6 -270Q539.6 -355.1 571.2 -418.7Q602.9 -482.3 660.5 -517.5Q718.1 -552.7 795.8 -552.7Q873.8 -552.7 931.5 -517.5Q989.1 -482.3 1020.9 -418.7Q1052.7 -355.1 1052.7 -270Q1052.7 -186.1 1020.9 -122.6Q989.1 -59.2 931.5 -24Q873.8 11.2 795.8 11.2ZM796.1 -82.5Q844.6 -82.5 876 -108Q907.4 -133.5 923 -176.3Q938.5 -219.1 938.5 -270.3Q938.5 -322.3 923 -365.1Q907.4 -407.9 876 -433.4Q844.6 -459 796.1 -459Q748.1 -459 716.5 -433.4Q684.9 -407.9 669.3 -365.1Q653.8 -322.3 653.8 -270.3Q653.8 -219.1 669.3 -176.3Q684.9 -133.5 716.5 -108Q748.1 -82.5 796.1 -82.5Z" />
            <path d="M1262.1 -322.5V0H1149.7V-545.9H1259.4V-455.1H1266.2Q1285 -499.8 1324.7 -526.3Q1364.3 -552.7 1425.9 -552.7Q1481.9 -552.7 1523.7 -529.3Q1565.5 -505.8 1588.8 -459.9Q1612 -414.1 1612 -346.9V0H1499.6V-331.9Q1499.6 -389.8 1469.3 -422.8Q1439 -455.7 1386.4 -455.7Q1350.5 -455.7 1322.4 -440Q1294.3 -424.2 1278.2 -394.6Q1262.1 -365.1 1262.1 -322.5Z" />
            <path d="M1725.2 -545.9H1837.6V34.5Q1838 90.3 1817.4 128.1Q1796.7 165.8 1757 185Q1717.2 204.1 1659.6 204.1H1636.9V108.7H1654.3Q1692.1 108.7 1708.5 89.5Q1724.8 70.2 1725.2 33.4Z" />
            <path d="M2103.2 11.7Q2051.3 11.7 2009.4 -7.5Q1967.5 -26.6 1943.3 -63.6Q1919 -100.5 1919 -154Q1919 -200.4 1936.7 -230.1Q1954.3 -259.9 1984.4 -277.6Q2014.4 -295.3 2051.5 -304.3Q2088.6 -313.3 2127.9 -317.7Q2176.6 -323.3 2206.8 -327.1Q2236.9 -330.9 2250.8 -339.5Q2264.7 -348.1 2264.7 -367V-369.7Q2264.7 -413.8 2239.3 -438.3Q2214 -462.8 2164.4 -462.8Q2113 -462.8 2083.1 -440.3Q2053.2 -417.8 2042.1 -389.1L1936.1 -410.1Q1952.9 -459.9 1986.8 -491.4Q2020.6 -522.9 2066 -537.8Q2111.5 -552.7 2163 -552.7Q2197.6 -552.7 2235 -544.7Q2272.3 -536.6 2304.9 -516Q2337.4 -495.4 2357.6 -458.2Q2377.9 -421 2377.9 -363.2V0H2268V-75H2264.1Q2253.6 -54 2232.8 -34.1Q2211.9 -14.2 2179.9 -1.3Q2147.9 11.7 2103.2 11.7ZM2129.1 -76.2Q2171.8 -76.2 2202.3 -93.1Q2232.7 -109.9 2248.9 -137.4Q2265.2 -164.8 2265.2 -196.2V-265Q2259.2 -259.6 2243.7 -255Q2228.2 -250.4 2208.5 -246.9Q2188.7 -243.4 2169.7 -240.9Q2150.7 -238.4 2137.9 -236.8Q2107.7 -232.7 2083 -223.5Q2058.3 -214.4 2043.7 -197.7Q2029.1 -181 2029.1 -153.4Q2029.1 -115.3 2057.3 -95.8Q2085.4 -76.2 2129.1 -76.2Z" />
            <path d="M1780.9 -627.6Q1752.4 -627.6 1732.1 -646.7Q1711.7 -665.8 1711.7 -692.9Q1711.7 -720 1732.1 -739Q1752.4 -758.1 1780.9 -758.1Q1809.4 -758.1 1829.8 -739Q1850.1 -720 1850.1 -692.9Q1850.1 -665.9 1829.8 -646.7Q1809.4 -627.6 1780.9 -627.6Z" />
          </g>
        </svg>
      </Link>

      <nav className={open ? "site-nav open" : "site-nav"} aria-label="Primary">
        {NAV.map((item) => (
          <Link key={item.href} to={item.href}>
            {item.label}
          </Link>
        ))}
        <span className="nav-external">
          <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={links.substack} target="_blank" rel="noreferrer">Substack</a>
        </span>
      </nav>

      <div className="header-tools">
        <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          GitHub
        </a>
        <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          LinkedIn
        </a>
        <a href={links.substack} target="_blank" rel="noreferrer" aria-label="Substack">
          Substack
        </a>
        <button
          className="search-trigger"
          type="button"
          onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
        >
          <span>Search</span>
          <kbd>⌘K</kbd>
        </button>
        <span className="header-time">{time} ET</span>
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
