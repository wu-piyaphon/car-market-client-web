/** biome-ignore-all lint/correctness/useExhaustiveDependencies: required to prevent unnecessary re-renders */

import _ from "lodash";
import { useEffect, useRef } from "react";

export function useDeepCompareEffect(
  callback: React.EffectCallback,
  dependencies: React.DependencyList,
) {
  const previousDependenciesRef = useRef<React.DependencyList | undefined>(
    undefined,
  );

  if (!_.isEqual(previousDependenciesRef.current, dependencies)) {
    previousDependenciesRef.current = dependencies;
  }

  useEffect(callback, [previousDependenciesRef.current]);
}
