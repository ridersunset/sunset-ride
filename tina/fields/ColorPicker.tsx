'use client';
import React from 'react';
import { wrapFieldsWithMeta } from 'tinacms';

// Sélecteur de couleur natif — borné et sans saisie libre risquée.
export const ColorPickerInput: any = wrapFieldsWithMeta(({ input }: any) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <input
        type="color"
        id={input.name}
        {...input}
        value={input.value || '#b07f3a'}
        style={{
          width: '3rem',
          height: '3rem',
          padding: 0,
          border: '1px solid #e2e2e2',
          borderRadius: '4px',
          cursor: 'pointer',
          background: 'transparent',
        }}
      />
      <span style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
        {input.value || '#b07f3a'}
      </span>
    </div>
  );
});
