export default function getHashParams() {
    const hashParams = {};
    const hash = window.location.hash.substr(1); // Remove the '#' symbol
    const queryParams = hash.split('&');
    queryParams.forEach(function (param) {
      const parts = param.split('=');
      const key = parts[0];
      const value = parts[1];
      hashParams[key] = decodeURIComponent(value);
    });
    return hashParams;
}
