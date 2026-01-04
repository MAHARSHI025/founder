import React, { useEffect, useRef, useState } from "react";

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  duration = 800,
  style,
  className = "",
}) {
  const [displayValue, setDisplayValue] = useState(startValue);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = direction === "down" ? value : startValue;
    const end = direction === "down" ? startValue : value;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentValue = start + (end - start) * progress;

      setDisplayValue(Number(currentValue.toFixed(decimalPlaces)));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, startValue, direction, delay, decimalPlaces, duration]);

  return (
    <span
      style={{
        fontWeight: "bold",
        display: "flex",
        justifyContent:'center',
        color: "black",
        alignItems:'center',
    
        ...style,
      }}
      className={className}
    >
      {displayValue.toFixed(decimalPlaces)}+
    </span>
  );
}
