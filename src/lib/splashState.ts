let _done = false

export const SPLASH_EVENT = 'fipl:splashDone'
export const markSplashDone = () => {
  _done = true
}
export const isSplashDone = () => _done
