let docText = "{START:outer}A1{START:inner}B{END:inner}A2{END:outer}";
const open = "{START:";
const close = "}";

let docArray = docText.split("}");

function isStartTag(tag) {
    return tag.toString().startsWith(open)
}

function validate() {

    let result = "VALID";
    let tagArray = [];

    for (let i = 0; i < docArray.length; i++) {
        if (isStartTag(docArray[i])) {
            tagArray.push()
        }
    }

    return result;
}

console.log(validate(docText));
