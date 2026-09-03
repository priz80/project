'use strict'

// let inputArg = 0; // проверка если тип int
// let inputArg; // проверка если пустая
let inputArg = "   qwqwqwqwqwasasasasaszxzxzxzxzxq    "; // 31 символ, без учета пропусков до и после строки



const getArgFunction = (arg) => {
  let argType = typeof arg;
  if (argType !== "string") {
    console.log("это не строка!")
  } else if (arg === ""){
    console.log("это пустая строка!")
  } else {
    arg = arg.trimStart();
    arg = arg.trimEnd();
    if (arg.length > 30)
      arg = arg.slice(0, 30) + "...";
    console.log(arg);
  }
}

getArgFunction(inputArg);