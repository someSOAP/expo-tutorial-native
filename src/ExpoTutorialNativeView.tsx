import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoTutorialNativeViewProps } from './ExpoTutorialNative.types';

const NativeView: React.ComponentType<ExpoTutorialNativeViewProps> =
  requireNativeView('ExpoTutorialNative');

export default function ExpoTutorialNativeView(props: ExpoTutorialNativeViewProps) {
  return <NativeView {...props} />;
}
