import React, { ReactNode } from 'react';
import Script from 'next/script';

import './globals.scss';
import 'react-phone-input-2/lib/material.css';
import 'react-advanced-cropper/dist/style.css';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
// editor
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { NextAuthProvider, ReduxStoreProvider, ThemeProvider, SocketProvider } from '@/lib/index';

export default async function RootLayoutDep({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en'>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places&callback=initMapEmpty`}
        async
        defer
      />
      <Script
        id='google-map'
        dangerouslySetInnerHTML={{
          __html: `
                function initMapEmpty() {
                  // Add your map initialization code here
                }
              `
        }}
      />
      <ReduxStoreProvider>
        <ThemeProvider>
          <body
            style={{
              background: '#f5f5f5'
            }}
          >
            <NextAuthProvider>
              <SocketProvider>
                {children}
              </SocketProvider>
            </NextAuthProvider>
          </body>
        </ThemeProvider>
      </ReduxStoreProvider>
    </html>
  );
}
