/** biome-ignore-all lint/correctness/useExhaustiveDependencies: required to prevent unnecessary re-renders */

import _ from "lodash";
import { useEffect, useRef } from "react";

export function useDeepCompareEffect(
  callback: React.EffectCallback,
  dependencies: React.DependencyList,
) {
  const currentDependencies = dependencies;

  const previousDependenciesRef = useRef(currentDependencies);

  const signalDependencies = [previousDependenciesRef.current];

  if (!_.isEqual(previousDependenciesRef.current, currentDependencies)) {
    previousDependenciesRef.current = currentDependencies;
  }

  useEffect(callback, signalDependencies);
}
