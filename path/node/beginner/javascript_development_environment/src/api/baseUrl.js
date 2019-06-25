export default function getBaseUrl() {
  const inDevelopoment = window.location.hostname === 'localhost';
  return inDevelopoment ? 'http://localhost:3001/' : '/';
}
