/* @ds-bundle: {"format":4,"namespace":"ArayhanDesignSystem_bd91f4","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"ScrollProgress","sourcePath":"components/core/ScrollProgress.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"SocialIcon","sourcePath":"components/core/SocialLinks.jsx"},{"name":"SocialLinks","sourcePath":"components/core/SocialLinks.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"ThemeToggle","sourcePath":"components/core/ThemeToggle.jsx"},{"name":"TimelineItem","sourcePath":"components/core/TimelineItem.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"de2e79ff9a2d","components/core/Button.jsx":"0bbbfaadeded","components/core/Card.jsx":"e53a4314a85b","components/core/IconButton.jsx":"321aa5880b1d","components/core/Input.jsx":"9dfd0cddb894","components/core/ScrollProgress.jsx":"3f629749abf2","components/core/SectionHeading.jsx":"26ec0e3402ad","components/core/SocialLinks.jsx":"2955999b3fec","components/core/Tag.jsx":"257388120c04","components/core/ThemeToggle.jsx":"fa4a62a86051","components/core/TimelineItem.jsx":"0f945b9a5d09","ui_kits/website/BlogScreens.jsx":"7c5774d62574","ui_kits/website/ContactScreen.jsx":"1005ced1d697","ui_kits/website/HomeScreen.jsx":"4fc11aaeea05","ui_kits/website/Isometric.jsx":"a2074596e710","ui_kits/website/Shared.jsx":"c49ea36ba47d","ui_kits/website/UsesScreen.jsx":"a12b2bf51784","ui_kits/website/data.js":"a0697facfe31","ui_kits/website/image-slot.js":"0394ad34f685"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ArayhanDesignSystem_bd91f4 = window.ArayhanDesignSystem_bd91f4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function Badge({
  tone = 'accent',
  dot = false,
  children,
  style
}) {
  const tones = {
    accent: {
      background: 'var(--accent-soft)',
      color: 'var(--text-accent)',
      border: '1px solid var(--accent-soft-border)'
    },
    neutral: {
      background: 'var(--bg-muted)',
      color: 'var(--text-body)',
      border: '1px solid var(--border-default)'
    },
    open: {
      background: 'color-mix(in srgb, var(--surface-card) 60%, transparent)',
      color: 'var(--text-heading)',
      border: '1px solid var(--border-strong)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      borderRadius: 'var(--radius-full)',
      padding: '5px 13px',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      ...tones[tone],
      ...style
    }
  }, (dot || tone === 'open') && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 99,
      background: 'var(--status-open)',
      flex: 'none',
      animation: 'ds-pulse 2s infinite'
    }
  }), /*#__PURE__*/React.createElement("style", null, '@keyframes ds-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,.5);} 60% { box-shadow: 0 0 0 6px rgba(16,185,129,0);} }'), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  href,
  disabled,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const sizes = {
    sm: {
      padding: '6px 14px',
      fontSize: 'var(--text-sm)',
      height: 34
    },
    md: {
      padding: '10px 20px',
      fontSize: 'var(--text-sm)',
      height: 42
    },
    lg: {
      padding: '12px 26px',
      fontSize: 'var(--text-base)',
      height: 50
    }
  };
  const variants = {
    primary: {
      background: hover ? 'var(--interactive-primary-hover)' : 'var(--interactive-primary)',
      color: 'var(--text-on-primary)',
      border: '1px solid transparent'
    },
    secondary: {
      background: hover ? 'var(--bg-muted)' : 'var(--surface-card)',
      color: 'var(--text-heading)',
      border: '1px solid var(--border-strong)'
    },
    ghost: {
      background: hover ? 'var(--bg-muted)' : 'transparent',
      color: 'var(--text-heading)',
      border: '1px solid transparent'
    }
  };
  const shine = variant === 'primary' ? 'color-mix(in srgb, var(--text-on-primary) 30%, transparent)' : 'color-mix(in srgb, var(--text-heading) 14%, transparent)';
  const s = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--weight-semibold)',
    borderRadius: 'var(--radius-full)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'all var(--duration-fast) var(--ease-out)',
    transform: active && !disabled ? 'scale(0.97)' : hover && !disabled ? 'perspective(600px) rotateX(-5deg) translateY(-2px)' : 'none',
    boxShadow: hover && !disabled ? 'var(--shadow-md)' : 'none',
    ...sizes[size],
    ...variants[variant],
    ...style
  };
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    disabled: disabled,
    onClick: onClick,
    style: s,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false)
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: '55%',
      pointerEvents: 'none',
      background: `linear-gradient(105deg, transparent, ${shine}, transparent)`,
      transform: hover && !disabled ? 'translateX(260%)' : 'translateX(-140%)',
      transition: hover && !disabled ? 'transform 650ms var(--ease-out)' : 'none'
    }
  }), icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  interactive = false,
  href,
  children,
  style,
  onClick,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const lifted = interactive && hover;
  const s = {
    display: 'block',
    background: 'color-mix(in srgb, var(--surface-card) 72%, transparent)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid ' + (lifted ? 'var(--border-strong)' : 'var(--border-default)'),
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-5)',
    transform: lifted ? 'perspective(900px) rotateX(1.5deg) translateY(-3px) scale(1.01)' : 'none',
    transition: 'all var(--duration-base) var(--ease-out)',
    color: 'inherit',
    textDecoration: 'none',
    cursor: interactive ? 'pointer' : 'default',
    ...style
  };
  const Tag = href ? 'a' : 'div';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    onClick: onClick,
    style: s,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  label,
  children,
  onClick,
  href,
  size = 40,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const s = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size,
    height: size,
    borderRadius: 'var(--radius-full)',
    background: hover ? 'var(--bg-muted)' : 'transparent',
    border: '1px solid ' + (hover ? 'var(--border-strong)' : 'var(--border-default)'),
    color: 'var(--text-heading)',
    cursor: 'pointer',
    transition: 'all var(--duration-fast) var(--ease-out)',
    ...style
  };
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    "aria-label": label,
    title: label,
    href: href,
    onClick: onClick,
    style: s,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({
  label,
  hint,
  textarea = false,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? 'in-' + label.toLowerCase().replace(/\W+/g, '-') : undefined);
  const s = {
    width: '100%',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-base)',
    color: 'var(--text-heading)',
    background: 'color-mix(in srgb, var(--surface-card) 70%, transparent)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid ' + (focus ? 'var(--border-accent)' : 'var(--border-default)'),
    borderRadius: 'var(--radius-sm)',
    padding: '11px 14px',
    outline: 'none',
    boxShadow: focus ? 'var(--focus-ring)' : 'none',
    transition: 'all var(--duration-fast) var(--ease-out)',
    resize: textarea ? 'vertical' : undefined,
    minHeight: textarea ? 120 : undefined,
    lineHeight: 'var(--leading-normal)',
    boxSizing: 'border-box',
    ...style
  };
  const Field = textarea ? 'textarea' : 'input';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-heading)'
    }
  }, label), /*#__PURE__*/React.createElement(Field, _extends({
    id: inputId,
    style: s,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/ScrollProgress.jsx
try { (() => {
function ScrollProgress({
  target,
  height = 3
}) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const el = target && target.current ? target.current : null;
    const scroller = el || window;
    const read = () => {
      const max = el ? el.scrollHeight - el.clientHeight : document.documentElement.scrollHeight - window.innerHeight;
      const top = el ? el.scrollTop : window.scrollY;
      setP(max > 0 ? Math.min(1, top / max) : 0);
    };
    read();
    scroller.addEventListener('scroll', read, {
      passive: true
    });
    return () => scroller.removeEventListener('scroll', read);
  }, [target]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height,
      zIndex: 100,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: p * 100 + '%',
      background: 'var(--accent)',
      borderRadius: '0 2px 2px 0',
      transition: 'width 80ms linear'
    }
  }));
}
Object.assign(__ds_scope, { ScrollProgress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ScrollProgress.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function SectionHeading({
  eyebrow,
  title,
  description,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      maxWidth: 640,
      ...style
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      fontWeight: 'var(--weight-medium)'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-3xl)'
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-body)',
      fontSize: 'var(--text-base)'
    }
  }, description));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/SocialLinks.jsx
try { (() => {
// Icons: Phosphor duotone (https://phosphoricons.com). Consuming pages must include:
// <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/duotone/style.css">
const ICON_CLASS = {
  github: 'ph-duotone ph-github-logo',
  linkedin: 'ph-duotone ph-linkedin-logo',
  instagram: 'ph-duotone ph-instagram-logo',
  medium: 'ph-duotone ph-medium-logo'
};
function SocialIcon({
  name,
  size = 18
}) {
  return /*#__PURE__*/React.createElement("i", {
    className: ICON_CLASS[name],
    "aria-hidden": "true",
    style: {
      fontSize: size,
      lineHeight: 1
    }
  });
}
const LINKS = [{
  name: 'github',
  label: 'GitHub',
  href: 'https://github.com/arayhan'
}, {
  name: 'linkedin',
  label: 'LinkedIn',
  href: 'https://www.linkedin.com/in/arayhan/'
}, {
  name: 'instagram',
  label: 'Instagram',
  href: 'https://www.instagram.com/arayhan_/'
}, {
  name: 'medium',
  label: 'Medium',
  href: 'https://medium.com/@arayhan'
}];
function SocialLinks({
  size = 40,
  links = LINKS
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, links.map(l => /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    key: l.name,
    label: l.label,
    href: l.href,
    size: size,
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement(SocialIcon, {
    name: l.name,
    size: Math.round(size * 0.45)
  }))));
}
Object.assign(__ds_scope, { SocialIcon, SocialLinks });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SocialLinks.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: 'var(--radius-sm)',
      padding: '3px 9px',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      background: 'color-mix(in srgb, var(--bg-muted) 65%, transparent)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      color: 'var(--text-body)',
      border: '1px solid var(--border-default)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/core/ThemeToggle.jsx
try { (() => {
function ThemeToggle({
  theme,
  onToggle,
  size = 40
}) {
  const [hover, setHover] = React.useState(false);
  const dark = theme === 'dark';
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": dark ? 'Switch to light mode' : 'Switch to dark mode',
    title: "Toggle theme",
    onClick: onToggle,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius: 'var(--radius-full)',
      background: hover ? 'var(--bg-muted)' : 'transparent',
      border: '1px solid ' + (hover ? 'var(--border-strong)' : 'var(--border-default)'),
      color: 'var(--text-heading)',
      cursor: 'pointer',
      transition: 'all var(--duration-fast) var(--ease-out)'
    }
  }, dark ? /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M6.34 17.66l-1.41 1.41 M19.07 4.93l-1.41 1.41"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"
  })));
}
Object.assign(__ds_scope, { ThemeToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ThemeToggle.jsx", error: String((e && e.message) || e) }); }

// components/core/TimelineItem.jsx
try { (() => {
function TimelineItem({
  period,
  title,
  org,
  description,
  tags = [],
  last = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 'none',
      width: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: 99,
      marginTop: 5,
      flex: 'none',
      background: 'var(--bg-page)',
      border: '2.5px solid var(--text-heading)'
    }
  }), !last && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      flex: 1,
      background: 'var(--border-default)',
      marginTop: 6
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: last ? 0 : 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, period), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-xl)',
      marginTop: 6
    }
  }, title, org && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontWeight: 500
    }
  }, " \xB7 ", org)), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      maxWidth: 560
    }
  }, description), tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap',
      marginTop: 12
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t
  }, t)))));
}
Object.assign(__ds_scope, { TimelineItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TimelineItem.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/BlogScreens.jsx
try { (() => {
// Blog list + detail (dummy data)
const BDS = window.ArayhanDesignSystem_bd91f4;
const BD = window.SITE_DATA;
const PAGE_SIZE = 3;
function SidebarBlock({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border-default)',
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, children));
}
function Pagination({
  page,
  pages,
  setPage,
  total
}) {
  if (pages <= 1) return null;
  const btn = (label, target, disabled, active) => /*#__PURE__*/React.createElement("button", {
    key: label + target,
    disabled: disabled,
    onClick: () => {
      setPage(target);
      window.scrollTo({
        top: 0
      });
    },
    style: {
      minWidth: 36,
      height: 36,
      padding: '0 10px',
      borderRadius: 'var(--radius-sm)',
      cursor: disabled ? 'default' : 'pointer',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      border: '1px solid ' + (active ? 'transparent' : 'var(--border-default)'),
      background: active ? 'var(--interactive-primary)' : 'transparent',
      color: active ? 'var(--text-on-primary)' : disabled ? 'var(--text-muted)' : 'var(--text-body)',
      opacity: disabled && !active ? 0.5 : 1,
      transition: 'all var(--duration-fast) var(--ease-out)'
    }
  }, label);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      marginTop: 36
    }
  }, btn('←', page - 1, page === 0, false), Array.from({
    length: pages
  }, (_, i) => btn(String(i + 1), i, false, i === page)), btn('→', page + 1, page === pages - 1, false), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, total, " posts"));
}
function BlogListScreen({
  openPost
}) {
  const [page, setPage] = React.useState(0);
  const [query, setQuery] = React.useState('');
  const [topic, setTopic] = React.useState(null);
  const [sort, setSort] = React.useState('newest');
  const topics = React.useMemo(() => {
    const counts = {};
    BD.blog.forEach(p => p.tags.forEach(t => {
      counts[t] = (counts[t] || 0) + 1;
    }));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, []);
  const filtered = React.useMemo(() => {
    let list = BD.blog.filter(p => {
      const q = query.trim().toLowerCase();
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      const matchT = !topic || p.tags.includes(topic);
      return matchQ && matchT;
    });
    list = [...list].sort((a, b) => {
      const da = new Date(a.date),
        db = new Date(b.date);
      return sort === 'newest' ? db - da : da - db;
    });
    return list;
  }, [query, topic, sort]);
  const pages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const resetPage = () => setPage(0);
  return /*#__PURE__*/React.createElement("main", {
    "data-screen-label": "blog-list"
  }, /*#__PURE__*/React.createElement(PageHero, {
    path: "~/blog",
    title: "Writing",
    ghost: "BLOG",
    description: "Notes on frontend architecture, realtime systems, and teaching developers."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 440,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-magnifying-glass",
    style: {
      position: 'absolute',
      left: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: 16,
      color: 'var(--text-muted)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    value: query,
    onChange: e => {
      setQuery(e.target.value);
      resetPage();
    },
    placeholder: "Search posts\u2026",
    style: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '12px 16px 12px 40px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-heading)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-full)',
      outline: 'none'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid-blog",
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '48px var(--container-pad) 64px',
      display: 'grid',
      gridTemplateColumns: '1fr 240px',
      gap: 56,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, visible.map(p => /*#__PURE__*/React.createElement(BDS.Card, {
    key: p.id,
    interactive: true,
    onClick: () => openPost(p.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-blogcard",
    style: {
      display: 'grid',
      gridTemplateColumns: '190px 1fr',
      gap: 20,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '4/3',
      borderRadius: 12,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: 'cover-' + p.id,
    shape: "rounded",
    radius: "12",
    src: p.cover,
    placeholder: "Drop a cover"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, p.date, " \xB7 ", p.read, " read \xB7 ", p.views, " views"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-xl)',
      margin: '10px 0 0'
    }
  }, p.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0',
      fontSize: 'var(--text-sm)'
    }
  }, p.excerpt), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 14,
      alignItems: 'center'
    }
  }, p.tags.map(t => /*#__PURE__*/React.createElement(BDS.Tag, {
    key: t
  }, t)), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-heading)',
      fontWeight: 500
    }
  }, "Read \u2192")))))), visible.length === 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)'
    }
  }, "No posts match \u201C", query || topic, "\u201D.")), /*#__PURE__*/React.createElement(Pagination, {
    page: page,
    pages: pages,
    setPage: setPage,
    total: filtered.length
  })), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'sticky',
      top: 96,
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(SidebarBlock, {
    title: "Topics"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, [[null, BD.blog.length, 'All'], ...topics.map(([t, c]) => [t, c, t])].map(([t, c, label]) => {
    const on = topic === t;
    return /*#__PURE__*/React.createElement("button", {
      key: label,
      onClick: () => {
        setTopic(t);
        resetPage();
      },
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        cursor: 'pointer',
        padding: '5px 12px',
        borderRadius: 'var(--radius-full)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        fontWeight: 500,
        border: '1px solid ' + (on ? 'transparent' : 'var(--border-default)'),
        background: on ? 'var(--interactive-primary)' : 'transparent',
        color: on ? 'var(--text-on-primary)' : 'var(--text-body)',
        transition: 'all var(--duration-fast) var(--ease-out)'
      }
    }, label, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        opacity: 0.6
      }
    }, c));
  }))), /*#__PURE__*/React.createElement(SidebarBlock, {
    title: "Sort by date"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [['newest', 'Newest first'], ['oldest', 'Oldest first']].map(([v, label]) => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => {
      setSort(v);
      resetPage();
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      cursor: 'pointer',
      padding: 0,
      border: 'none',
      background: 'transparent',
      textAlign: 'left',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: sort === v ? 'var(--text-heading)' : 'var(--text-muted)',
      fontWeight: sort === v ? 600 : 400
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 99,
      flex: 'none',
      background: sort === v ? 'var(--interactive-primary)' : 'transparent',
      border: '2px solid ' + (sort === v ? 'var(--interactive-primary)' : 'var(--border-strong)')
    }
  }), label)))))));
}

