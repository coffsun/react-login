export const setCookie = (key, value, exdays) => {
  let d = new Date();
  d.setDate(d.getDate() + exdays);
  
  document.cookie = `${key}=${btoa(JSON.stringify(value))};expires=${d.toUTCString()}`;
};

export const getCookie = (key) => {
  let cookies = {};

  for (let cookie of document.cookie.split('; ')) {
    let [name, value] = cookie.split("=");
    cookies[name] = decodeURIComponent(value);
  }

  return cookies[key];
};

export const removeCookie = (key) => {
  let d = new Date(),
      expires;

  d.setTime(d.getTime() - (1000 * 60 * 60 * 24));
  expires = "expires=" + d.toGMTString();
  document.cookie = `${key}=;${expires}`;
}
