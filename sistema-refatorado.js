// sistema-refatorado.js
// Gerenciador de playlist de musicas

var playlistMusicas = [];
var duracaoTotalEmSegundos = 0;
var playlistGerada = false;
var relatorioPlaylist = "";

// Converte minutos e segundos em total de segundos.
function converterParaSegundos(minutos, segundos) {
  var totalSegundos = minutos * 60 + segundos;
  return totalSegundos;
}
0
// Formata duração em segundos para o formato mm:ss.
function formatarDuracao(duracaoSegundos) {
  var minutos = Math.floor(duracaoSegundos / 60);
  var segundos = duracaoSegundos % 60;
  if (segundos < 10) {
    return minutos + ":0" + segundos;
  }
  return minutos + ":" + segundos;
}

// Busca uma música na lista pelo nome.
function buscarMusicaPorNome(lista, nomeMusica) {
  var resultado = null;
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].nome == nomeMusica) {
      resultado = lista[i];
    }
  }
  return resultado;
}

// Valida se o valor é um número entre 0 e 100.
function validarDuracaoMusica(valor) {
  if (valor == null) {
    return false;
  }
  if (typeof valor !== "number") {
    return false;
  }
  if (valor < 0) {
    return false;
  }
  if (valor > 100) {
    return false;
  }
  return true;
}

// Calcula a duração total de todas as músicas da playlist.
function calcularDuracaoTotal(lista) {
  var duracaoTotal = 0;
  for (var i = 0; i < lista.length; i++) {
    duracaoTotal = duracaoTotal + lista[i].duracao;
  }
  duracaoTotalEmSegundos = duracaoTotal;
  return duracaoTotal;
}

// Alterna o status de favorita de uma música pelo índice.
function alternarFavorita(indice) {
  if (indice >= 0 && indice < playlistMusicas.length) {
    if (playlistMusicas[indice].fav == false) {
      playlistMusicas[indice].fav = true;
    } else {
      playlistMusicas[indice].fav = false;
    }
  }
}

// Filtra músicas da playlist por uma propriedade específica.
function filtrarMusicasPorPropriedade(lista, propriedade, valor) {
  var resultadoFiltro = [];
  for (var i = 0; i < lista.length; i++) {
    if (lista[i][propriedade] == valor) {
      resultadoFiltro.push(lista[i]);
    }
  }
  return resultadoFiltro;
}

// Conta quantas músicas estão marcadas como favoritas.
function contarFavoritas(lista) {
  var contadorFavoritas = 0;
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].fav == true) {
      contadorFavoritas = contadorFavoritas + 1;
    }
  }
  return contadorFavoritas;
}

// Ordena as músicas alfabeticamente por nome.
function ordenarMusicasPorNome(lista) {
  var copia = lista.slice();
  copia.sort(function(musicaA, musicaB) {
    if (musicaA.nome < musicaB.nome) {
      return -1;
    }
    if (musicaA.nome > musicaB.nome) {
      return 1;
    }
    return 0;
  });
  return copia;
}

// Troca a posição de duas músicas na playlist.
function trocarPosicaoMusicas(lista, posicao1, posicao2) {
  if (posicao1 < 0 || posicao1 >= lista.length) {
    return;
  }
  if (posicao2 < 0 || posicao2 >= lista.length) {
    return;
  }
  var musicaTemporaria = lista[posicao1];
  lista[posicao1] = lista[posicao2];
  lista[posicao2] = musicaTemporaria;
}

// Filtra músicas pela duração máxima.
function filtrarMusicasPorDuracaoMaxima(lista, duracaoMaxima) {
  var musicasFiltradas = [];
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].duracao <= duracaoMaxima) {
      musicasFiltradas.push(lista[i]);
    }
  }
  return musicasFiltradas;
}

// Adiciona uma nova música à playlist.
function adicionarMusica(nome, artista, genero, minutos, segundos) {
  var novaMusica = {};
  novaMusica.nome = nome;
  novaMusica.artista = artista;
  novaMusica.genero = genero;
  novaMusica.duracao = converterParaSegundos(minutos, segundos);
  novaMusica.fav = false;
  playlistMusicas.push(novaMusica);
}

// Atualiza a exibição das primeiras 5 músicas da playlist na página.
function mostrarMusicasNaTela() {
  for (var i = 0; i < 5; i++) {
    var elementoMusica = document.getElementById('musica' + i);
    var informacaoMusica = playlistMusicas[i].nome + " - " + playlistMusicas[i].artista + " (" + formatarDuracao(playlistMusicas[i].duracao) + ")";
    elementoMusica.innerHTML = informacaoMusica;
  }
}

// Gera e exibe um relatório completo da playlist no console.
function gerarRelatorioPlaylist() {
  var relatorio = "";
  relatorio = relatorio + "=== RELATORIO DA PLAYLIST ===\n";
  relatorio = relatorio + "Total de musicas: " + playlistMusicas.length + "\n";
  relatorio = relatorio + "Favoritas: " + contarFavoritas(playlistMusicas) + "\n";
  relatorio = relatorio + "Duracao total: " + formatarDuracao(calcularDuracaoTotal(playlistMusicas)) + "\n";
  relatorio = relatorio + "\n";
  for (var i = 0; i < playlistMusicas.length; i++) {
    var marcadorFavorita = "";
    if (playlistMusicas[i].fav == true) {
      marcadorFavorita = " [FAVORITA]";
    }
    relatorio = relatorio + (i + 1) + ". " + playlistMusicas[i].nome + " - " + playlistMusicas[i].artista + " (" + formatarDuracao(playlistMusicas[i].duracao) + ")" + marcadorFavorita + "\n";
  }
  relatorioPlaylist = relatorio;
  console.log(relatorio);
  return relatorio;
}