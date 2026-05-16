// Module-level flag — true once the splash has completed in this JS session.
// Resets on hard refresh (module re-evaluated), persists across SPA navigations.
let _done = false

export const SPLASH_EVENT = 'fipl:splashDone'
export const markSplashDone = () => { _done = true }
export const isSplashDone = () => _done
