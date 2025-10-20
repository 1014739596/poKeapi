var misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];

function Aleatorios(){
    document.getElementById("nuevos").innerHTML = "";
    console.log("----------------------------------")
    let pokesAleatorios = "";
    for (let i = 0; i < 4; i++) {
        let num = Math.floor(Math.random() * pokemones.length) + 1;

        pokesAleatorios += `
            <div class="c-lista-pokemon c-un_aleatorio">
                <p>${num}</p>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${num}.png" alt="${pokemones[num - 1].name}" width="60" height="60">
                <p>${pokemones[num - 1].name}</p>
            </div>`;


        misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];
        let existe = false;
        for(let j = 0; j < misNumeros.length; j++){
            if(misNumeros[j] === num){
                existe = true;
                break; 
            }
        }

        if (!existe) {
            misNumeros.push(num);
            localStorage.setItem("misNumeros", JSON.stringify(misNumeros));
            document.getElementById("c-unpoke-" + num).innerHTML = `
            <div  onclick="Detalle('${num}')">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png" width="auto" height="45" loading="lazy" alt="${num}">
                <p>${num}</p>
            </div>`
            document.getElementById("c-unpoke-" + num).classList.add("c-mios-pokemon")
        }
    }

    document.getElementById("nuevos").innerHTML += pokesAleatorios
    document.getElementById("contador").innerHTML = `${misNumeros.length} / ${totalPokes}`;
}





function Capturados(){
    document.getElementById("root").innerHTML = ""

    const capturaAleatorea = document.createElement("section");
    capturaAleatorea.classList.add("c-lista");
    capturaAleatorea.id = "nuevos"

    const boton = document.createElement("button");
    boton.textContent = "4 nuevos"
    boton.addEventListener("click", () => {
        Aleatorios(); 
    });

    const seccioncapturados = document.createElement("section");
    seccioncapturados.classList.add("c-lista");

    let misPokes = "";
    for (let i = 1; i <= totalPokes; i++) {
        if(misNumeros.includes(i)){
            misPokes += `
            <div class="c-unpoke c-mios-pokemon poke-${i}" onclick="Detalle('${i}')">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png" width="auto" height="45" loading="lazy" alt="${i}">
                <p>${i}</p>
            </div>`;
        }else{
            misPokes += `
            <div class="c-unpoke" id="c-unpoke-${i}">
                <p>${i}</p>
            </div>
            `
        }
        
    }
    seccioncapturados.innerHTML = misPokes;

    let contador = document.createElement("p");
    contador.textContent = `${misNumeros.length} / ${totalPokes}`;
    contador.id = "contador"

    document.getElementById("root").appendChild(contador)
    document.getElementById("root").appendChild(boton)
    document.getElementById("root").appendChild(capturaAleatorea)
    document.getElementById("root").appendChild(seccioncapturados)
}