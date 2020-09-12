import { useCallback, useEffect, useState } from 'react';

function isVisible(el) {
  const { top, bottom, left, right } = el.getBoundingClientRect();

  if (!window.innerHeight || !window.innerWidth) {
    return false;
  }

  return (
    top >= 0 &&
    left >= 0 &&
    bottom <= window.innerHeight &&
    right <= window.innerWidth
  );
}

function useOnScroll(cb) {
  useEffect(() => {
    let firing = false;

    const handle = () => {
      if (!firing) {
        // requestAnimationFrame trottles this callback.
        window.requestAnimationFrame(() => {
          firing = false;
          cb();
        });

        firing = true;
      }
    };

    // Call handle once when listener is registered.
    handle();
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, [cb]);
}

function useOnVisible(elRef, cb, deps) {
  if (!Array.isArray(deps)) {
    throw new Error('dependencies are required by useOnVisible');
  }

  const [state, setState] = useState(false);

  const callback = useCallback(cb, deps);

  const handle = useCallback(() => {
    const el = elRef.current;

    if (el) {
      if (!state && isVisible(el)) {
        setState(true);
        callback();
      } else if (state && !isVisible(el)) {
        setState(false);
      }
    }
  }, [elRef, callback]);

  useOnScroll(handle);
}

export default useOnVisible;
