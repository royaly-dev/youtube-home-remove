window.addEventListener('load', (e) => {
    let t = document.querySelector("#save")
    t.addEventListener('click', (e) => {
        let saveButton = document.querySelector('#save')
        saveButton.value = "saved !"
        setTimeout(() => {
            saveButton.value = "save"
        }, 1000)
    })
})