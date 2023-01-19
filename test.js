async function func1() {

    return "func1"

}
async function func2() {

    return "func2"

}
async function func3() {

    return "func3"

}
async function func4() {

    return "func4"

}

async function home() {
    console.log(await func1())
    console.log(await func2())
    console.log(await func3())
    console.log(await func4())
}

home()