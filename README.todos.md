# Done
- [x] Migrate to Vite || Webpack
- [x] Configure Vite proxy to enable sending cookies (since 'same' origin is required)

# Todo
- [ ] Auth + DB Integration
  - [ ] Signup, Login, Forgot Password pages
  - [ ] Boards are protected until auth
- [ ] Enable Auth via Okta
- [ ] Tools should receive board instance via constructor. This way, they don't have to be passed the board instance with every call.
- [ ] Integrate Jest and create tests

# Bugs

- [ ] Visible objects stat includes background lines

# Optimizations

- [ ] Shape tool should use the selection tool under the hood. Just get the selection coords and draw a square over it.
- [ ] Improve Signup/Login Form (validations, encryption, error messages, etc)

# Extras

- [ ] Logging via Logrocket or similar

# Notes
- GET will still send cookies without credentials: 'include'
- credentials: 'include' is not required if making requests to same-origin (or using proxy)