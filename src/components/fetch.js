import { ref, isRef, unref, watchEffect } from "vue";

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);

  async function doFetch() {
    data.value = null;
    error.value = null;

    const urlValue = unref(url);

    try {
      await timeout();

      const res = await fetch(urlValue);
      data.value = await res.json();
    } catch (e) {
      error.value = e;
    }
  }

  if (isRef(url)) {
    watchEffect(doFetch);
  } else {
    doFetch();
  }

  return { data, error, retry: doFetch };
}

function timeout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve();
      } else {
        reject(new Error("Random Error"));
      }
    }, 300);
  });
}