// ---------- rich post blocks ----------
function MathBlock({
  tex
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let tries = 0;
    const t = setInterval(() => {
      if (window.katex && ref.current) {
        window.katex.render(tex, ref.current, {
          displayMode: true,
          throwOnError: false
        });
        clearInterval(t);
      } else if (++tries > 40) clearInterval(t);
    }, 150);
    return () => clearInterval(t);
  }, [tex]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      padding: '18px 0',
      overflowX: 'auto',
      color: 'var(--text-heading)'
    }
  }, tex);
}
function CodeBlock({
  code,
  lang
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let tries = 0;
    const t = setInterval(() => {
      if (window.hljs && ref.current) {
        ref.current.removeAttribute('data-highlighted');
        window.hljs.highlightElement(ref.current);
        clearInterval(t);
      } else if (++tries > 40) clearInterval(t);
    }, 150);
    return () => clearInterval(t);
  }, [code]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      border: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 14px',
      background: '#0B1120',
      borderBottom: '1px solid rgba(148,163,184,.15)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 99,
      background: '#334155'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 99,
      background: '#334155'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 99,
      background: '#334155'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: '#64748B'
    }
  }, lang)), /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      background: '#0B1120'
    }
  }, /*#__PURE__*/React.createElement("code", {
    ref: ref,
    className: 'language-' + lang,
    style: {
      display: 'block',
      padding: '16px 18px',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      lineHeight: 1.65,
      background: 'transparent'
    }
  }, code)));
}
function RichParagraph({
  parts,
  openPost
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, parts.map((seg, i) => {
    if (seg.mark) return /*#__PURE__*/React.createElement("mark", {
      key: i,
      style: {
        background: 'var(--accent-soft)',
        color: 'var(--text-heading)',
        padding: '1px 5px',
        borderRadius: 4
      }
    }, seg.text);
    if (seg.href || seg.post) return /*#__PURE__*/React.createElement("a", {
      key: i,
      href: seg.href || '#',
      target: seg.post ? undefined : '_blank',
      rel: "noreferrer",
      onClick: seg.post ? e => {
        e.preventDefault();
        openPost && openPost(seg.post);
      } : undefined,
      style: {
        textDecoration: 'underline',
        textUnderlineOffset: 3
      }
    }, seg.text);
    return /*#__PURE__*/React.createElement("span", {
      key: i
    }, seg.text);
  }));
}
function PostBody({
  post,
  openPost
}) {
  const oldFormat = Array.isArray(post.body[0]);
  let h = -1;
  const blocks = oldFormat ? post.body.flatMap(([head, text]) => [{
    t: 'h2',
    text: head
  }, {
    t: 'p',
    parts: [{
      text
    }]
  }]) : post.body;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, blocks.map((b, i) => {
    if (b.t === 'h2') {
      h += 1;
      return /*#__PURE__*/React.createElement("h2", {
        key: i,
        id: 'h-' + h,
        style: {
          fontSize: 'var(--text-2xl)',
          marginTop: h > 0 ? 12 : 0
        }
      }, b.text);
    }
    if (b.t === 'p') return /*#__PURE__*/React.createElement(RichParagraph, {
      key: i,
      parts: b.parts,
      openPost: openPost
    });
    if (b.t === 'code') return /*#__PURE__*/React.createElement(CodeBlock, {
      key: i,
      code: b.code,
      lang: b.lang
    });
    if (b.t === 'math') return /*#__PURE__*/React.createElement(MathBlock, {
      key: i,
      tex: b.tex
    });
    if (b.t === 'img') return /*#__PURE__*/React.createElement("figure", {
      key: i,
      style: {
        margin: '6px 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        aspectRatio: '16/9',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("image-slot", {
      id: b.slot,
      shape: "rounded",
      radius: "10",
      placeholder: "Drop a diagram or screenshot"
    })), /*#__PURE__*/React.createElement("figcaption", {
      style: {
        marginTop: 10,
        fontFamily: 'var(--font-hand)',
        fontSize: 18,
        color: 'var(--text-muted)',
        textAlign: 'center',
        transform: 'rotate(-0.5deg)'
      }
    }, b.caption));
    return null;
  }));
}

// ---------- comments ----------
function Avatar({
  name,
  isAuthor
}) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 99,
      flex: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: isAuthor ? 'var(--interactive-primary)' : 'var(--bg-muted)',
      color: isAuthor ? 'var(--text-on-primary)' : 'var(--text-body)',
      border: '1px solid ' + (isAuthor ? 'transparent' : 'var(--border-default)'),
      fontFamily: 'var(--font-display)',
      fontSize: 13,
      fontWeight: 600
    }
  }, initials);
}
function CommentBubble({
  c
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: c.author,
    isAuthor: c.isAuthor
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: 'var(--text-heading)',
      fontSize: 'var(--text-sm)'
    }
  }, c.author), c.isAuthor && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 9,
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      padding: '2px 8px',
      borderRadius: 99,
      background: 'var(--accent-soft)',
      color: 'var(--text-accent)',
      border: '1px solid var(--accent-soft-border)'
    }
  }, "Author"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--text-muted)'
    }
  }, c.date)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 'var(--text-sm)'
    }
  }, c.text)));
}
function Comments({
  post
}) {
  const [items, setItems] = React.useState(post.comments || []);
  const [draft, setDraft] = React.useState('');
  const count = items.reduce((n, c) => n + 1 + (c.replies || []).length, 0);
  const submit = e => {
    e.preventDefault();
    if (!draft.trim()) return;
    setItems([...items, {
      author: 'Guest',
      date: 'Just now',
      text: draft.trim(),
      replies: []
    }]);
    setDraft('');
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56,
      borderTop: '1px solid var(--border-default)',
      paddingTop: 32
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-2xl)'
    }
  }, "Comments ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-base)'
    }
  }, "(", count, ")")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 26,
      marginTop: 26
    }
  }, items.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement(CommentBubble, {
    c: c
  }), (c.replies || []).length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 18,
      marginTop: 16,
      paddingLeft: 30,
      borderLeft: '2px solid var(--border-default)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, c.replies.map((r, j) => /*#__PURE__*/React.createElement(CommentBubble, {
    key: j,
    c: r
  }))))), items.length === 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, "No comments yet \u2014 be the first.")), /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 30,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Guest User"
  }), /*#__PURE__*/React.createElement("textarea", {
    value: draft,
    onChange: e => setDraft(e.target.value),
    placeholder: "Join the discussion\u2026",
    rows: 2,
    style: {
      flex: 1,
      boxSizing: 'border-box',
      padding: '12px 14px',
      resize: 'vertical',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-heading)',
      lineHeight: 1.6,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement(BDS.Button, {
    variant: "primary"
  }, "Comment")));
}
function BlogPostScreen({
  postId,
  back,
  openPost
}) {
  const p = BD.blog.find(x => x.id === postId) || BD.blog[0];
  const [activeH, setActiveH] = React.useState(0);
  return /*#__PURE__*/React.createElement("main", {
    "data-screen-label": "blog-post",
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '110px var(--container-pad) 56px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: back,
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      padding: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-accent)',
      fontWeight: 500
    }
  }, "\u2190 All posts"), /*#__PURE__*/React.createElement("div", {
    className: "grid-post",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 220px',
      gap: 56,
      marginTop: 28,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("article", {
    style: {
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, p.date, " \xB7 ", p.read, " read \xB7 ", p.views, " views"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--text-4xl)',
      margin: '14px 0 0'
    }
  }, p.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 16
    }
  }, p.tags.map(t => /*#__PURE__*/React.createElement(BDS.Tag, {
    key: t
  }, t))), /*#__PURE__*/React.createElement(PostBody, {
    post: p,
    openPost: openPost
  }), /*#__PURE__*/React.createElement(Comments, {
    post: p
  })), /*#__PURE__*/React.createElement("aside", {
    className: "toc-aside",
    style: {
      position: 'sticky',
      top: 96
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "On this page"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      marginTop: 12,
      borderLeft: '1px solid var(--border-default)'
    }
  }, p.toc.map((h, i) => /*#__PURE__*/React.createElement("a", {
    key: h,
    href: '#h-' + i,
    onClick: e => {
      e.preventDefault();
      setActiveH(i);
      const el = document.getElementById('h-' + i);
      if (el) window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 90,
        behavior: 'smooth'
      });
    },
    style: {
      padding: '6px 14px',
      fontSize: 'var(--text-sm)',
      marginLeft: -1,
      borderLeft: '2px solid ' + (activeH === i ? 'var(--accent)' : 'transparent'),
      color: activeH === i ? 'var(--text-accent)' : 'var(--text-body)',
      fontWeight: activeH === i ? 500 : 400
    }
  }, h))))));
}
Object.assign(window, {
  BlogListScreen,
  BlogPostScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/BlogScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ContactScreen.jsx
try { (() => {
// Contact — standalone page
const CDS = window.ArayhanDesignSystem_bd91f4;
function ContactScreen() {
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("main", {
    "data-screen-label": "contact"
  }, /*#__PURE__*/React.createElement(PageHero, {
    path: "~/contact",
    title: "Let's talk",
    ghost: "TALK",
    description: "Hiring for a frontend lead, or need a senior pair of hands on a project?"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid-2",
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '48px var(--container-pad) 64px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 56,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-hand)',
      fontSize: 28,
      color: 'var(--text-heading)',
      transform: 'rotate(-2deg)',
      width: 'fit-content'
    }
  }, "I reply within 48 hours \u2014 promise! ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "\u2733")), /*#__PURE__*/React.createElement(CDS.SocialLinks, null), /*#__PURE__*/React.createElement(CDS.Button, {
    variant: "secondary",
    href: "../../assets/cv-rayhan.pdf",
    target: "_blank",
    style: {
      width: 'fit-content'
    },
    icon: /*#__PURE__*/React.createElement("i", {
      className: "ph-duotone ph-file-pdf",
      style: {
        fontSize: 18
      }
    })
  }, "Download CV (PDF)"), /*#__PURE__*/React.createElement(IsoInline, {
    variant: "grid",
    size: 210
  }))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 120
  }, sent ? /*#__PURE__*/React.createElement(CDS.Card, null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-xl)'
    }
  }, "Message sent"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0',
      fontSize: 'var(--text-sm)'
    }
  }, "Thanks \u2014 I'll get back to you within 48 hours.")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 20,
      padding: 24,
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(CDS.Input, {
    label: "Name",
    placeholder: "Your name",
    required: true
  }), /*#__PURE__*/React.createElement(CDS.Input, {
    label: "Email",
    type: "email",
    placeholder: "you@company.com",
    required: true
  }), /*#__PURE__*/React.createElement(CDS.Input, {
    label: "Message",
    textarea: true,
    placeholder: "What are you building?",
    required: true
  }), /*#__PURE__*/React.createElement(CDS.Button, {
    variant: "primary",
    size: "lg",
    style: {
      width: 'fit-content'
    }
  }, "Send message")))));
}
Object.assign(window, {
  ContactScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ContactScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Home v3 — bento/spatial: rounded tiles with 3D hover tilt, no character illustration.
const HDS = window.ArayhanDesignSystem_bd91f4;
const D = window.SITE_DATA;

// ---------- hooks & text animation ----------
function useInView(threshold = 0.2) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, {
      threshold
    });
    io.observe(el);
    // Fallback: the initial IO delivery can report false if the frame is hidden/zero-sized
    // during load; above-the-fold elements then never get a `true` entry. Re-check manually.
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight && r.width > 0) setInView(true);
    };
    const t1 = setTimeout(check, 300);
    const t2 = setTimeout(check, 900);
    return () => {
      io.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  return [ref, inView];
}
function Reveal({
  children,
  delay = 0,
  style
}) {
  const [ref, inView] = useInView(0.15);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(28px)',
      transition: `opacity var(--duration-slow) var(--ease-out) ${delay}ms, transform var(--duration-slow) var(--ease-out) ${delay}ms`,
      ...style
    }
  }, children);
}

// Per-word masked rise — words slide up out of an overflow-hidden clip. `accents` words render in blue.
function RiseText({
  text,
  as = 'h2',
  fontSize,
  delay = 0,
  stagger = 55,
  accents = [],
  style
}) {
  const [ref, inView] = useInView(0.3);
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, {
    ref: ref,
    style: {
      fontSize,
      margin: 0,
      ...style
    }
  }, text.split(' ').map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-block',
      overflow: 'hidden',
      verticalAlign: 'top',
      paddingBottom: '0.08em',
      marginBottom: '-0.08em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      color: accents.includes(w) ? 'var(--text-accent)' : undefined,
      transform: inView ? 'none' : 'translateY(115%) rotate(4deg)',
      transition: `transform 650ms var(--ease-out) ${delay + i * stagger}ms`,
      whiteSpace: 'pre'
    }
  }, w + (i < text.split(' ').length - 1 ? ' ' : '')))));
}

// Oversized outlined word behind a section (à la editorial portfolio heroes); slides in with scroll.
function GhostWord({
  text
}) {
  const ref = React.useRef(null);
  const p = useSectionProgress(ref);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 18,
      right: -10,
      zIndex: 0,
      pointerEvents: 'none',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      fontSize: 'clamp(90px, 16vw, 210px)',
      letterSpacing: '-0.03em',
      color: 'transparent',
      WebkitTextStroke: '1.5px var(--border-default)',
      opacity: 0.8,
      transform: `translateX(${(1 - p) * 70}px)`,
      transition: 'transform 120ms linear'
    }
  }, text);
}

// Numbered editorial heading: 01 / EYEBROW — then animated title.
function FancyHeading({
  num,
  eyebrow,
  title,
  description,
  titleSize = 'var(--text-3xl)'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-accent)'
    }
  }, num), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      height: 1,
      background: 'var(--border-strong)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, eyebrow))), /*#__PURE__*/React.createElement(RiseText, {
    text: title,
    fontSize: titleSize
  }), description && /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, description)));
}

// Ambient floating orbs + star — immersive depth for sections and page heroes.
function Orbs() {
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "float-a",
    style: {
      position: 'absolute',
      top: '12%',
      right: '5%',
      width: 34,
      height: 34,
      borderRadius: 99,
      background: 'radial-gradient(circle at 32% 30%, var(--blue-300), var(--blue-600))',
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "float-c",
    style: {
      position: 'absolute',
      bottom: '5%',
      left: '1%',
      width: 16,
      height: 16,
      borderRadius: 99,
      background: 'radial-gradient(circle at 32% 30%, var(--slate-300), var(--slate-500))',
      opacity: 0.35
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "star star-2",
    style: {
      position: 'absolute',
      top: '22%',
      left: '11%'
    }
  }, "\u2726"));
}
function Section({
  children,
  id,
  subtle = false,
  full = true,
  ghost,
  orbs = false,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    "data-screen-label": id,
    className: full ? 'slide' : '',
    style: {
      background: subtle ? 'var(--bg-subtle)' : 'transparent',
      overflow: 'hidden',
      position: 'relative',
      ...style
    }
  }, ghost && /*#__PURE__*/React.createElement(GhostWord, {
    text: ghost
  }), orbs && /*#__PURE__*/React.createElement(Orbs, null), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '64px var(--container-pad)',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 1
    }
  }, children));
}
function IsoInline({
  variant,
  size = 220,
  style
}) {
  const ref = React.useRef(null);
  const p = useSectionProgress(ref);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      pointerEvents: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement(IsoScene, {
    variant: variant,
    p: p,
    size: size
  }));
}

