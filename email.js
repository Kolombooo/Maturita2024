function count(needle, haystack) { // Funkce na součet znaku ve stringu (N: znak, H: string)
    for(var count=-1,index=-2; index != -1; count++,index=haystack.indexOf(needle,index+1) );
    return count;
}

function validate(email) {
    while (true) {
        if (count("@", email) !== 1) {
            return false;
        }

        var name = email.split("@")[0]; // Sekce stringu před zavináčem
        var dom = email.split("@")[1]; // Sekce stringu za zavináčem
        var tld = dom.split(".")[0]; // Sekce domény (dom) za tečkou

        if (count(".", dom) <= 0) {
            return false;
        }

        if (dom.length < 3) {
            return false;
        }

        if (name.length < 1) {
            return false;
        }

        if (tld.length < 1) {
            return false;
        }

        if (dom.split("")[dom.length - 1] === "." || dom.split("")[0] === ".") {
            return false;
        }

        if (name.split("")[0] == ".") {
            return false;
        }

        return true; // Email prošel všechny kontroly, je validní
    }
}

const email = "jonas@gmail.com"; // Počáteční hodnota
console.log(validate(email));

// ALTERNATIVNÍ KÓD
// Hromadná validace
// Pro zapnutí změnit podmínku

if (true) {
    console.log("--------------------");
    const emails = ["jonas.4holubgmail.com", ".jonas.holub@mensagymnzium.cz"];
    console.log("Hromadné ověření " + emails.length + " adres.");
    console.log("+-----+----------------------------------------------");
    for (i = 0; i < emails.length; i++) {
        let stat = "";
        if (validate(emails[i])) {
            stat = "true ";
        } else {
            stat = "false";
        }
        console.log("|" + stat + "|" + emails[i]);
    }
    console.log("+-----+----------------------------------------------");
}