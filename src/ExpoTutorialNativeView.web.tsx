import * as React from 'react';

import { ExpoTutorialNativeViewProps } from './ExpoTutorialNative.types';

export default function ExpoTutorialNativeView(props: ExpoTutorialNativeViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