// Spatial bento tile: rounded surface with mouse-tracking 3D tilt + hover lift.
function BentoTile({
  children,
  delay = 0,
  pad = 24,
  style,
  tilt = true
}) {
  const [t, setT] = React.useState({
    x: 0,
    y: 0
  });
  const [hover, setHover] = React.useState(false);
  const onMove = e => {
    if (!tilt) return;
    const r = e.currentTarget.getBoundingClientRect();
    setT({
      x: ((e.clientY - r.top) / r.height - 0.5) * -4,
      y: ((e.clientX - r.left) / r.width - 0.5) * 5
    });
  };
  return /*#__PURE__*/React.createElement(Reveal, {
    delay: delay,
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onMouseMove: onMove,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setT({
        x: 0,
        y: 0
      });
    },
    style: {
      height: '100%',
      boxSizing: 'border-box',
      padding: pad,
      background: 'color-mix(in srgb, var(--surface-card) 72%, transparent)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border: '1px solid ' + (hover ? 'var(--border-strong)' : 'var(--border-default)'),
      borderRadius: 20,
      overflow: 'hidden',
      position: 'relative',
      transform: `perspective(900px) rotateX(${t.x}deg) rotateY(${t.y}deg) translateY(${hover ? -3 : 0}px) ${hover ? 'scale(1.012)' : ''}`,
      transition: 'border-color var(--duration-base) var(--ease-out), transform 180ms var(--ease-out)',
      willChange: 'transform',
      ...style
    }
  }, children));
}

// Page hero header for subpages (blog, uses): mono path eyebrow + rising title.
function PageHero({
  path,
  title,
  description,
  ghost,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--border-default)',
      background: 'var(--bg-subtle)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, ghost && /*#__PURE__*/React.createElement(GhostWord, {
    text: ghost
  }), /*#__PURE__*/React.createElement(Orbs, null), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '132px var(--container-pad) 48px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, path), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      width: 42,
      height: 1,
      background: 'var(--border-strong)'
    }
  }))), /*#__PURE__*/React.createElement(RiseText, {
    as: "h1",
    text: title,
    fontSize: "clamp(36px, 4vw, 52px)"
  }), description && /*#__PURE__*/React.createElement(Reveal, {
    delay: 200
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 620,
      fontSize: 'var(--text-lg)'
    }
  }, description)), children));
}

// ---------- hero ----------
// Ambient particle field — deterministic positions, gentle float.
function Particles({
  count = 16
}) {
  const dots = Array.from({
    length: count
  }, (_, i) => ({
    left: (i * 37 + 11) % 100,
    top: (i * 53 + 7) % 100,
    size: 3 + i % 3 * 1.5,
    dur: 5 + i % 4 * 1.6,
    delay: i % 5 * 0.9,
    blue: i % 4 === 0
  }));
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0
    }
  }, dots.map((d, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "particle",
    style: {
      position: 'absolute',
      left: d.left + '%',
      top: d.top + '%',
      width: d.size,
      height: d.size,
      borderRadius: 99,
      background: d.blue ? 'var(--accent)' : 'var(--border-strong)',
      opacity: d.blue ? 0.55 : 0.5,
      animation: `float-y ${d.dur}s ease-in-out infinite ${d.delay}s`
    }
  })));
}

// One-row mini gallery under the hero: drifting marquee, tilted frames, hover to straighten.
function HeroMarquee() {
  const slots = [{
    id: 'marquee-1',
    src: '../../assets/speaking-genkit-talk.jpg',
    label: 'GDG Depok'
  }, {
    id: 'marquee-2',
    label: 'DevFest'
  }, {
    id: 'marquee-3',
    label: 'Firebase ID'
  }, {
    id: 'marquee-4',
    label: 'Bootcamp'
  }, {
    id: 'marquee-5',
    label: 'IO Extended'
  }, {
    id: 'marquee-6',
    label: 'Workshop'
  }, {
    id: 'marquee-7',
    label: 'Community'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "marquee",
    style: {
      marginTop: 34,
      overflow: 'hidden',
      padding: '14px 0 6px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "marquee-track",
    style: {
      display: 'flex',
      gap: 18,
      width: 'max-content'
    }
  }, slots.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    className: "marquee-card",
    style: {
      width: 200,
      height: 124,
      flex: 'none',
      position: 'relative',
      transform: `rotate(${i % 2 ? 1.8 : -1.8}deg)`,
      transition: 'transform var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: s.id,
    shape: "rounded",
    radius: "10",
    src: s.src,
    placeholder: s.label
  })))));
}
function Hero({
  go
}) {
  const logos = ['Anify', 'Badr Interactive', 'Astra', 'UNDP', 'GoTo Impact', 'Google for Developers'];
  return /*#__PURE__*/React.createElement(Section, {
    id: "hero",
    ghost: "RAYHAN"
  }, /*#__PURE__*/React.createElement(Particles, {
    count: 16
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid-hero",
    style: {
      display: 'grid',
      gridTemplateColumns: '1.35fr 1fr',
      gap: 56,
      alignItems: 'center',
      paddingTop: 12,
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/speaking-genkit-talk.jpg",
    alt: "Rayhan",
    style: {
      width: 44,
      height: 44,
      borderRadius: 99,
      objectFit: 'cover',
      border: '2px solid var(--border-strong)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-hand)',
      fontSize: 23,
      color: 'var(--text-heading)',
      transform: 'rotate(-2deg)'
    }
  }, "hey \u2014 I'm Rayhan!"), /*#__PURE__*/React.createElement(HDS.Badge, {
    tone: "open"
  }, D.hero.badge))), /*#__PURE__*/React.createElement(RiseText, {
    as: "h1",
    text: D.hero.title,
    accents: ['ships,', 'teaches,', 'scales.'],
    fontSize: "clamp(36px, 4.2vw, 56px)",
    stagger: 70
  }), /*#__PURE__*/React.createElement(Reveal, {
    delay: 350
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-lg)',
      maxWidth: 540
    }
  }, D.hero.sub)), /*#__PURE__*/React.createElement(Reveal, {
    delay: 450
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      flexWrap: 'wrap',
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(HDS.Button, {
    variant: "primary",
    size: "lg",
    onClick: () => go('contact')
  }, "Get in touch"), /*#__PURE__*/React.createElement(HDS.Button, {
    variant: "secondary",
    size: "lg",
    href: "../../assets/cv-rayhan.pdf",
    target: "_blank",
    icon: /*#__PURE__*/React.createElement("i", {
      className: "ph-duotone ph-download-simple",
      style: {
        fontSize: 18
      }
    })
  }, "Download CV"), /*#__PURE__*/React.createElement(HDS.SocialLinks, {
    size: 40
  }))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 550
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 20,
      flexWrap: 'wrap',
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      flex: 'none'
    }
  }, "Shipped with"), logos.map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 14,
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap'
    }
  }, n))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 250
  }, /*#__PURE__*/React.createElement(IsoHero, {
    photo: "../../assets/speaking-genkit-talk.jpg"
  }))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 500
  }, /*#__PURE__*/React.createElement(HeroMarquee, null)));
}

// ---------- sections ----------
function About() {
  const stats = [['7 yrs', 'React & Next.js', 'ph-code'], ['71%', 'hosting costs cut', 'ph-trend-down'], ['1,800', 'community members', 'ph-users-three']];
  return /*#__PURE__*/React.createElement(Section, {
    id: "about",
    subtle: true,
    ghost: "ABOUT",
    orbs: true
  }, /*#__PURE__*/React.createElement(FancyHeading, {
    num: "01",
    eyebrow: "About",
    title: "Engineer, lead, and teacher"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid-about",
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: 16,
      marginTop: 28,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(BentoTile, {
    delay: 100
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, D.about.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      margin: 0
    }
  }, p)))), /*#__PURE__*/React.createElement("div", {
    className: "grid-3",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16
    }
  }, stats.map(([n, l, icon], i) => /*#__PURE__*/React.createElement(BentoTile, {
    key: l,
    delay: 180 + i * 80,
    pad: 20
  }, /*#__PURE__*/React.createElement("i", {
    className: 'ph-duotone ' + icon,
    style: {
      fontSize: 22,
      color: 'var(--text-muted)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-3xl)',
      color: 'var(--text-heading)',
      marginTop: 10
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, l))))), /*#__PURE__*/React.createElement(BentoTile, {
    delay: 160,
    pad: 0,
    style: {
      minHeight: 300
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "about-casual",
    shape: "rect",
    placeholder: "Drop a casual photo"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: '28px 16px 12px',
      background: 'linear-gradient(transparent, rgba(11,17,32,.55))',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-hand)',
      fontSize: 20,
      color: '#fff'
    }
  }, "off duty \u263C")))));
}
function Experience() {
  const groups = Object.keys(D.experience);
  const [active, setActive] = React.useState(groups[0]);
  const rows = D.experience[active];
  return /*#__PURE__*/React.createElement(Section, {
    id: "experience",
    ghost: "CAREER",
    orbs: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(FancyHeading, {
    num: "02",
    eyebrow: "Experience",
    title: "Where I've worked and taught"
  }), /*#__PURE__*/React.createElement(IsoInline, {
    variant: "steps",
    size: 180,
    style: {
      flex: 'none',
      marginBottom: -10
    }
  })), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 28,
      flexWrap: 'wrap'
    }
  }, groups.map(g => /*#__PURE__*/React.createElement("button", {
    key: g,
    onClick: () => setActive(g),
    style: {
      padding: '8px 16px',
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 500,
      border: '1px solid ' + (active === g ? 'transparent' : 'var(--border-default)'),
      background: active === g ? 'var(--interactive-primary)' : 'transparent',
      color: active === g ? 'var(--text-on-primary)' : 'var(--text-body)',
      transition: 'all var(--duration-fast) var(--ease-out)'
    }
  }, g)))), /*#__PURE__*/React.createElement(BentoTile, {
    delay: 180,
    pad: 28,
    tilt: false,
    style: {
      marginTop: 20,
      maxHeight: '46vh',
      overflowY: 'auto'
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement(HDS.TimelineItem, _extends({
    key: r.title + r.period
  }, r, {
    last: i === rows.length - 1
  })))));
}

// Masonry work grid: case-study cards + screenshot slots + iso chart, varied heights.
function Projects() {
  const cells = [{
    type: 'project',
    p: D.projects[0]
  }, {
    type: 'shot',
    id: 'proj-smile-shot',
    label: 'Drop a SMILE dashboard screenshot',
    ratio: '4/3'
  }, {
    type: 'project',
    p: D.projects[1]
  }, {
    type: 'iso'
  }, {
    type: 'shot',
    id: 'proj-anify-shot',
    label: 'Drop an Anify screenshot',
    ratio: '4/2.6'
  }, {
    type: 'project',
    p: D.projects[2]
  }];
  return /*#__PURE__*/React.createElement(Section, {
    id: "projects",
    subtle: true,
    ghost: "WORK",
    orbs: true
  }, /*#__PURE__*/React.createElement(FancyHeading, {
    num: "03",
    eyebrow: "Portfolio",
    title: "Selected work",
    description: "Case studies, not screenshots \u2014 each one ends with measurable impact."
  }), /*#__PURE__*/React.createElement("div", {
    className: "masonry",
    style: {
      columnGap: 16,
      marginTop: 32
    }
  }, cells.map((cell, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      breakInside: 'avoid',
      marginBottom: 16
    }
  }, cell.type === 'project' && /*#__PURE__*/React.createElement(BentoTile, {
    delay: 100 + i * 70
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-xl)'
    }
  }, cell.p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, cell.p.role), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '14px 0 0',
      fontSize: 'var(--text-sm)'
    }
  }, cell.p.problem), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      padding: '10px 14px',
      background: 'var(--bg-muted)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-accent)'
    }
  }, "Impact"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-heading)'
    }
  }, cell.p.impact)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap',
      marginTop: 14
    }
  }, cell.p.tags.map(t => /*#__PURE__*/React.createElement(HDS.Tag, {
    key: t
  }, t)))), cell.type === 'shot' && /*#__PURE__*/React.createElement(BentoTile, {
    delay: 100 + i * 70,
    pad: 0,
    style: {
      aspectRatio: cell.ratio
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: cell.id,
    shape: "rect",
    placeholder: cell.label
  }))), cell.type === 'iso' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement(IsoInline, {
    variant: "bars",
    size: 210
  }))))));
}

