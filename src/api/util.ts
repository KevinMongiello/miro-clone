export const post = (body: Object) => ({
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json'
  }
});