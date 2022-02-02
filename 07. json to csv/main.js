const jsonForm = document.querySelector("#jsonform");
const csvForm = document.querySelector("#csvform");
const bConvert = document.querySelector("#bConvert");

bConvert.addEventListener("click", (e) => {
  let json;
  let keys = [];
  let values = [];
  try {
    json = JSON.parse(jsonForm.value);
  } catch (error) {
    console.log("Formato incorrecto", error);
  }

  if (Array.isArray(json)) {
    json.forEach((item) => {
      const nkeys = Object.keys(item);
      if (keys.length === 0) {
        keys = [...nkeys];
      } else {
        if (nkeys.length != keys.length) {
          throw new Error("Number of keys are different");
        } else {
          console.log("Bien", nkeys);
        }
      }
      const row = keys.map((k) => {
        return item[k];
      });
      values.push([...row]);
    });
    values.unshift(keys);
    const text = values.map((v) => v.join(",")).join("\n");
    csvForm.value = text;
  } else {
    console.log("No es un arreglo");
  }
});