// Each talk gets its own mini photo gallery — drop event shots into the frames.
function SpeakingRow({
  talk,
  index,
  first
}) {
  const shots = [0, 1, 2].map(j => ({
    id: `speak-${index}-${j}`,
    src: first && j === 0 ? '../../assets/speaking-genkit-talk.jpg' : null
  }));
  return /*#__PURE__*/React.createElement(BentoTile, {
    delay: 120 + index * 90,
    pad: 24,
    style: {
      marginTop: index > 0 ? 16 : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-speak",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.25fr',
      gap: 32,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, talk.period), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-xl)',
      marginTop: 8
    }
  }, talk.title, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontWeight: 500
    }
  }, " \xB7 ", talk.org)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      fontSize: 'var(--text-sm)',
      maxWidth: 420
    }
  }, talk.description)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, shots.map((s, j) => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    className: "marquee-card",
    style: {
      flex: j === 0 ? 1.5 : 1,
      aspectRatio: j === 0 ? '4/3' : '3/4',
      position: 'relative',
      minWidth: 0,
      transform: `rotate(${j % 2 ? 1.6 : -1.6}deg)`,
      transition: 'transform var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: s.id,
    shape: "rounded",
    radius: "10",
    src: s.src,
    placeholder: "Drop event photo"
  }))))));
}
function Speaking() {
  return /*#__PURE__*/React.createElement(Section, {
    id: "speaking",
    ghost: "STAGE",
    orbs: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(FancyHeading, {
    num: "04",
    eyebrow: "Speaking",
    title: "On stage, 350\u2013600 people at a time",
    description: "10+ talks across GDG, DevFest, and Firebase Indonesia \u2014 each with its own gallery."
  }), /*#__PURE__*/React.createElement(IsoInline, {
    variant: "stage",
    size: 180,
    style: {
      flex: 'none',
      marginBottom: -10
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, D.experience.Speaking.map((talk, i) => /*#__PURE__*/React.createElement(SpeakingRow, {
    key: talk.title,
    talk: talk,
    index: i,
    first: i === 0
  }))));
}
function Now() {
  const icons = ['ph-users-three', 'ph-sparkle', 'ph-briefcase'];
  return /*#__PURE__*/React.createElement(Section, {
    id: "now",
    ghost: "NOW",
    orbs: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(FancyHeading, {
    num: "05",
    eyebrow: "Now",
    title: "What I'm doing now",
    description: "Updated July 2026."
  }), /*#__PURE__*/React.createElement(IsoInline, {
    variant: "float",
    size: 180,
    style: {
      flex: 'none',
      marginBottom: -10
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid-3",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16,
      marginTop: 28
    }
  }, D.now.map((n, i) => /*#__PURE__*/React.createElement(BentoTile, {
    key: n,
    delay: 120 + i * 90
  }, /*#__PURE__*/React.createElement("i", {
    className: 'ph-duotone ' + icons[i % icons.length],
    style: {
      fontSize: 24,
      color: 'var(--text-muted)'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '12px 0 0',
      fontSize: 'var(--text-sm)'
    }
  }, n)))));
}
const HOME_SECTIONS = [{
  id: 'hero',
  label: 'Intro'
}, {
  id: 'about',
  label: 'About'
}, {
  id: 'experience',
  label: 'Experience'
}, {
  id: 'projects',
  label: 'Work'
}, {
  id: 'speaking',
  label: 'Speaking'
}, {
  id: 'now',
  label: 'Now'
}];
function HomeScreen({
  go
}) {
  const [active, setActive] = React.useState('hero');
  React.useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, {
      rootMargin: '-45% 0px -45% 0px'
    });
    HOME_SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  const goSection = id => go(id);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(NavDots, {
    sections: HOME_SECTIONS,
    active: active
  }), /*#__PURE__*/React.createElement(Hero, {
    go: goSection
  }), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(Experience, null), /*#__PURE__*/React.createElement(Projects, null), /*#__PURE__*/React.createElement(Speaking, null), /*#__PURE__*/React.createElement(Now, null));
}
Object.assign(window, {
  HomeScreen,
  PageHero,
  RiseText,
  Reveal,
  BentoTile
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Isometric.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Isometric illustrations (SVG cubes in brand palette) + scroll-progress hook + right-side nav dots.
const IDS = window.ArayhanDesignSystem_bd91f4;

// 0..1 progress of a section entering the viewport (0 = top at viewport bottom, 1 = settled).
function useSectionProgress(ref) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    let raf = null;
    const read = () => {
      raf = null;
      const el = ref.current;
      if (!el) return;
      // Progress of the CONTAINING SECTION entering the viewport — elements low in a
      // snapped 100vh slide would otherwise never reach p=1.
      const target = el.closest('section') || el;
      const r = target.getBoundingClientRect();
      const vh = window.innerHeight;
      setP(Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.7))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}

// Isometric primitives: cube, pyramid, floating plane, orbit ring.
function Cube({
  x,
  y,
  s,
  h,
  top,
  left,
  right,
  style
}) {
  const w = s * 0.866,
    u = s * 0.5;
  const pts = arr => arr.map(([a, b]) => a + ',' + b).join(' ');
  return /*#__PURE__*/React.createElement("g", {
    style: style
  }, /*#__PURE__*/React.createElement("polygon", {
    points: pts([[x - w, y + u], [x, y + 2 * u], [x, y + 2 * u + h], [x - w, y + u + h]]),
    fill: left
  }), /*#__PURE__*/React.createElement("polygon", {
    points: pts([[x + w, y + u], [x, y + 2 * u], [x, y + 2 * u + h], [x + w, y + u + h]]),
    fill: right
  }), /*#__PURE__*/React.createElement("polygon", {
    points: pts([[x, y], [x + w, y + u], [x, y + 2 * u], [x - w, y + u]]),
    fill: top
  }));
}
function Pyramid({
  x,
  y,
  s,
  h,
  left,
  right,
  style
}) {
  const w = s * 0.866,
    u = s * 0.5;
  const apex = `${x},${y + u - h}`;
  return /*#__PURE__*/React.createElement("g", {
    style: style
  }, /*#__PURE__*/React.createElement("polygon", {
    points: `${x - w},${y + u} ${x},${y + 2 * u} ${apex}`,
    fill: left
  }), /*#__PURE__*/React.createElement("polygon", {
    points: `${x + w},${y + u} ${x},${y + 2 * u} ${apex}`,
    fill: right
  }));
}
function Plane({
  x,
  y,
  s,
  top,
  style
}) {
  const w = s * 0.866,
    u = s * 0.5;
  return /*#__PURE__*/React.createElement("g", {
    style: style
  }, /*#__PURE__*/React.createElement("polygon", {
    points: `${x},${y} ${x + w},${y + u} ${x},${y + 2 * u} ${x - w},${y + u}`,
    fill: top
  }));
}
function Ring({
  x,
  y,
  rx,
  stroke,
  style
}) {
  return /*#__PURE__*/React.createElement("g", {
    style: style
  }, /*#__PURE__*/React.createElement("ellipse", {
    className: "ring-anim",
    cx: x,
    cy: y,
    rx: rx,
    ry: rx * 0.5,
    fill: "none",
    stroke: stroke,
    strokeWidth: "1.5",
    strokeDasharray: "7 7"
  }));
}
const BLUE = {
  top: '#93C5FD',
  left: '#2563EB',
  right: '#1E40AF'
};
const BLUE_SOFT = {
  top: 'var(--iso-slate2-top)',
  left: 'var(--iso-slate2-left)',
  right: 'var(--iso-slate2-right)'
};
const SLATE = {
  top: 'var(--iso-slate-top)',
  left: 'var(--iso-slate-left)',
  right: 'var(--iso-slate-right)'
};

// Scene definitions — abstract isometric compositions (blue + slate only), assembled on scroll.
const SCENES = {
  // About — layered platform with floating apex + satellite planes
  stack: [{
    k: 'ring',
    x: 160,
    y: 138,
    rx: 128,
    stroke: 'var(--border-strong)'
  }, {
    k: 'cube',
    x: 160,
    y: 148,
    s: 92,
    h: 24,
    c: SLATE
  }, {
    k: 'cube',
    x: 160,
    y: 110,
    s: 62,
    h: 22,
    c: BLUE_SOFT
  }, {
    k: 'pyr',
    x: 160,
    y: 66,
    s: 42,
    h: 38,
    c: BLUE,
    floaty: true
  }, {
    k: 'plane',
    x: 66,
    y: 84,
    s: 26,
    c: BLUE_SOFT,
    floaty: true
  }, {
    k: 'plane',
    x: 254,
    y: 62,
    s: 20,
    c: SLATE,
    floaty: true
  }],
  // Experience — rising walkway of planes toward a monolith
  steps: [{
    k: 'ring',
    x: 170,
    y: 148,
    rx: 132,
    stroke: 'var(--border-strong)'
  }, {
    k: 'plane',
    x: 78,
    y: 198,
    s: 50,
    c: SLATE
  }, {
    k: 'plane',
    x: 138,
    y: 164,
    s: 50,
    c: BLUE_SOFT
  }, {
    k: 'plane',
    x: 198,
    y: 130,
    s: 50,
    c: SLATE
  }, {
    k: 'cube',
    x: 258,
    y: 82,
    s: 46,
    h: 28,
    c: BLUE_SOFT
  }, {
    k: 'pyr',
    x: 258,
    y: 40,
    s: 26,
    h: 26,
    c: BLUE,
    floaty: true
  }],
  // Projects — impact towers + drifting cap
  bars: [{
    k: 'ring',
    x: 160,
    y: 210,
    rx: 124,
    stroke: 'var(--border-strong)'
  }, {
    k: 'cube',
    x: 90,
    y: 150,
    s: 46,
    h: 60,
    c: SLATE
  }, {
    k: 'cube',
    x: 160,
    y: 110,
    s: 46,
    h: 100,
    c: BLUE_SOFT
  }, {
    k: 'cube',
    x: 230,
    y: 60,
    s: 46,
    h: 150,
    c: BLUE
  }, {
    k: 'plane',
    x: 230,
    y: 24,
    s: 30,
    c: BLUE_SOFT,
    floaty: true
  }, {
    k: 'plane',
    x: 88,
    y: 110,
    s: 18,
    c: BLUE_SOFT,
    floaty: true
  }],
  // Speaking — stage, speaker beacon, floating audience tiles
  stage: [{
    k: 'ring',
    x: 160,
    y: 142,
    rx: 136,
    stroke: 'var(--border-strong)'
  }, {
    k: 'cube',
    x: 160,
    y: 158,
    s: 118,
    h: 18,
    c: SLATE
  }, {
    k: 'pyr',
    x: 160,
    y: 96,
    s: 36,
    h: 48,
    c: BLUE,
    floaty: true
  }, {
    k: 'plane',
    x: 88,
    y: 224,
    s: 20,
    c: BLUE_SOFT,
    floaty: true
  }, {
    k: 'plane',
    x: 150,
    y: 240,
    s: 20,
    c: BLUE_SOFT,
    floaty: true
  }, {
    k: 'plane',
    x: 212,
    y: 226,
    s: 20,
    c: BLUE_SOFT,
    floaty: true
  }],
  // Now — drifting prism field
  float: [{
    k: 'ring',
    x: 150,
    y: 118,
    rx: 112,
    stroke: 'var(--border-strong)'
  }, {
    k: 'pyr',
    x: 150,
    y: 118,
    s: 62,
    h: 54,
    c: BLUE_SOFT,
    floaty: true
  }, {
    k: 'plane',
    x: 236,
    y: 76,
    s: 30,
    c: BLUE,
    floaty: true
  }, {
    k: 'plane',
    x: 76,
    y: 62,
    s: 22,
    c: SLATE,
    floaty: true
  }, {
    k: 'cube',
    x: 232,
    y: 182,
    s: 26,
    h: 14,
    c: SLATE,
    floaty: true
  }],
  // Contact — tile field assembling around a beacon
  grid: [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
    const row = Math.floor(i / 3),
      col = i % 3;
    if (i === 4) return {
      k: 'pyr',
      x: 160,
      y: 118,
      s: 34,
      h: 36,
      c: BLUE,
      floaty: true
    };
    return {
      k: i % 2 ? 'plane' : 'cube',
      x: 160 + (col - row) * 46,
      y: 92 + (col + row) * 23,
      s: 42,
      h: 12,
      c: i % 2 ? BLUE_SOFT : SLATE
    };
  })
};
function IsoScene({
  variant,
  p,
  size = 300,
  style
}) {
  const items = SCENES[variant] || [];
  const n = items.length;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 320 280",
    width: size,
    height: size * 0.875,
    "aria-hidden": "true",
    style: {
      overflow: 'visible',
      display: 'block',
      ...style
    }
  }, items.map((it, i) => {
    const local = Math.max(0, Math.min(1, p * (n * 0.7 + 1) - i * 0.7));
    const ease = 1 - Math.pow(1 - local, 3);
    const anim = it.floaty && ease >= 1 ? `float-y ${5 + i}s var(--ease-out) infinite ${i * 0.7}s` : 'none';
    const st = {
      opacity: ease,
      transform: `translateY(${(1 - ease) * 46}px)`,
      animation: anim
    };
    if (it.k === 'ring') return /*#__PURE__*/React.createElement(Ring, {
      key: i,
      x: it.x,
      y: it.y,
      rx: it.rx,
      stroke: it.stroke,
      style: {
        opacity: ease
      }
    });
    if (it.k === 'pyr') return /*#__PURE__*/React.createElement(Pyramid, _extends({
      key: i,
      x: it.x,
      y: it.y,
      s: it.s,
      h: it.h
    }, it.c, {
      style: st
    }));
    if (it.k === 'plane') return /*#__PURE__*/React.createElement(Plane, _extends({
      key: i,
      x: it.x,
      y: it.y,
      s: it.s
    }, it.c, {
      style: st
    }));
    return /*#__PURE__*/React.createElement(Cube, _extends({
      key: i,
      x: it.x,
      y: it.y,
      s: it.s,
      h: it.h
    }, it.c, {
      style: st
    }));
  }));
}

// 3D-immersive character — hooded figure with volumetric gradient shading (à la 3D mascot renders),
// faceless void under the hood, accent sneakers. Original artwork in brand palette.
function Char3D({
  size = 200,
  style
}) {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 170 270",
    width: size * 0.63,
    height: size,
    "aria-hidden": "true",
    style: {
      overflow: 'visible',
      display: 'block',
      ...style
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "c3d-glow",
    cx: "50%",
    cy: "40%",
    r: "60%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "var(--blue-500)",
    stopOpacity: "0.35"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "var(--blue-500)",
    stopOpacity: "0"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "c3d-hoodie",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#475569"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "45%",
    stopColor: "#1E293B"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#0B1120"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "c3d-hood",
    x1: "0%",
    y1: "0%",
    x2: "80%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#64748B"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "50%",
    stopColor: "#293548"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#0B1120"
  })), /*#__PURE__*/React.createElement("radialGradient", {
    id: "c3d-void",
    cx: "38%",
    cy: "32%",
    r: "75%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#293548"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#05080F"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "c3d-shoe",
    x1: "0%",
    y1: "0%",
    x2: "0%",
    y2: "100%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "var(--blue-400)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "var(--blue-700)"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "c3d-pants",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "0%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#1E293B"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#0B1120"
  }))), /*#__PURE__*/React.createElement("ellipse", {
    cx: "85",
    cy: "120",
    rx: "85",
    ry: "110",
    fill: "url(#c3d-glow)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "85",
    cy: "258",
    rx: "52",
    ry: "10",
    fill: "var(--accent-soft)"
  }), /*#__PURE__*/React.createElement("g", {
    className: "char-arm"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M118 118 C138 104 146 84 148 62",
    stroke: "url(#c3d-hoodie)",
    strokeWidth: "17",
    strokeLinecap: "round",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "149",
    cy: "55",
    r: "8.5",
    fill: "#D9A87C"
  })), /*#__PURE__*/React.createElement("path", {
    d: "M85 6 C118 6 132 32 130 58 C129 74 120 84 85 84 C50 84 41 74 40 58 C38 32 52 6 85 6 Z",
    fill: "url(#c3d-hood)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "85",
    cy: "50",
    rx: "29",
    ry: "31",
    fill: "url(#c3d-void)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M56 32 C62 16 72 10 85 10",
    stroke: "#94A3B8",
    strokeWidth: "3",
    strokeLinecap: "round",
    fill: "none",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50 82 C60 90 110 90 120 82 C134 96 138 128 136 152 C120 162 50 162 34 152 C32 128 36 96 50 82 Z",
    fill: "url(#c3d-hoodie)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M62 128 C70 136 100 136 108 128 L104 150 C96 156 74 156 66 150 Z",
    fill: "#0B1120",
    opacity: "0.65"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M78 88 L76 106 M92 88 L94 106",
    stroke: "#94A3B8",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "76",
    cy: "109",
    r: "2.5",
    fill: "#94A3B8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "94",
    cy: "109",
    r: "2.5",
    fill: "#94A3B8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50 96 C36 112 32 132 36 148",
    stroke: "url(#c3d-hoodie)",
    strokeWidth: "17",
    strokeLinecap: "round",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "36",
    cy: "153",
    r: "8",
    fill: "#D9A87C"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M44 156 L48 196 L80 196 L82 162 Z",
    fill: "url(#c3d-pants)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M126 156 L122 196 L90 196 L88 162 Z",
    fill: "url(#c3d-pants)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "56",
    y: "194",
    width: "17",
    height: "42",
    rx: "8",
    fill: "#1E293B"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "96",
    y: "194",
    width: "17",
    height: "42",
    rx: "8",
    fill: "#0F172A"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M50 236 C50 230 76 230 76 236 L77 246 L49 246 Z",
    fill: "url(#c3d-shoe)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "47",
    y: "244",
    width: "32",
    height: "9",
    rx: "4.5",
    fill: "#F8FAFC"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M92 236 C92 230 118 230 118 236 L119 246 L91 246 Z",
    fill: "url(#c3d-shoe)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "89",
    y: "244",
    width: "32",
    height: "9",
    rx: "4.5",
    fill: "#F8FAFC"
  }));
}

