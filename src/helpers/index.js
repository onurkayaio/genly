export function parseQueryString(query) {
  if (!query) return {};

  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split("&")
    .reduce((params, param) => {
      let [key, value] = param.split("=");
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
      return params;
    }, {});
}

export function getToken() {
  const tokenObj = JSON.parse(localStorage.getItem("token"));

  // check token isExists and not expired.
  if (tokenObj && tokenObj.token && new Date() < new Date(tokenObj.expires)) {
    return tokenObj;
  } else return null;
}

export function deleteToken() {
  localStorage.removeItem("token");
}
