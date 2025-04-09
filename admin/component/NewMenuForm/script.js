let templateFile = await fetch("./component/NewMenuForm/template.html");
let template = await templateFile.text();

let NewMenuForm = {};

NewMenuForm.format = function(handlerU){
    let html= template;
    html = html.replace('{{handlerUpdate}}', handlerU);
    return html;
}
export {NewMenuForm};