// Hero centerpiece — isometric glass device with floating UI panels, orbs, stars; mouse parallax.
function IsoHero({
  photo
}) {
  const [par, setPar] = React.useState({
    x: 0,
    y: 0
  });
  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    setPar({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5
    });
  };
  const layer = d => ({
    transform: `translate(${par.x * d}px, ${par.y * d}px)`,
    transition: 'transform 300ms var(--ease-out)'
  });
  const glass = {
    background: 'color-mix(in srgb, var(--surface-card) 55%, transparent)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid var(--border-strong)',
    borderRadius: 14,
    padding: 12
  };
  const bar = (w, accent) => /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      height: 7,
      width: w,
      borderRadius: 99,
      background: accent ? 'var(--accent)' : 'var(--bg-muted)',
      marginTop: 7
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    onMouseMove: onMove,
    onMouseLeave: () => setPar({
      x: 0,
      y: 0
    }),
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: 460,
      aspectRatio: '1 / 0.92',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "float-a",
    style: {
      position: 'absolute',
      top: '4%',
      left: '5%',
      width: 46,
      height: 46,
      borderRadius: 99,
      background: 'radial-gradient(circle at 32% 30%, var(--blue-300), var(--blue-600))',
      opacity: 0.85
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "float-c",
    style: {
      position: 'absolute',
      top: '16%',
      right: '8%',
      width: 20,
      height: 20,
      borderRadius: 99,
      background: 'radial-gradient(circle at 32% 30%, var(--blue-200), var(--blue-500))'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "float-b",
    style: {
      position: 'absolute',
      bottom: '20%',
      left: '-2%',
      width: 14,
      height: 14,
      borderRadius: 99,
      background: 'radial-gradient(circle at 32% 30%, var(--slate-300), var(--slate-500))'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "star",
    style: {
      position: 'absolute',
      top: '1%',
      right: '34%'
    }
  }, "\u2726"), /*#__PURE__*/React.createElement("span", {
    className: "star star-2",
    style: {
      position: 'absolute',
      bottom: '4%',
      right: '6%'
    }
  }, "\u2726"), /*#__PURE__*/React.createElement("span", {
    className: "star star-3",
    style: {
      position: 'absolute',
      top: '44%',
      left: '-3%'
    }
  }, "\u2726"), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 460 300",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      overflow: 'visible',
      ...layer(6)
    }
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "230,30 440,152 230,274 20,152",
    fill: "var(--accent-soft)",
    opacity: "0.45"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "230,30 440,152 230,274 20,152",
    fill: "none",
    stroke: "var(--border-strong)",
    strokeWidth: "1.2",
    strokeDasharray: "6 6",
    className: "ring-anim"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "124,148 230,210 230,228 124,166",
    fill: "var(--iso-slate-right)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "336,148 230,210 230,228 336,166",
    fill: "var(--iso-slate-left)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "230,86 336,148 230,210 124,148",
    fill: "var(--iso-slate-top)"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "230,96 322,150 230,204 138,150",
    fill: "var(--bg-page)",
    stroke: "var(--accent-soft-border)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "230,118 252,131 230,144 208,131",
    fill: "var(--accent)",
    opacity: "0.9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "242",
    y1: "156",
    x2: "282",
    y2: "133",
    stroke: "var(--border-strong)",
    strokeWidth: "5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "236",
    y1: "170",
    x2: "296",
    y2: "135",
    stroke: "var(--border-default)",
    strokeWidth: "5",
    strokeLinecap: "round",
    opacity: "0.7"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '26%',
      left: '50%',
      marginLeft: -66,
      zIndex: 1,
      ...layer(10)
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "char-bob"
  }, /*#__PURE__*/React.createElement(Char3D, {
    size: 210
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '38%',
      left: '-3%',
      width: 128,
      transform: 'rotate(-7deg)',
      zIndex: 2,
      ...glass,
      ...layer(18)
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 9,
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Deploys"), bar('82%', true), bar('58%'), bar('70%')), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '2%',
      right: '12%',
      width: 104,
      transform: 'rotate(5deg)',
      ...glass,
      ...layer(26)
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 9,
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Hosting"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 24,
      color: 'var(--text-heading)',
      marginTop: 4
    }
  }, "\u221271%")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '8%',
      right: '2%',
      width: 158,
      transform: 'rotate(-4deg)',
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      ...glass,
      ...layer(22)
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: "Rayhan",
    style: {
      width: 34,
      height: 34,
      borderRadius: 99,
      objectFit: 'cover',
      border: '2px solid var(--border-strong)',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--text-heading)'
    }
  }, "arayhan_"), bar('100%'))));
}

// Right-side nav dots — one per slide, click to snap there.
function NavDots({
  sections,
  active
}) {
  const [hovered, setHovered] = React.useState(null);
  const go = id => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({
      top: el.offsetTop - 64,
      behavior: 'smooth'
    });
  };
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Sections",
    className: "nav-dots",
    style: {
      position: 'fixed',
      right: 22,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 60,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      alignItems: 'flex-end'
    }
  }, sections.map(s => {
    const on = active === s.id,
      hov = hovered === s.id;
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      onClick: () => go(s.id),
      "aria-label": s.label,
      onMouseEnter: () => setHovered(s.id),
      onMouseLeave: () => setHovered(null),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: 'var(--tracking-wide)',
        textTransform: 'uppercase',
        color: 'var(--text-heading)',
        background: 'var(--surface-raised)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-sm)',
        padding: '3px 8px',
        boxShadow: 'var(--shadow-sm)',
        opacity: hov ? 1 : 0,
        transform: hov ? 'none' : 'translateX(6px)',
        transition: 'all var(--duration-fast) var(--ease-out)',
        pointerEvents: 'none',
        whiteSpace: 'nowrap'
      }
    }, s.label), /*#__PURE__*/React.createElement("span", {
      style: {
        width: on ? 10 : 8,
        height: on ? 10 : 8,
        borderRadius: 99,
        flex: 'none',
        background: on ? 'var(--interactive-primary)' : 'transparent',
        border: '2px solid ' + (on ? 'var(--interactive-primary)' : 'var(--border-strong)'),
        boxShadow: on ? '0 0 0 4px var(--bg-muted)' : 'none',
        transition: 'all var(--duration-base) var(--ease-out)'
      }
    }));
  }));
}
Object.assign(window, {
  useSectionProgress,
  IsoScene,
  IsoHero,
  Char3D,
  NavDots
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Isometric.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Shared.jsx
try { (() => {
// Shared chrome: Nav, Footer, CommandPalette
const DS = window.ArayhanDesignSystem_bd91f4;
function Wordmark({
  onClick
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onClick && onClick();
    },
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 20,
      color: 'var(--text-heading)',
      textDecoration: 'none'
    }
  }, "arayhan", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "_"));
}
function Nav({
  view,
  go,
  theme,
  onToggleTheme,
  onOpenPalette
}) {
  const items = [{
    id: 'home',
    label: 'Home',
    num: '01'
  }, {
    id: 'blog',
    label: 'Blog',
    num: '02'
  }, {
    id: 'uses',
    label: 'Uses',
    num: '03'
  }, {
    id: 'contact',
    label: 'Contact',
    num: '04'
  }];
  const refs = React.useRef({});
  const [ind, setInd] = React.useState({
    left: 0,
    width: 0,
    ready: false
  });
  const [scrolled, setScrolled] = React.useState(false);
  const [hovered, setHovered] = React.useState(null);
  const measure = React.useCallback(() => {
    const el = refs.current[view];
    if (el) setInd({
      left: el.offsetLeft,
      width: el.offsetWidth,
      ready: true
    });
  }, [view]);
  React.useLayoutEffect(() => {
    measure();
    const t = setTimeout(measure, 350); // re-measure after webfonts settle
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const capsule = {
    pointerEvents: 'auto',
    display: 'flex',
    alignItems: 'center',
    background: 'color-mix(in srgb, var(--surface-raised) 82%, transparent)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-full)',
    boxShadow: scrolled ? 'var(--shadow-md)' : 'var(--shadow-sm)',
    transition: 'all var(--duration-base) var(--ease-out)'
  };
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'fixed',
      top: scrolled ? 10 : 18,
      left: 0,
      right: 0,
      zIndex: 90,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      pointerEvents: 'none',
      gap: 12,
      transition: 'top var(--duration-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-wordmark",
    style: {
      ...capsule,
      padding: '8px 18px'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    onClick: () => go('home')
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      ...capsule,
      position: 'relative',
      padding: scrolled ? 4 : 6,
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: scrolled ? 4 : 6,
      bottom: scrolled ? 4 : 6,
      left: ind.left,
      width: ind.width,
      background: 'var(--interactive-primary)',
      borderRadius: 'var(--radius-full)',
      transition: ind.ready ? 'left 420ms cubic-bezier(0.34, 1.56, 0.64, 1), width 420ms cubic-bezier(0.34, 1.56, 0.64, 1), top var(--duration-base), bottom var(--duration-base)' : 'none',
      opacity: ind.ready ? 1 : 0
    }
  }), items.map(it => {
    const active = view === it.id,
      hov = hovered === it.id;
    return /*#__PURE__*/React.createElement("a", {
      key: it.id,
      href: "#",
      ref: el => {
        refs.current[it.id] = el;
      },
      className: "nav-item",
      onClick: e => {
        e.preventDefault();
        go(it.id);
      },
      onMouseEnter: () => setHovered(it.id),
      onMouseLeave: () => setHovered(null),
      style: {
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'baseline',
        gap: 7,
        padding: '8px 18px',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--text-sm)',
        fontWeight: 500,
        color: active ? 'var(--text-on-primary)' : hov ? 'var(--text-heading)' : 'var(--text-body)',
        transition: 'color var(--duration-base) var(--ease-out)',
        transform: hov && !active ? 'translateY(-1px)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "nav-num",
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 9,
        opacity: active ? 0.7 : 0.5
      }
    }, it.num), /*#__PURE__*/React.createElement("span", null, it.label));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...capsule,
      padding: '5px 6px',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onOpenPalette,
    className: "nav-cmdk",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
      borderRadius: 'var(--radius-full)',
      padding: '8px 12px',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-magnifying-glass",
    style: {
      fontSize: 13
    }
  }), /*#__PURE__*/React.createElement("span", null, "\u2318K")), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 18,
      background: 'var(--border-default)'
    }
  }), /*#__PURE__*/React.createElement(DS.ThemeToggle, {
    theme: theme,
    onToggle: onToggleTheme,
    size: 34
  })));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--border-default)',
      marginTop: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '32px var(--container-pad)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      color: 'var(--text-heading)'
    }
  }, "arayhan", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "_")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, "\xA9 2026 \xB7 Jakarta, Indonesia"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(DS.SocialLinks, {
    size: 34
  }))));
}
function CommandPalette({
  open,
  onClose,
  go
}) {
  const [q, setQ] = React.useState('');
  const inputRef = React.useRef(null);
  const actions = [{
    label: 'Go home',
    hint: 'H',
    run: () => go('home')
  }, {
    label: 'Read the blog',
    hint: 'B',
    run: () => go('blog')
  }, {
    label: 'Open /uses',
    hint: 'U',
    run: () => go('uses')
  }, {
    label: 'Download CV',
    hint: 'PDF',
    run: () => window.open('../../assets/cv-rayhan.pdf', '_blank')
  }, {
    label: 'GitHub',
    hint: '↗',
    run: () => window.open('https://github.com/arayhan', '_blank')
  }, {
    label: 'LinkedIn',
    hint: '↗',
    run: () => window.open('https://www.linkedin.com/in/arayhan/', '_blank')
  }, {
    label: 'Email me',
    hint: '↗',
    run: () => window.open('mailto:hello@arayhan.dev', '_blank')
  }];
  const filtered = actions.filter(a => a.label.toLowerCase().includes(q.toLowerCase()));
  const [sel, setSel] = React.useState(0);
  React.useEffect(() => {
    if (open) {
      setQ('');
      setSel(0);
      setTimeout(() => inputRef.current && inputRef.current.focus(), 30);
    }
  }, [open]);
  React.useEffect(() => {
    setSel(0);
  }, [q]);
  if (!open) return null;
  const onKey = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel(s => Math.min(s + 1, filtered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel(s => Math.max(s - 1, 0));
    }
    if (e.key === 'Enter' && filtered[sel]) {
      filtered[sel].run();
      onClose();
    }
    if (e.key === 'Escape') onClose();
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--scrim)',
      zIndex: 200,
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '15vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 560,
      maxWidth: 'calc(100vw - 48px)',
      height: 'fit-content',
      background: 'color-mix(in srgb, var(--surface-raised) 78%, transparent)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    value: q,
    onChange: e => setQ(e.target.value),
    onKeyDown: onKey,
    placeholder: "Type a command or search\u2026",
    style: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '16px 20px',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      color: 'var(--text-heading)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      borderBottom: '1px solid var(--border-default)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 8,
      display: 'flex',
      flexDirection: 'column'
    }
  }, filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 14px',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, "No results."), filtered.map((a, i) => /*#__PURE__*/React.createElement("button", {
    key: a.label,
    onClick: () => {
      a.run();
      onClose();
    },
    onMouseEnter: () => setSel(i),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      textAlign: 'left',
      cursor: 'pointer',
      padding: '11px 14px',
      borderRadius: 'var(--radius-sm)',
      border: 'none',
      background: i === sel ? 'var(--bg-muted)' : 'transparent',
      color: 'var(--text-heading)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", null, a.label), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--text-muted)'
    }
  }, a.hint))))));
}

