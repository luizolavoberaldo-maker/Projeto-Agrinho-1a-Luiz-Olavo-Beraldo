function showPage(page) {
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });

    document.getElementById(page).classList.add('active');
}

async function buscar() {
    let query = document.getElementById("search").value;

    if (!query.trim()) return;

    const url = `https://pt.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        let container = document.getElementById("results");
        container.innerHTML = "";

        data.query.search.forEach(item => {
            let div = document.createElement("div");
            div.className = "result";

            let link = `https://pt.wikipedia.org/wiki/${item.title.replaceAll(" ", "_")}`;

            div.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.snippet}</p>
                <small>📚 Fonte: Wikipedia</small><br>
                <a href="${link}" target="_blank" style="color:#00ff99;">
                    Abrir artigo
                </a>
            `;

            container.appendChild(div);
        });
    } catch (erro) {
        document.getElementById("results").innerHTML =
            "<p>Erro ao buscar informações.</p>";
    }
}
