import UserType from 'types/user'
const END_POINTS = {
  // GET
  get: (user?: Partial<UserType>) => ({}),
  // POST
  post: (user?: Partial<UserType>) => ({
    signup: 'auth/signup',
    'forgot-password': 'auth/forgot-password',
    'forgot-password-otp-verify': 'auth/forgot-password/verify-otp',
    login: 'auth/login',
    'add-coupons': '/coupons',
    'resend-email-verification': 'auth/resend-email-verification',
  }),
  // PUT
  put: (user?: Partial<UserType>) => ({}),
  // DELETE
  delete: (user?: Partial<UserType>) => ({}),
}

export default END_POINTS
