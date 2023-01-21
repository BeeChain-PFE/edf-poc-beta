import * as P from "./paths";

const cheminFichier = `${window.location.origin}/configuration.json`;
let baseUrl = "";

const getBaseUrl = () => {
  if (baseUrl) return Promise.resolve(baseUrl);
  return fetch(cheminFichier)
    .then((r) => r.json())
    .then((r) => {
      baseUrl = r.SYRAUCO_API;
      return r.SYRAUCO_API;
    });
};

export const get = async ({ base, url, setters = {}, resultType }) => {
  const {
    setResult = () => {},
    setLoading = () => {},
    setError = () => {},
  } = setters;
  return fetch(`${base}${url}`)
    .then((r) => {
      if (r.ok) {
        if (resultType === "FILENAME") {
          return r.headers.get("Content-Disposition").split('"')[1];
        }
        if (resultType === "FILE") {
          return r.blob();
        }

        if (resultType === "BLOB") {
          const filename = r.headers
            .get("Content-Disposition")
            .split("filename=")[1];

          r.blob()
            .then((bl) => {
              var blob = new Blob([bl], {
                type: "application/octet-stream",
              });

              const urlBlob = window.URL.createObjectURL(blob);
              let a = document.createElement("a");
              a.href = urlBlob;
              a.download = filename.substring(0, filename.length - 1);

              a.click();
            })
            .catch((e) => {
              setError(`${e}`);
              setLoading(false);
            });
        }

        return r.json();
      }

      return r.json();
    })
    .then((r) => {
      if (r.status === 400) {
        setError(`${r.errors[0]}`);
        setLoading(false);
      } else {
        setResult(r);
        setLoading(false);
      }
      return r;
    })
    .catch((e) => {
      setError(`${e}`);
      setLoading(false);
    });
};

export const post = async ({ base, url, body, headers, setters }) => {
  const {
    setResult = () => {},
    setLoading = () => {},
    setError = () => {},
  } = setters;
  return fetch(`${base}${url}`, {
    method: "POST",
    headers: {
      ...headers,
    },
    body,
  })
    .then((r) => {
      console.log("iciiiiii");
      if (r.ok) {
        return r.text();
      } else if (r.status === 400) {
        r.json()
          .then((rj) => {
            setError(rj.errors[0]);
          })
          .catch((e) => {
            setError(e);
            setLoading(false);
          });
      }
    })
    .then((r) => {
      setResult(r);
      setLoading(false);
    })
    .catch((e) => {
      setLoading(false);
    });
};

export const deleteHttp = async ({ url, setters, body, headers }) => {
  const b = await getBaseUrl();
  return fetch(`${b}${url}`, {
    method: "DELETE",
    headers: {
      ...headers,
    },
  });
};