// Scroll-to-top — bottom-right, appears after scrolling.
function ScrollTopButton() {
  const [show, setShow] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": "Scroll to top",
    onClick: () => window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'fixed',
      right: 22,
      bottom: 24,
      zIndex: 80,
      width: 46,
      height: 46,
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: hover ? 'var(--interactive-primary-hover)' : 'var(--interactive-primary)',
      color: 'var(--text-on-primary)',
      border: 'none',
      boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-md)',
      opacity: show ? 1 : 0,
      transform: show ? hover ? 'translateY(-3px)' : 'none' : 'translateY(16px)',
      pointerEvents: show ? 'auto' : 'none',
      transition: 'all var(--duration-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-arrow-up",
    style: {
      fontSize: 19
    }
  }));
}
Object.assign(window, {
  Wordmark,
  Nav,
  Footer,
  CommandPalette,
  ScrollTopButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Shared.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/UsesScreen.jsx
try { (() => {
// /uses — gear, tools, AI workflow
const UDS = window.ArayhanDesignSystem_bd91f4;
const UD = window.SITE_DATA;

// Brand logo chip: simple-icons CDN with Phosphor fallback if the brand isn't in the set.
function BrandIcon({
  icon,
  ph
}) {
  const [failed, setFailed] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      flex: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FFFFFF',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-sm)'
    }
  }, icon && !failed ? /*#__PURE__*/React.createElement("img", {
    src: icon,
    alt: "",
    width: "18",
    height: "18",
    onError: () => setFailed(true),
    style: {
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: 'ph-duotone ' + ph,
    style: {
      fontSize: 18,
      color: 'var(--slate-600)'
    }
  }));
}
function UsesScreen() {
  const groups = Object.entries(UD.uses);
  return /*#__PURE__*/React.createElement("main", {
    "data-screen-label": "uses"
  }, /*#__PURE__*/React.createElement(PageHero, {
    path: "~/uses",
    title: "Tools I actually use",
    ghost: "USES",
    description: "Editor, AI workflow, stack defaults, and gear. Inspired by uses.tech."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '48px var(--container-pad) 64px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-2",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, groups.map(([group, items]) => /*#__PURE__*/React.createElement(UDS.Card, {
    key: group
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-lg)'
    }
  }, group), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '16px 0 0',
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, items.map(item => /*#__PURE__*/React.createElement("li", {
    key: item.label,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(BrandIcon, {
    icon: item.icon,
    ph: item.ph
  }), /*#__PURE__*/React.createElement("span", null, item.label)))))))));
}
Object.assign(window, {
  UsesScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/UsesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
// Dummy content for the arayhan website UI kit. Replace with real data.
window.SITE_DATA = {
  hero: {
    badge: 'Open to opportunities',
    title: 'Frontend Lead who ships, teaches, and scales.',
    sub: "I'm Rayhan — 7 years in React and Next.js. I led frontend at a US edtech startup, help build Indonesia's national health-logistics platform for the Ministry of Health and UNDP, and organize a 1,800-member developer community."
  },
  about: ['I build frontend systems from the ground up — clean architecture, design systems, and CI/CD pipelines that once cut hosting costs by 71%. Most recently I led frontend at Anify, a US-based SaaS startup, managing a team across US–Indonesia timezones.', 'The other half of my week goes to Badr Interactive, where I help build SMILE — the national healthcare logistics platform serving Indonesia\u2019s Ministry of Health, UNDP, and UNICC — and to GDG Depok, the 1,800-member community I organize.'],
  experience: {
    Professional: [{
      period: 'Jun 2025 — Apr 2026',
      title: 'Frontend Engineer Lead',
      org: 'Anify LLC · Honolulu, USA',
      description: 'Led frontend architecture for a SaaS platform (React, Next.js, TypeScript) with a team of 2 across US–Indonesia timezones. Cut monthly hosting costs 71% ($84 → $24) via Docker + CI/CD + multi-cloud; introduced Clean Architecture, DDD, and a Radix-based design system.',
      tags: ['Next.js', 'TypeScript', 'Radix UI', 'Docker']
    }, {
      period: 'Aug 2022 — now',
      title: 'Frontend Developer (part-time)',
      org: 'Badr Interactive',
      description: 'SMILE — national healthcare logistics platform for Indonesia\u2019s Ministry of Health, UNDP, and UNICC. Co-initiated the rewrite from legacy SMILE 3.0 to SMILE 5.0 (React + TypeScript) for a 40-person engineering team; also shipped Astra SAM (React Native) and Unit Cost RS (Remix, Prisma).',
      tags: ['React', 'TypeScript', 'React Native', 'Remix']
    }, {
      period: 'Dec 2020 — Aug 2022',
      title: 'Frontend Developer',
      org: 'Founderplus',
      description: 'Solo developer for a pre-seed accelerator platform serving 50+ startup applications — landing, admin dashboard, and registration with pitch-deck management. Stood up Docker/Nginx DevOps from scratch.',
      tags: ['Next.js', 'Node.js', 'Docker', 'PostgreSQL']
    }, {
      period: 'Aug 2019 — Dec 2020',
      title: 'Frontend Developer & Course Instructor',
      org: 'Skydu',
      description: 'B2B e-learning SaaS serving 10+ institutional clients. Built its first mobile app (React Native), then wrote and taught the React curriculum on the platform itself.',
      tags: ['React', 'React Native', 'Vue.js']
    }, {
      period: 'Jul 2017 — Aug 2018',
      title: 'Web Designer & Frontend Developer',
      org: 'Integrasi Media Kreasi',
      description: 'Dashboards, mobile apps, and UI/UX for major insurers — CHUBB, Prudential, BCA Life, Cigna, Sunlife — with Angular 5 + Ionic.',
      tags: ['Angular', 'Ionic', 'SASS']
    }],
    Freelance: [{
      period: 'Sep 2022 — Jan 2024',
      title: 'Fullstack Developer',
      org: 'Founderplus',
      description: 'End-to-end ownership of the accelerator platform after going freelance: features, infrastructure, and production operations.',
      tags: ['Next.js', 'Docker']
    }, {
      period: '2019 — 2020',
      title: 'Client projects',
      org: 'via Skydu',
      description: 'NFJuara (Vue.js, payment-gateway integration) and SOHO EDetailing (Next.js, data visualization).',
      tags: ['Vue.js', 'Next.js']
    }],
    Academic: [{
      period: '2019 — 2024',
      title: 'BSc Computer Science',
      org: 'STT Terpadu Nurul Fikri',
      description: 'Informatics Engineering, GPA 3.67/4.00.',
      tags: []
    }, {
      period: '2022',
      title: 'Kampus Merdeka bootcamps',
      org: 'Ruangguru · Binar Academy',
      description: 'Ruangguru engineering bootcamp (20 SKS, GPA 3.85) — Jest, Cypress, TypeScript, Next.js; Binar Academy track (4.5/5 hard skills).',
      tags: []
    }],
    Projects: [{
      period: '2022 — now',
      title: 'SMILE 5.0 Platform',
      org: 'MoH · UNDP',
      description: 'National medicine-distribution tracking across Indonesian health facilities.',
      tags: ['React', 'TypeScript']
    }, {
      period: '2023',
      title: 'Astra SAM Advance',
      org: 'PT Astra International',
      description: 'Nationwide sales-team app for customer database, tasks, and incentives on Android + iOS.',
      tags: ['React Native']
    }, {
      period: '2023',
      title: 'Unit Cost RS',
      org: 'Universitas Indonesia',
      description: 'Hospital costing system, built fullstack with Remix, Prisma, and MySQL.',
      tags: ['Remix', 'Prisma']
    }],
    Speaking: [{
      period: '2019 — now',
      title: 'Organizer',
      org: 'GDG Depok',
      description: '1,800-member community with 350–600 participants per event; 10+ technical talks on Firebase, React, and frontend. Organizer since Aug 2025, co-organizer 2019–2025.',
      tags: []
    }, {
      period: '2022 — 2023',
      title: 'Fullstack & Frontend Mentor',
      org: 'GoTo Impact Foundation',
      description: 'Generasi Gigih 2.0 & 3.0 — mentored 4 student teams through the full product lifecycle, from ideation to deployment.',
      tags: []
    }, {
      period: '2020 — 2021',
      title: 'Lead',
      org: 'Google Developer Student Clubs',
      description: 'One of 45 DSC Leads in Indonesia — 300-member campus community, 8 workshops, +50% membership growth.',
      tags: []
    }]
  },
  projects: [{
    id: 'smile',
    name: 'SMILE 5.0 — national health logistics',
    role: 'Frontend Developer · Badr Interactive',
    problem: "Indonesia's medicine-distribution tracking ran on SMILE 3.0 — an unmaintainable legacy JavaScript codebase with 1,000-line components.",
    constraint: 'Serving the Ministry of Health, UNDP Indonesia, UNICC, and UNDP Global — a 40-person engineering team that could not pause delivery.',
    solution: 'Co-initiated the complete rewrite to SMILE 5.0: React, TypeScript, and a scalable architecture.',
    impact: 'Covers Indonesian health facilities nationwide; significantly improved maintainability and delivery velocity for 40 engineers.',
    tags: ['React', 'TypeScript']
  }, {
    id: 'anify',
    name: 'Anify — SaaS frontend & infrastructure',
    role: 'Frontend Engineer Lead',
    problem: 'A US edtech startup burning runway on hosting and slowed by an inconsistent, pattern-less frontend.',
    constraint: 'A team of 2 frontend engineers split across US–Indonesia timezones, mid product push.',
    solution: 'Company-wide Clean Architecture + DDD, a Radix-based design system, and Docker/CI-CD multi-cloud infrastructure.',
    impact: '71% lower monthly hosting costs ($84 → $24); faster sprint velocity and onboarding.',
    tags: ['Next.js', 'Radix UI', 'Docker']
  }, {
    id: 'gdg',
    name: 'Developer education at scale',
    role: 'Organizer · GDG Depok',
    problem: 'Indonesian developers lacked accessible, senior-level frontend and Firebase material in their own ecosystem.',
    constraint: 'Volunteer time; audiences ranging from students to working seniors.',
    solution: '10+ conference talks, workshops, and mentoring — GDG Depok, DSC (300-member campus chapter), and GoTo bootcamps.',
    impact: '1,800 community members; 350–600 participants per event.',
    tags: ['Community', 'Firebase']
  }],
  now: ['Organizing GDG Depok as lead organizer — the next 350+ participant event is in the works.', 'Exploring AI tooling — Claude Code, Ollama, and agentic workflows in real projects.', 'Open to frontend-lead and senior IC opportunities (remote-friendly, US–ID timezones proven).'],
  blog: [{
    id: 'realtime-pivot',
    title: 'Keeping a realtime engine alive through a startup pivot',
    date: 'Jun 24, 2026',
    read: '8 min',
    views: '2,431',
    cover: '../../assets/blog-cover-1.png',
    excerpt: 'What survives a pivot is architecture, not features. How we kept sub-second sync while the product changed under us.',
    tags: ['Architecture', 'WebSocket'],
    toc: ['The pivot', 'What we kept', 'Optimistic UI that survives reconnects', 'Lessons'],
    body: [{
      t: 'h2',
      text: 'The pivot'
    }, {
      t: 'p',
      parts: [{
        text: 'When the product direction changed, every feature was negotiable — but '
      }, {
        text: 'the realtime layer was not',
        mark: true
      }, {
        text: ". Players expect state to move faster than they can doubt it."
      }]
    }, {
      t: 'img',
      slot: 'post-realtime-arch',
      caption: 'The authoritative-server architecture that survived the pivot.'
    }, {
      t: 'h2',
      text: 'What we kept'
    }, {
      t: 'p',
      parts: [{
        text: 'We drew a hard line around the core: one source of truth, clients render projections. The approach borrows from '
      }, {
        text: 'the CQRS pattern',
        href: 'https://martinfowler.com/bliki/CQRS.html'
      }, {
        text: ' — everything above that line was allowed to burn.'
      }]
    }, {
      t: 'code',
      lang: 'javascript',
      code: "// every optimistic action carries an idempotency key\nconst action = {\n  id: crypto.randomUUID(),\n  type: 'ANSWER_SUBMIT',\n  payload: { questionId, choice },\n  clientTime: Date.now(),\n};\n\nsocket.emit('action', action);\napplyOptimistic(action); // render immediately\n// replays after reconnect collapse into no-ops"
    }, {
      t: 'h2',
      text: 'Optimistic UI that survives reconnects'
    }, {
      t: 'p',
      parts: [{
        text: 'Optimism is easy; reconciliation is the job. Reconnect timing follows an exponential backoff with jitter:'
      }]
    }, {
      t: 'math',
      tex: 't_{retry} = \\min\\left(t_{max},\\; t_0 \\cdot 2^{\\,n}\\right) + \\mathcal{U}(0, j)'
    }, {
      t: 'p',
      parts: [{
        text: 'so a thousand disconnected clients never stampede the server on the same tick. Each replayed action is '
      }, {
        text: 'idempotent by construction',
        mark: true
      }, {
        text: ' — duplicates collapse into no-ops.'
      }]
    }, {
      t: 'h2',
      text: 'Lessons'
    }, {
      t: 'p',
      parts: [{
        text: 'Design the seam before you need it. The pivot cost us screens, not infrastructure — and that is the difference between a rewrite and a redesign. More on the dashboard side of this story in '
      }, {
        text: 'the cold-chain case study',
        href: '#',
        post: 'iot-71'
      }, {
        text: '.'
      }]
    }],
    comments: [{
      author: 'Dimas Prasetyo',
      date: 'Jun 25, 2026',
      text: 'Great writeup. How do you handle optimistic actions that depend on server-generated state, like a score that only the server can compute?',
      replies: [{
        author: 'Rayhan',
        isAuthor: true,
        date: 'Jun 25, 2026',
        text: "We split those into two phases: the client renders a pending placeholder (never a guessed value), and the authoritative result replaces it on ack. Guessing server-owned numbers is where optimistic UI goes to die."
      }]
    }, {
      author: 'Sarah Kim',
      date: 'Jun 27, 2026',
      text: 'Did you consider CRDTs instead of the authoritative server?',
      replies: [{
        author: 'Rayhan',
        isAuthor: true,
        date: 'Jun 28, 2026',
        text: 'Briefly — but trivia has a single arbiter of truth (the question clock), so CRDT merge semantics buy complexity without solving our actual problem.'
      }]
    }, {
      author: 'Andra W.',
      date: 'Jul 02, 2026',
      text: 'The idempotency-key trick saved us on a payments flow too. Underrated pattern.',
      replies: []
    }]
  }, {
    id: 'iot-71',
    title: 'How we cut cold-chain monitoring costs by 71%',
    date: 'May 11, 2026',
    read: '6 min',
    views: '1,204',
    cover: '../../assets/blog-cover-2.png',
    excerpt: 'Vaccine logistics, intermittent devices, and the dashboard patterns that made silence impossible to miss.',
    tags: ['IoT', 'Case study'],
    toc: ['The problem', 'Designing for silence', 'The result'],
    body: [['The problem', 'Thousands of cold-storage units, manual temperature checks, and a failure mode where nothing looks wrong until vaccines are lost.'], ['Designing for silence', 'The dashboard treats a missing report as loudly as a bad one. Escalation timers start the moment a device goes quiet.'], ['The result', 'Monitoring operations cost 71% less, and silent failures stopped being silent.']]
  }, {
    id: 'teaching-1800',
    title: 'What teaching 1,800 developers taught me about senior engineering',
    date: 'Mar 02, 2026',
    read: '5 min',
    views: '3,872',
    cover: '../../assets/blog-cover-3.png',
    excerpt: 'Every question from a bootcamp student is a code review of your own understanding.',
    tags: ['Community', 'Career'],
    toc: ['Teaching as debugging', 'The 350-person code review', 'Why seniors should speak'],
    body: [['Teaching as debugging', "You don't understand an abstraction until you've watched 40 people misunderstand it the same way."], ['The 350-person code review', 'On stage, every simplification you make is public. That pressure produces better mental models than any solo study.'], ['Why seniors should speak', 'Seniority is leverage. A talk that saves 600 people one bad architectural decision outproduces a quarter of solo output.']]
  }, {
    id: 'cmdk-portfolio',
    title: 'Why your portfolio needs a command palette',
    date: 'Feb 10, 2026',
    read: '4 min',
    views: '981',
    excerpt: 'Recruiters skim. Developers explore. ⌘K serves both in under a second.',
    tags: ['UX', 'Portfolio'],
    toc: ['Skimmers vs explorers', 'Building it in an afternoon', 'What gets used'],
    body: [['Skimmers vs explorers', 'A recruiter wants your CV in one keystroke; a developer wants to poke around. A palette collapses both journeys.'], ['Building it in an afternoon', 'A filtered list, arrow-key selection, and a scrim. The hard part is deciding what NOT to put in it.'], ['What gets used', 'Analytics after a month: Download CV first, GitHub second. Nobody scrolls to the footer anymore.']]
  }, {
    id: 'lighthouse-100',
    title: 'Chasing Lighthouse 100 on a personal site',
    date: 'Jan 18, 2026',
    read: '7 min',
    views: '1,650',
    excerpt: "A frontend engineer's site with a bad score is an ironic business card.",
    tags: ['Performance'],
    toc: ['The audit', 'Fonts are the boss fight', 'Diminishing returns'],
    body: [['The audit', 'First run: 84. The culprits were exactly what I tell clients to fix: render-blocking fonts and unsized media.'], ['Fonts are the boss fight', 'Self-hosted subsets with font-display swap and preload got LCP under 1.2s on a throttled connection.'], ['Diminishing returns', 'The last three points cost more than the first thirteen. Worth it once — as a badge, not a habit.']]
  }, {
    id: 'id-dev-community',
    title: 'The quiet superpower of Indonesian dev communities',
    date: 'Dec 05, 2025',
    read: '6 min',
    views: '2,102',
    excerpt: 'GDG, Firebase ID, and why volunteering at meetups compounds faster than side projects.',
    tags: ['Community'],
    toc: ['The flywheel', 'Speaking is networking', 'Start smaller than you think'],
    body: [['The flywheel', 'Every talk produces questions; every question produces material; every answer produces trust. The flywheel spins slowly, then all at once.'], ['Speaking is networking', "I've never gotten a freelance lead from a cold DM. I've gotten several from someone who watched a talk two years earlier."], ['Start smaller than you think', 'My first session had nine people and a broken projector. The 600-person rooms came later — and felt easier.']]
  }],
  uses: {
    'Editor & terminal': [{
      label: 'VS Code + custom keymap',
      icon: null,
      ph: 'ph-code'
    }, {
      label: 'JetBrains Mono with ligatures',
      icon: 'https://cdn.simpleicons.org/jetbrains',
      ph: 'ph-text-aa'
    }, {
      label: 'Warp terminal',
      icon: 'https://cdn.simpleicons.org/warp',
      ph: 'ph-terminal-window'
    }, {
      label: 'Fira Code fallback',
      icon: null,
      ph: 'ph-code-block'
    }],
    'AI workflow': [{
      label: 'Claude Code for agentic refactors',
      icon: 'https://cdn.simpleicons.org/claude',
      ph: 'ph-sparkle'
    }, {
      label: 'Ollama for local models',
      icon: 'https://cdn.simpleicons.org/ollama',
      ph: 'ph-cpu'
    }, {
      label: 'Genkit for AI flows in Firebase',
      icon: 'https://cdn.simpleicons.org/firebase',
      ph: 'ph-fire'
    }],
    'Stack defaults': [{
      label: 'Next.js (App Router)',
      icon: 'https://cdn.simpleicons.org/nextdotjs',
      ph: 'ph-triangle'
    }, {
      label: 'Tailwind CSS',
      icon: 'https://cdn.simpleicons.org/tailwindcss',
      ph: 'ph-wind'
    }, {
      label: 'Framer Motion',
      icon: 'https://cdn.simpleicons.org/framer',
      ph: 'ph-play'
    }, {
      label: 'Firebase / Firestore',
      icon: 'https://cdn.simpleicons.org/firebase',
      ph: 'ph-fire'
    }, {
      label: 'Vercel',
      icon: 'https://cdn.simpleicons.org/vercel',
      ph: 'ph-triangle'
    }],
    'Gear': [{
      label: 'MacBook Pro 14" M3',
      icon: 'https://cdn.simpleicons.org/apple',
      ph: 'ph-laptop'
    }, {
      label: 'Keychron K2',
      icon: null,
      ph: 'ph-keyboard'
    }, {
      label: 'Logitech MX Master 3',
      icon: null,
      ph: 'ph-mouse'
    }]
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

// ui_kits/website/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever a design needs an image.
 * You control the slot's shape; it sizes to its container by default. When the search_stock_photos tool
 * is available, prefill the slot by default — write the photo's URL into
 * src (with credit/credit-href); the user can still fill or replace it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The sidecar is a SIBLING of the HTML file that uses this component: the
 * read is a document-relative fetch, and the host resolves the bridge's
 * sidecar writes into the previewed file's directory to match (same
 * contract as design_canvas.jsx). Pages in the same directory share one
 * sidecar; keep slot ids distinct across them.
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          Initial framing baseline: cover | contain.   (default 'cover')
 *                cover starts the image filling the frame (overflow cropped);
 *                contain starts it fully visible (letterboxed). Either way the
 *                user can always pan/scale from there — double-click, or the
 *                Edit control, enters reframe mode (drag to move, scroll or
 *                corner-handles to scale; Escape / click-out commits). The
 *                crop persists alongside the image in the sidecar.
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. Prefill it with a real
 *                photo via search_stock_photos when that tool is available
 *                (set credit/credit-href from the result). A user drop
 *                overrides it; clearing the drop reveals src again.
 *   credit       Attribution text shown as a small overlay at the
 *                bottom-left of the filled slot. REQUIRED whenever src
 *                points at any Unsplash host (images.unsplash.com,
 *                plus.unsplash.com, …): an Unsplash src with no credit
 *                renders an error tile INSTEAD of the photo (Unsplash
 *                terms forbid showing their photos unattributed). Use the
 *                exact form 'Photo by {photographer name} on Unsplash' —
 *                the overlay then links the name to credit-href and
 *                'Unsplash' to the Unsplash homepage, and links back to
 *                unsplash.com automatically get the required utm referral
 *                params appended at render time. The credit belongs to
 *                the src image, so it only shows while src is what's
 *                displayed — a user-dropped image hides it.
 *   credit-href  Link for the photographer's name in the credit overlay
 *                (their Unsplash profile URL from the stock-photo search
 *                results). http(s) URLs only — anything else renders the
 *                name as plain text.
 *
 * Sizing: the slot fills its container by default (width/height 100%).
 * Put it in a sized wrapper — absolutely positioned, a grid cell, a fixed
 * frame — and it takes exactly that box. When the parent's height is
 * indefinite (ordinary flow), it falls back to full width at a 3:2 aspect
 * ratio instead of collapsing. In a shrink-to-fit parent (a float,
 * width:max-content, an unsized absolute wrapper), percentages have
 * nothing to resolve against — size the slot or its wrapper explicitly
 * there. For a fixed-size slot, set
 * width/height on the element itself (inline style), which overrides the
 * default. When
 * layering content above a slot (full-bleed layouts), make the overlay
 * click-through — pointer-events: none on scrims/text plates, re-enabled
 * on interactive children — so the slot's hover controls stay reachable.
 * Keep the slot's bottom-left corner visually clear as well: the credit
 * overlay renders there, and a dark fade or text plate covering it hides
 * the attribution Unsplash's terms require — end the fade above that
 * corner, or keep it nearly transparent where the credit sits.
 *
 * Usage:
 *   <div style="position:relative;width:100%;height:100%">      <!-- full-bleed: -->
 *     <image-slot id="bg" shape="rect"></image-slot>            <!-- fills the wrapper -->
 *   </div>
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';

  // Unsplash terms require visible attribution wherever their photos
  // display, and every link back to unsplash.com must carry utm referral
  // params. Two render-time rules enforce that here:
  //  - an Unsplash-src slot with NO credit attribute renders an error
  //    tile INSTEAD of the photo (an uncredited Unsplash photo on screen
  //    is itself the terms violation, so it never renders bare);
  //  - rendered credit links pointing at unsplash.com get the referral
  //    params appended when absent (credit-href values live in page
  //    content that can't be edited after the fact).
  // Keep the utm_source value in sync with UTM_SOURCE in
  // platform/web-agent/unsplash.ts — this file is a project-local
  // artifact and cannot import it (equality is pinned by tests).
  const UNSPLASH_HOMEPAGE_HREF = 'https://unsplash.com/?utm_source=claude_design&utm_medium=referral';
  // Host rule mirrors the hotlink validator that admits Unsplash srcs into
  // pages in the first place (cdn$ in unsplash.ts: apex or any subdomain)
  // — Unsplash+ results serve from plus.unsplash.com, not just images.*,
  // and an admitted-but-uncredited photo must error whatever unsplash
  // host it rides on.
  // Trailing-dot FQDNs (images.unsplash.com.) are the same host to the
  // browser but would miss the regex — strip one dot so the check fails
  // CLOSED (unrecognized-but-real Unsplash srcs must error, not render).
  const isUnsplashHost = u => {
    try {
      return /(^|\.)unsplash\.com$/.test(new URL(u, document.baseURI).hostname.replace(/\.$/, ''));
    } catch {
      return false;
    }
  };
  // Render-time referral normalization for links back to Unsplash:
  // appends utm_source/utm_medium when absent, preserves every existing
  // query param, never overwrites an existing utm_source, and passes
  // non-Unsplash URLs through untouched. Input is an ABSOLUTE validated
  // http(s) URL (the credit render funnel resolves + validates first).
  const withReferral = href => {
    try {
      const u = new URL(href);
      if (!/(^|\.)unsplash\.com$/.test(u.hostname.replace(/\.$/, ''))) {
        return href;
      }
      if (!u.searchParams.has('utm_source')) {
        u.searchParams.set('utm_source', 'claude_design');
      }
      if (!u.searchParams.has('utm_medium')) {
        u.searchParams.set('utm_medium', 'referral');
      }
      return u.toString();
    } catch (e) {
      return href;
    }
  };
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  // Unload-time flush: save()'s serialization defers a mid-RTT re-fire to a
  // .then that never runs in an unloading document, silently dropping a
  // pagehide commit. Post the current slots immediately instead — content
  // is a superset snapshot of any in-flight save's, the write is a
  // whole-file last-writer-wins replace, and postMessage FIFO delivers it
  // to the host after the in-flight one, so a backend-side reorder at
  // worst reproduces the dropped-commit outcome this flush improves on.
  // Guarded on the initial sidecar read: pre-hydration slots can miss
  // other slots' persisted entries, and flushing it would clobber them —
  // that narrow case stays best-effort (the in-memory merge in load()
  // cannot happen in an unloading document anyway).
  function flushNow() {
    if (!loaded) return;
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    try {
      Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {});
    } catch (e) {}
  }
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet =
  // Fill the container by default: slots are usually placed inside a
  // sized wrapper (a hero frame, a grid cell, an inset:0 layer) and are
  // expected to take that box — a fixed intrinsic size would render as
  // a small tile in the corner of a full-bleed wrapper instead.
  // aspect-ratio is the companion fallback that keeps a bare slot
  // visible when the parent's height is indefinite: height:100%
  // resolves to auto there, and the ratio then derives height from
  // width instead of letting the slot collapse to zero height.
  // Explicit width/height on the element override all of this.
  ':host{display:block;position:relative;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);' + '  width:100%;height:100%;aspect-ratio:3/2}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  // popover=manual promotes the spill to the top layer on reframe, so it is
  // not clipped by any overflow:hidden / clip-path / scroll-container
  // ancestor (a plain z-index can't escape overflow clipping). UA popover
  // defaults (inset:0;margin:auto) are reset; _applyView sets viewport px.
  '.spill{position:fixed;margin:0;inset:auto;border:0;padding:0;background:transparent;' + '  overflow:visible;transform:translate(-50%,-50%);z-index:1;cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls overlay INSIDE the frame, pinned to the top-right corner, so
  // a full-bleed slot in an overflow:hidden container still shows them
  // (the old below-mask placement got clipped). Credit sits bottom-left,
  // so top-right avoids collision. The blurred pill background keeps them
  // legible over the image.
  // The UA [popover] base rule styles the element in EVERY state (only
  // display:none is gated on :not(:popover-open), and the display:flex
  // below overrides that) — so the UA resets live HERE, like .spill's,
  // or the ordinary hover-state strip renders as a bordered Canvas box
  // centered by margin:auto. inset:auto precedes top/right (shorthand).
  '.ctl{position:absolute;inset:auto;top:8px;right:8px;margin:0;border:0;padding:0;' + '  background:transparent;overflow:visible;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' +
  // While reframing, the spill owns the top layer and would swallow every
  // click on the in-frame controls. Promoting .ctl into the top layer
  // ABOVE the spill (shown after it — later popovers stack higher) keeps
  // Edit-as-toggle and Replace clickable mid-reframe. _applyView pins it
  // to the frame's top-right in viewport px (translateX(-100%)
  // right-aligns against the computed left edge); inset:auto clears the
  // base rule's top/right so the inline left/top position it alone.
  '.ctl:popover-open{position:fixed;inset:auto;transform:translateX(-100%)}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}' +
  // Replacement in flight: after a src swap the browser keeps painting
  // the PREVIOUS image until the new one decodes, so a Replace would
  // flash the old photo and then pop. Hide the stale frame (visibility,
  // not display — _applyView geometry still applies) and spin until the
  // new image reports in (load/error clears data-swapping).
  ':host([data-swapping]) .frame img{visibility:hidden}' + '.loading{position:absolute;inset:0;display:none;align-items:center;' + '  justify-content:center;pointer-events:none}' + ':host([data-swapping]) .loading{display:flex}' + '.loading::after{content:"";width:22px;height:22px;border-radius:50%;' + '  border:2px solid rgba(0,0,0,.12);border-top-color:rgba(0,0,0,.45);' + '  animation:om-slot-spin .7s linear infinite}' + '@keyframes om-slot-spin{to{transform:rotate(360deg)}}' +
  // Reduced motion: the static two-tone ring still reads as "working".
  '@media (prefers-reduced-motion:reduce){.loading::after{animation:none}}' + '.credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);display:none;' + '  padding:3px 7px;border-radius:5px;background:rgba(0,0,0,.55);color:#fff;' + '  font:10px/1.2 system-ui,-apple-system,sans-serif;text-decoration:none;' + '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;backdrop-filter:blur(6px)}' +
  // The credit is a SPAN holding one or two <a>s (Unsplash's prescribed
  // form links the photographer AND Unsplash) — anchors style inline so
  // the overlay reads as one line of text.
  '.credit a{color:inherit;text-decoration:none}' + '.credit a:hover,.credit a:focus-visible{text-decoration:underline}' + ':host([data-filled][data-credit]) .credit{display:block}' +
  // Exports must ship JUST the image — no hover controls, no credit chip
  // (the host marks <html data-om-exporting> for the capture window; the
  // page-level hide script can't reach shadow DOM, this rule can).
  ':host-context([data-om-exporting]) .ctl,' + ':host-context([data-om-exporting]) .credit{display:none !important}' +
  // No export-window mask rules here on purpose: the export capture
  // releases the replacement mask by REMOVING data-swapping (the
  // shadow-root pass in pages/export/shared.ts HIDE_EXPORT_CHROME_SCRIPT)
  // — attribute removal works in every engine (:host-context is
  // Chromium-only), is scoped by construction to slots actually
  // mid-swap, and hides the spinner through the same gate. A masked img
  // would otherwise be silently dropped from PPTX decks (the capture
  // walk skips visibility:hidden imgs).
  // Attribution error tile: REPLACES the photo when an Unsplash src has
  // no credit attribute — rendering the photo uncredited is the terms
  // violation, so the photo must not appear at all.
  // Calm and neutral on purpose (review feedback): the tile informs the
  // user; the fix instructions are machine-facing (usage docblock, tool
  // description, and the turn-end scan's bounce copy name the attributes
  // for the agent).
  '.attr-error{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  background:#f2f1ef;color:#6e6c66;user-select:none;' + '  font:13px/1.45 system-ui,-apple-system,sans-serif}' + '.attr-error svg{opacity:.55}' + '.attr-error .cap{max-width:92%;font-weight:500;letter-spacing:.01em}' + ':host([data-attribution-error]) .attr-error{display:flex}' + ':host([data-attribution-error]) .ring{display:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  const warnIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>' + '<path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'placeholder', 'src', 'id', 'credit', 'credit-href'];
    }

    /** Duplicate-slide hook (called by deck-stage, see its
     *  _remintDuplicateIds): copy this id's stored image, if any, under a
     *  freshly minted key and return that key — so a duplicated slide's
     *  slot keeps its dropped photo instead of reverting to the
     *  placeholder. 'isFree' is the caller's uniqueness check (document
     *  ids); candidates must ALSO be unused in the sidecar, which can
     *  hold keys from other pages sharing the project root. (An EMPTY
     *  slot on another page leaves no sidecar entry, so its id is not
     *  detectable here — a minted key can collide with it and that slot
     *  would show this photo. Same blast radius as two pages reusing an
     *  id by hand, which the shared sidecar already permits.) Returns null
     *  when no id could be minted (caller strips the id, today's
     *  behavior). */
    static cloneSlot(fromId, isFree) {
      if (typeof fromId !== 'string' || !fromId) return null;
      // Pre-hydration the store can't veto candidates or source the copy
      // — degrade to the strip (today's behavior) rather than mint
      // against keys we can't see yet. Any rendered (= droppable) slot
      // means load() has already settled.
      if (!loaded) return null;
      const stem = fromId.replace(/-\d+$/, '') || fromId;
      for (let n = 2; n < 100; n++) {
        const toId = stem + '-' + n;
        if (toId === fromId) continue;
        if (slots[toId] !== undefined) {
          // Reuse a key holding this exact value (bytes AND crop) if no
          // live element here owns it — a duplicate op the host refused
          // after minting leaves such a key behind, and reusing keeps
          // refused retries from accumulating one orphaned copy per
          // attempt. Full equality (not just bytes) so a byte-identical
          // key another PAGE owns with its own crop is stepped past, not
          // adopted or rewritten. (Entries without .u never match.)
          const prev = getSlot(toId);
          const cur = getSlot(fromId);
          if (!(prev && cur && prev.u && prev.u === cur.u && prev.s === cur.s && prev.x === cur.x && prev.y === cur.y && (typeof isFree !== 'function' || isFree(toId)))) continue;
          return toId;
        }
        if (typeof isFree === 'function' && !isFree(toId)) continue;
        const v = getSlot(fromId);
        if (v) setSlot(toId, Object.assign({}, v));
        return toId;
      }
      return null;
    }
    constructor() {
      super();
      // clonable: rail thumbnails deep-clone slides and carry this shadow
      // along; reuse an already-cloned root so upgrade-after-clone works.
      // (Deliberately NOT serializable — a getHTML consumer would embed
      // multi-MB sidecar data-URLs into serialized page HTML.)
      const root = this.shadowRoot || this.attachShadow({
        mode: 'open',
        clonable: true
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="attr-error" part="attribution-error">' + warnIcon + '    <div class="cap">This photo needs attribution</div></div>' + '  <div class="loading" part="loading"></div>' + '  <div class="ring" part="ring"></div>' + '</div>' +
      // Outside .frame, like .spill/.ctl — the frame's overflow:hidden +
      // border-radius/clip-path would cut the credit off on circle/pill/mask.
      // A SPAN, not an <a>: the prescribed Unsplash credit holds two links
      // (photographer + Unsplash), built per-render in _render().
      '<span class="credit" part="credit"></span>' + '<div class="spill" popover="manual" data-dc-edit-transparent>' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' +
      // data-dc-edit-transparent: the DC editor's edit-mode picker lets
      // clicks through for chrome marked with it (EDIT_TRANSPARENT_SEL)
      // — without it, Replace/Edit clicks in Edit mode are swallowed by
      // element selection and the controls look dead.
      '<div class="ctl" popover="manual" data-dc-edit-transparent><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="edit" title="Reframe image">Edit</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ctl = root.querySelector('.ctl');
      this._credit = root.querySelector('.credit');
      this._attrError = root.querySelector('.attr-error');
      // Credit clicks open the link, not browse/reframe.
      this._credit.addEventListener('click', e => e.stopPropagation());
      this._credit.addEventListener('dblclick', e => e.stopPropagation());
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      // Encode-in-flight marker (the owning _ingest generation): while set,
      // the same-src "nothing in flight" clear in _render must not fire —
      // the stored value still points at the OLD image until the encode
      // lands, so that clear would unmask the stale image mid-replace.
      this._swapGen = 0;
      // Render-owned swap in flight: set when _render assigns a new src,
      // cleared only by the img's own load/error (or the empty branch).
      // img.complete CANNOT stand in for this — setting src only QUEUES
      // the current-request swap (a microtask), so synchronously after an
      // assignment, complete still reports the OLD settled request. The
      // pick path does exactly that: the host sets src, credit, and
      // credit-href back-to-back in one task, and renders #2/#3 would
      // read the stale complete === true and drop the mask one render
      // after it was set.
      this._loadPending = false;
      // See _render's empty branch: a transient attribution-error wipe of a
      // showing image must make the follow-up render a replacement (spinner),
      // not a first fill (blank frame).
      this._hidShowing = false;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        // The hidden controls are opacity-0 but still tabbable — without
        // this gate a keyboard user could drive them on a read-only share
        // link (mirrors the dblclick handler's editable gate).
        if (!this.hasAttribute('data-editable')) return;
        if (act === 'replace') {
          this._exitReframe(true);
          // Host-owned picker (Unsplash modal; it also offers local import).
          this.dispatchEvent(new CustomEvent('image-slot:pick', {
            bubbles: true,
            composed: true,
            detail: {
              id: this.id || null
            }
          }));
        }
        if (act === 'edit') {
          if (!this._reframes()) return;
          if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      // load/error also release the replacement-in-flight mask (via the
      // single discipline in _releaseMask): the swap is only revealed once
      // the new image can actually paint (on error the frame shows its
      // background, same as a fresh slot with a broken src).
      this._img.addEventListener('load', () => {
        this._loadPending = false;
        this._releaseMask(true);
        this._applyView();
      });
      this._img.addEventListener('error', () => {
        this._loadPending = false;
        this._releaseMask(true);
      });
      // Gated only on editable — any filled slot can be repositioned/scaled,
      // regardless of fit. Share links (no writeFile) stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
          const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // The host may inject window.omelette.writeFile AFTER the first render;
      // re-render on hover so the editable-gated controls reliably appear.
      this.addEventListener('pointerenter', this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('pointerenter', this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      // commit=false: a disconnect is not a user intent — committing here
      // would persist whatever half-finished drag a React remount or DOM
      // splice happened to interrupt. Deliberate exits commit on their own
      // paths (Escape/click-out/toggle), and unloads commit via pagehide.
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._signalReframe(true);
      // Best-effort commit when the document unloads mid-reframe (a host
      // navigation racing the enter signal, a manual reload, tab close):
      // the sidecar write rides the host bridge, which outlives this
      // document, so the crop survives even though the mode dies with the
      // DOM. Held on the instance so _exitReframe detaches exactly what
      // was attached.
      this._pagehide = () => {
        this._exitReframe(true);
        flushNow();
      };
      window.addEventListener('pagehide', this._pagehide);
      // Promote spill to the top layer, then keep it pinned over the frame:
      // scroll/resize cover the common cases, and a per-frame rect check
      // catches layout shifts that fire neither (an image above finishing
      // load, streamed DOM pushing the slot down, an ancestor transform
      // change) so the overlay can't detach from the frame.
      try {
        this._spill.showPopover();
      } catch {}
      // After the spill, so the controls stack above it in the top layer.
      try {
        this._ctl.showPopover();
      } catch {}
      this._reposition = () => {
        if (this.hasAttribute('data-reframe')) this._applyView();
      };
      window.addEventListener('scroll', this._reposition, true);
      window.addEventListener('resize', this._reposition);
      this._lastRect = '';
      this._watch = () => {
        if (!this.hasAttribute('data-reframe')) return;
        const r = this.getBoundingClientRect();
        const key = r.left + ',' + r.top + ',' + r.width + ',' + r.height;
        if (key !== this._lastRect) {
          this._lastRect = key;
          this._applyView();
        }
        this._watchId = requestAnimationFrame(this._watch);
      };
      this._watchId = requestAnimationFrame(this._watch);
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (this._reposition) {
        window.removeEventListener('scroll', this._reposition, true);
        window.removeEventListener('resize', this._reposition);
        this._reposition = null;
      }
      if (this._watchId) {
        cancelAnimationFrame(this._watchId);
        this._watchId = 0;
      }
      if (this._pagehide) {
        window.removeEventListener('pagehide', this._pagehide);
        this._pagehide = null;
      }
      try {
        this._spill.hidePopover();
      } catch {}
      try {
        this._ctl.hidePopover();
      } catch {}
      this._ctl.style.left = '';
      this._ctl.style.top = '';
      if (commit) this._commitView();
      this._signalReframe(false);
    }

    // Reframe state lives only in this DOM until commit, invisible to the
    // host's dirty signals — announce enter/exit so the host can hold
    // auto-reloads for exactly the gesture (the guest bundle forwards
    // image-slot:reframe to the host as imageSlotReframe). Dispatched on
    // the element (composed, so it escapes shadow roots) while connected;
    // a disconnected exit (disconnectedCallback) falls back to document so
    // the host still hears it.
    _signalReframe(active) {
      const target = this.isConnected ? this : document;
      target.dispatchEvent(new CustomEvent('image-slot:reframe', {
        bubbles: true,
        composed: true,
        detail: {
          active: active,
          id: this.id || null
        }
      }));
    }

    // Public: host's "Import from computer" calls this to run local browse.
    openFilePicker() {
      this._exitReframe(true);
      this._input.click();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      // Replacing a shown image: surface the swap through the encode too,
      // not just the decode — otherwise the old photo sits there with no
      // feedback while the canvas re-encode runs. An empty slot keeps its
      // placeholder (no spinner) until the encode lands, as before.
      // _swapGen guards the mask against re-renders DURING the encode
      // (pointerenter, ResizeObserver, another slot's store write): the
      // stored value still resolves to the old image there, so _render's
      // same-src clear would otherwise unmask it mid-replace.
      if (this.hasAttribute('data-filled')) {
        this.setAttribute('data-swapping', '');
        this._swapGen = gen;
      }
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        // Clear BEFORE setSlot: its synchronous re-render must see no
        // pending encode, so a byte-identical re-upload (same data URL, no
        // load event coming) still clears the mask via the complete branch.
        this._swapGen = 0;
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._swapGen = 0;
        // Reveal the kept old image — unless another replacement (a
        // remote pick's src swap) is still in flight, in which case the
        // mask stays until THAT image settles (its load/error releases).
        this._releaseMask();
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is available on any filled slot — the user can
    // always reposition/scale. `fit` only sets the initial baseline (see
    // _geom): contain starts fully-visible, cover starts frame-filling.
    _reframes() {
      return this.hasAttribute('data-filled');
    }

    // The single release discipline for the replacement-in-flight mask
    // (data-swapping). The mask comes off only when BOTH hold:
    //  - no encode is pending (_swapGen) — mid-encode the stored value
    //    still resolves to the old image, so any reveal paints it;
    //  - the frame img has settled on its current src — an unsettled src
    //    means some replacement is still in flight (e.g. a remote pick),
    //    whoever started it, and revealing would paint the previous
    //    frame. The load/error listeners pass settled=true (the event IS
    //    the settlement signal, per spec complete is true by then);
    //    other callers rely on the complete flag (covers loaded AND
    //    failed).
    // Every release path funnels through here EXCEPT _render's empty
    // branch (the img is being cleared — nothing will ever settle).
    _releaseMask(settled) {
      if (!this._swapGen && !this._loadPending && (settled || this._img.complete)) {
        this.removeAttribute('data-swapping');
      }
    }

    // Baseline geometry, shared by clamp/apply/resize. `base` is the scale at
    // view-scale s=1: cover = fill the frame (overflow on the looser axis),
    // contain = fit fully inside (letterboxed). Zooming a contain image past
    // s where it overflows naturally becomes a crop. Null until the img has
    // loaded (naturalWidth is 0 before that) or when the slot has no layout
    // box — ResizeObserver fires with a 0×0 rect under display:none, and
    // clamping against a degenerate 1×1 frame would silently pull the stored
    // pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
      const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
      return {
        iw,
        ih,
        fw,
        fh,
        base
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      // Top-layer controls: pin to the frame's top-right in viewport px
      // (the same 8px inset as the in-frame layout; unscaled — top-layer UI
      // reads as chrome, not page content). BEFORE the geometry branch:
      // placement needs only the frame rect, and a not-yet-loaded or broken
      // src must not leave the promoted strip floating unpositioned. Gated
      // on the popover actually being open: without the Popover API,
      // showPopover() threw (swallowed in _enterReframe), .ctl stays in
      // its in-frame absolute layout, and viewport-px coordinates would
      // shove it off-frame — and matches(':popover-open') itself throws
      // there (unknown pseudo-class), hence the try/catch.
      if (this.hasAttribute('data-reframe')) {
        let onTop = false;
        try {
          onTop = this._ctl.matches(':popover-open');
        } catch {}
        if (onTop) {
          const r = this.getBoundingClientRect();
          this._ctl.style.left = r.right - 8 + 'px';
          this._ctl.style.top = r.top + 8 + 'px';
        }
      }
      if (!g) {
        // Dimensions not known yet (before img load) — centered fit so there
        // is no flash of an unpositioned image before the geometry lands.
        const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = contain ? 'contain' : 'cover';
        return;
      }
      // Baseline (cover-fill or contain-fit) × view scale. Width/height and
      // left/top are all frame-% — depends only on the frame aspect ratio, so
      // a responsive resize keeps the same crop. The spill layer mirrors the
      // same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      if (this.hasAttribute('data-reframe')) {
        // Top-layer spill: position in viewport px over the frame. The top
        // layer escapes ancestor transforms entirely, so EVERY term must be
        // in viewport units: getBoundingClientRect gives the frame's scaled
        // origin AND size, and the rect/layout ratio rescales the ghost —
        // sizing from layout px alone renders it 1/scale too large under a
        // scaled deck slide. Inner ghost + handles stay box-relative.
        const r = this.getBoundingClientRect();
        const sx = g.fw ? r.width / g.fw : 1;
        const sy = g.fh ? r.height / g.fh : 1;
        this._spill.style.width = g.iw * k * sx + 'px';
        this._spill.style.height = g.ih * k * sy + 'px';
        this._spill.style.left = r.left + (50 + this._view.x) / 100 * r.width + 'px';
        this._spill.style.top = r.top + (50 + this._view.y) / 100 * r.height + 'px';
      }
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      // An Unsplash src with no credit attribute must NOT render — showing
      // the photo uncredited is the Unsplash-terms violation itself. The
      // error tile replaces the photo until the credit is written. A
      // user-dropped image is the user's own content and always renders.
      // Trimmed: credit is agent/user-editable content, and a whitespace-
      // only value must count as missing — otherwise it would suppress the
      // error tile AND render an empty credit box (no text, no links),
      // exactly the unattributed state this gate exists to prevent.
      const credit = (this.getAttribute('credit') || '').trim();
      const attrError = !!(!credit && !this._userUrl && srcAttr && isUnsplashHost(srcAttr));
      this.toggleAttribute('data-attribution-error', attrError);
      if (url && !attrError) {
        const prev = this._img.getAttribute('src');
        if (prev !== url) {
          // Replacing an already-shown image: mark the swap BEFORE setting
          // src so the stale frame is never revealed (see the data-swapping
          // stylesheet rules). First fill (prev empty) keeps the existing
          // placeholder-until-load behavior — no spinner. _hidShowing
          // covers the pick path's transient attribution-error wipe: prev
          // is gone, but an image WAS showing, so this is a replacement.
          if (prev || this._hidShowing) this.setAttribute('data-swapping', '');
          // Mark the swap BEFORE assigning src: complete keeps reporting
          // the old settled request until the browser's
          // update-the-image-data microtask runs, so same-task re-renders
          // (the pick path's credit/credit-href setAttributes) need this
          // flag, not complete, to know a load is in flight.
          this._loadPending = true;
          this._img.src = url;
          this._ghost.src = url;
        } else {
          // Same-src re-render — release if settled, so an ingest-set
          // spinner can't stick after a byte-identical re-upload (same
          // data URL, no further load event ever fires).
          this._releaseMask();
        }
        this._hidShowing = false;
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this.removeAttribute('data-swapping');
        // The src is being removed — no load/error will ever fire for it.
        this._loadPending = false;
        // A transient attribution-error wipe of a showing image happens on
        // the pick path: the host sets src one setAttribute before credit,
        // so render N hides the old image (attrError) and render N+1
        // restores a URL. Remember the wipe so that restore renders as a
        // replacement (spinner), not a first fill (blank frame).
        this._hidShowing = attrError && !!this._img.getAttribute('src');
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        // The error tile owns the blocked-photo state; .empty stays for
        // the genuinely-empty slot.
        this._empty.style.display = attrError ? 'none' : 'flex';
        this.removeAttribute('data-filled');
      }

      // Credit belongs to the author src, so a user drop hides it.
      // textContent + the http(s)-only funnel keep external strings inert.
      const showCredit = !!(url && credit && !this._userUrl && !attrError);
      this._credit.textContent = '';
      if (showCredit) {
        // Validate once (resolved against the document, http(s) only),
        // then append the terms-required utm referral params to links
        // that point back at unsplash.com.
        let href = '';
        const rawHref = this.getAttribute('credit-href') || '';
        if (rawHref) {
          try {
            const u = new URL(rawHref, document.baseURI);
            if (u.protocol === 'http:' || u.protocol === 'https:') {
              href = withReferral(u.href);
            }
          } catch {}
        }
        const mkLink = (text, linkHref) => {
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.setAttribute('href', linkHref);
          a.textContent = text;
          return a;
        };
        // Unsplash's prescribed credit is TWO links — the photographer's
        // name to their profile (credit-href) and 'Unsplash' to the
        // homepage. Render that split whenever the text has the canonical
        // shape; other text keeps the legacy single-link rendering.
        const m = /^Photo by (.+) on Unsplash$/.exec(credit);
        if (m) {
          this._credit.appendChild(document.createTextNode('Photo by '));
          this._credit.appendChild(href ? mkLink(m[1], href) : document.createTextNode(m[1]));
          this._credit.appendChild(document.createTextNode(' on '));
          this._credit.appendChild(mkLink('Unsplash', UNSPLASH_HOMEPAGE_HREF));
        } else if (href) {
          this._credit.appendChild(mkLink(credit, href));
        } else {
          this._credit.textContent = credit;
        }
      }
      this.toggleAttribute('data-credit', showCredit);
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/image-slot.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.ScrollProgress = __ds_scope.ScrollProgress;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.SocialIcon = __ds_scope.SocialIcon;

__ds_ns.SocialLinks = __ds_scope.SocialLinks;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.ThemeToggle = __ds_scope.ThemeToggle;

__ds_ns.TimelineItem = __ds_scope.TimelineItem;

})();
