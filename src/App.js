import React, { useRef } from 'react';
import './style.css';

export default function App({ title, data = [] }) {
  const ref = useRef(null);
  const onClick = () => {
    ref.current.dispatchEvent(new CustomEvent('myEvent', { composed: true }));
  };

  return (
    <div ref={ref}>
      <div>{title}</div>
      <table>
        {data.map((row) => (
          <tr>
            <td>{row}</td>
          </tr>
        ))}
      </table>
      <div>
        <slot />
      </div>
      <button onClick={onClick}>Click me!</button>
    </div>
  );
}
