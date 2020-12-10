import React from 'react';

import ProtectTxProvider from './ProtectTxProvider';

export function withProtectTxProvider(Component: any) {
  return (ownProps: any) => {
    return (
      <ProtectTxProvider>
        <Component {...ownProps} />
      </ProtectTxProvider>
    );
  };
}
