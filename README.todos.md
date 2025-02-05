# Done
- [x] Migrate to Vite || Webpack
- [x] Configure Vite proxy to enable sending cookies (since 'same' origin is required)

# Todo
- [ ] Auth
  - [x] Basic Auth: Signup, Login, Logout
  - [x] Advanced Auth: Password Encryption, form validation, Error messages
    - [x] Auth Flow / Password Encryption
      - [x] Confirm password = password2 (Sign up only)
      - [x] Simple hash of password before wiring (sha256)
      - [x] Server side again hashes password (argon2id)
      - [x] Store in DB (signup)
      - [x] Fetch & Compare against DB (login)
      - [x] Set JWT cookie (login)
  - [ ] Use HTTPS
    - [ ] Does cookie work over non-https?... is it just for localhost?
  - [ ] Forgot Password pages
  - [ ] Enable Auth via Okta
- [ ] Notifications/banners
- [ ] Integrate Jest and create tests

# Bugs
- [ ] Visible objects stat includes background lines

# Optimizations
- [ ] Tools should receive board instance via constructor. This way, they don't have to be passed the board instance with every call.
- [ ] Shape tool should use the selection tool under the hood. Just get the selection coords and draw a square over it.
- [ ] Improve Signup/Login Form (validations, encryption, error messages, etc)

# Extras
- [ ] Logging via Logrocket or similar

# Notes
- GET will still send cookies without credentials: 'include'
- credentials: 'include' is not required if making requests to same-origin (or using proxy)